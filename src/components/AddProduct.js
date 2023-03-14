import React from "react";
import {useNavigate} from "react-router-dom" 

const AddProduct = () => {
    //4 filed ke 4 state bhi define karna hoga.
    const [name, setName] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [company, setCompany] = React.useState('');
    const navigate = useNavigate();
    const [error, setError] = React.useState(false);

        //--------------------------REGISTER API INTEGRATION----------------------
        const addProduct= async() =>{ //integrate Add-Product API with react using in this function
            
            console.log(!name); 
            if(!name || !price || !category || !company)
            {
                setError(true);
                return false;
            }
            
            
            console.log(name,price,category,company);
            const userId = JSON.parse(localStorage.getItem('user'))._id;        //users collection se data string me aayega lekin usko JSON me convert karna pdega or  user ka ID nikal jayega---
            // console.log(userId._id)

            let result = await fetch('http://127.0.0.1:5000/add-product', {   //API link
                method:'post',      //Api method
                body:JSON.stringify({name,price,category,company,userId}),     // database filed name with JSON.stringify
                headers:{
                    'content-type':'application/json',
                    authorization : `bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            });
            result = await result.json();
            console.warn(result);
    
            // localStorage.setItem("user",JSON.stringify(result));
            navigate('/');  
         } 
         //----------------------------------------------------------------------- 

    return (
        <div className="product">
            <h1>Add Product</h1>
            <input type="text" placeholder="Enter product Name" className="inputbox" value={name} onChange={(e)=>setName(e.target.value)}/>
                {error && !name && <span className="invalid-input">Enter Valid Name</span>}
            <input type="text" placeholder="Enter product Price" className="inputbox" value={price} onChange={(e)=>setPrice(e.target.value)}/>
                {error && !price && <span className="invalid-input">Enter Valid Price</span>}
            <input type="text" placeholder="Enter product Category" className="inputbox" value={category} onChange={(e)=>setCategory(e.target.value)} />
                {error && !category && <span className="invalid-input">Enter Valid Category</span>}
            <input type="text" placeholder="Enter product Company" className="inputbox" value={company} onChange={(e)=>{setCompany(e.target.value)}} />
                {error && !company && <span className="invalid-input">Enter Valid Company</span>}
            <button onClick={addProduct} className="appbutton">Add Product</button>
        </div>
    )
}

export default AddProduct;