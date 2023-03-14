import React, { useEffect } from "react";
import {useParams, useNavigate} from "react-router-dom"  //useParams hook ka use hmlog update API ke liye karte hain url se parameter ko lene keliye---

const UpdateProduct = () => {
    //4 filed ke 4 state bhi define karna hoga.
    const [name, setName] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [company, setCompany] = React.useState('');
    const navigate = useNavigate();

    const params = useParams();

    useEffect(() => {
        
        getProductDetails();
    },[]);

    //--------------------------UPDATE Fetch data in database to form eith the help of API INTEGRATION----------------------
    const getProductDetails = async () => {    // fetch data into databse .
        // console.log(params);
        let result = await fetch(`http://127.0.0.1:5000/product/${params.id}`, {
            headers:{
                authorization : `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result  = await result.json();
        // console.log(result)
        setName(result.name)
        setPrice(result.price)
        setCategory(result.category)
        setCompany(result.company)

    }
        //--------------------------UPDATE API INTEGRATION----------------------
        const updateProduct= async() =>{ //integrate Update-Product API with react using in this function
            console.log(name,price,category,company); 

            let result = await fetch(`http://127.0.0.1:5000/product/${params.id}`, {   //API link with Dynamic ID's ----
                method:'put',      //Api method
                body:JSON.stringify({name,price,category,company}),     // database filed name with JSON.stringify
                headers:{
                    'content-type':'application/json',
                    authorization : `bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            });
            result = await result.json();
            // console.warn(result);
            navigate("/");

         } 
         //----------------------------------------------------------------------- 

    return (
        <div className="product">
            <h1>Update Product</h1>
            <input type="text" placeholder="Enter product Name" className="inputbox" value={name} onChange={(e)=>setName(e.target.value)}/>
            <input type="text" placeholder="Enter product Price" className="inputbox" value={price} onChange={(e)=>setPrice(e.target.value)}/>
            <input type="text" placeholder="Enter product Category" className="inputbox" value={category} onChange={(e)=>setCategory(e.target.value)} />
            <input type="text" placeholder="Enter product Company" className="inputbox" value={company} onChange={(e)=>{setCompany(e.target.value)}} />
            <button onClick={updateProduct} className="appbutton">Update Product</button>
        </div>
    )
}

export default UpdateProduct;