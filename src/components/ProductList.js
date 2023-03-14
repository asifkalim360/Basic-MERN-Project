import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom"

const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect( () => { //humlog directly hi useEffec ke ander hi getProducts ko bana sakte hain lekin alag se function rakhna Api wo jyada better hota hai
        getProducts();
    }, []);

    const getProducts = async () => {         //es function ke through humlog Api ko call karke deta fetch kr lenge.
        let result = await fetch('http://127.0.0.1:5000/products-list',{ //get method se data fetch karne ke liye method or sab chijo ki jrurt nahi hoti hai.
       //yahan pe data ek readstream format me hota hai esko humlog ko JSON me convert karna padega.
        headers:{
            authorization : `bearer ${JSON.parse(localStorage.getItem('token'))}`
        }
            
        });
        result = await result.json();
        setProducts(result);
    }
    // console.log("products",products);

    const deleteProduct = async(id) => {        //es function ke through humlog data ko delete krenge.
    // console.log(id)
        // dynamic id ko call karne keliye ID ko aise link kiya jata hai.
        let result = await fetch(`http://127.0.0.1:5000/product/${id}`, { 
            method:"Delete",
            headers:{
                authorization : `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        if(result)
        {
            alert("Are you deleted this record ? ");
            getProducts();      //esko call karne se delete ke baad page fhir se page bache huye data ko fetch karlega.
        }
    }

    const searchHandle = async (event) => {
        // console.warn(event.target.value);
        let key = event.target.value;
        if(key)
        {
            let result = await fetch(`http://127.0.0.1:5000/search/${key}`, {
                headers:{
                    authorization : `bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            });
            result = await result.json();
            if(result)
            {
                setProducts(result);
            }
        }
        else 
        {
            getProducts(); 
        }
        
    }


    return (
       <div className="product-list">
            <h3>All Products List</h3>
            <input type="text" placeholder="search product" className="search-product-box" onChange={searchHandle}/>
            <ul>
                <li>S. no</li>
                <li>Name</li>
                <li>Price</li>
                <li>Category</li>
                <li>Company</li>
                <li>Action</li>
            </ul>
            {
                products.length>0 ? products.map((item,index) => 
                    <ul key={item._id}>
                        <li>{index+1}</li>
                        <li>{item.name}</li>
                        <li>{item.price}</li>
                        <li>{item.category}</li>
                        <li>{item.company}</li>
                        <li>
                            <button onClick={()=>deleteProduct(item._id)} >Button</button>
                            <Link to={"/update/"+item._id}>Update</Link>
                        </li>
                    </ul>
                )
                : <h1>No Result Found!</h1>
            }
            
        </div>
    )
}

export default ProductList;