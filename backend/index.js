const express = require("express");     // include express framework
const cors = require("cors");
require("./db/config");
const User = require("./db/User");
const Product = require("./db/Product")
const jwt = require("jsonwebtoken");            //using for jwt token.
// const jwtkey = require("./config/jwtkey");  //using for secret jwt token key.
const jwtkey = 'jsontoken';  //using for secret jwt token key.
const app = express();

//jo bhi data humlog postman se ya react se bhejte hain to usko control karne ke kaam aata hai.
app.use(express.json());    
app.use(cors());

//create register api
app.post('/register', async (req,resp) => {
    const user = new User(req.body);
    const result = await user.save();   // data database me save ho jayega...

    resultData = result.toObject();         //eski wajah se hamara password api me nahi dikhega lekin databse me save rhega.
    delete resultData.password;             //eski wajah se hamara password api me nahi dikhega lekin databse me save rhega.
    jwt.sign({resultData}, jwtkey, {expiresIn:"2h"}, (err, token) => {
        if(err)
        {
            resp.send({result:"Something went wrong, please try after some times"})
        }
        resp.send({resultData, token:token}); 
    })
});

//create login api
app.post('/login', async (req,resp) => {
    console.log(req.body);
    if(req.body.email && req.body.password)
    {
        const user = await User.findOne(req.body).select("-password");
        if(user)
        {
            jwt.sign({user}, jwtkey, {expiresIn:"2h"}, (err, token) => {
                if(err)
                {
                    resp.send({result:"Something went wrong, please try after some times"})
                }
                resp.send({user, token:token}); 
            })         
        }
        else 
        {
            resp.send("result : No user Found!");
        }
    }
    else 
    {
        resp.send("result : user not Found!");
    }   
});

//create Api for Add Product in database---
app.post('/add-product', verifyToken, async (req,resp) => {
    const product = new Product(req.body);
    const result = await product.save();   // data database me save ho jayega...
    resp.send(result);
});

//create Api for listing All Products ---
app.get('/Products-list', verifyToken, async(req,resp) => {
    let products = await Product.find();        //total data ko  database se nikalne ka query...

    if(products.length > 0)
    {
        resp.send(products)
    }
    else 
    {
        resp.send({result:"No result Found "})
    }
});

//create Api for Delete Product---
app.delete('/product/:id', verifyToken, async(req,resp) => {
    const result = await Product.deleteOne({ _id : req.params.id })
    resp.send(result);
});

//create Api for fetch data into database for the purpose of Update Product---
app.get('/product/:id', verifyToken, async(req,resp) => {
    const result = await Product.findOne({ _id : req.params.id });
    if(result)
    {
        resp.send(result);
    }
    else 
    {
        resp.send({result:"No Record Found!!!"});
    }
});

//Create Api for Update product---
app.put("/product/:id", verifyToken, async (req, resp) => {
    const result = await Product.updateOne(
        {_id : req.params.id},
        { $set : req.body}
    )
    if(result)
    {
        resp.send(result);
    }
    else 
    {
        resp.send({result:"No Record Found!!!"});
    }
});

//CREATE API FOR SEARCH ITEM WITH THE HELP OF KEY -----
app.get('/search/:key', verifyToken, async (req, resp) => {
    let result = await Product.find({
        "$or":[         // curli{} - ek object hota hai.or object ke ander jb bhi humlog ek se jyada field me search lagate hain to "$or" ka use karte hain---
            {name:{$regex:req.params.key}},
            {company:{$regex:req.params.key}}
        ]        
    });
    resp.send(result);
});

// create a MIddleWare for verifyToken-----
function verifyToken(req, resp, next) 
{
    let token = req.headers['authorization'];
    if(token)
    {
        token = token.split(' ')[1];
        console.warn("middleware caling if", token);
        jwt.verify(token, jwtkey, (err, valid) => {
            if(err){
                resp.status(401).send({result:"Please Provide Valid a token ? "})
            }
            else{
                next();
            }
        })
    }else{
        resp.status(403).send({result:"Please Add token with headers ? "})
    }
}

app.listen(5000);