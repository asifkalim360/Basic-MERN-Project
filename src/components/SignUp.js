import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const [name, setName]=useState("");
    const [password, setPassword]=useState("");
    const [email, setEmail]=useState("");
    const navigate = useNavigate();

    //----------------------------Singup me effect lagaya hai humlog direct browser pe url daal kar signup pe nahi ja sakte----------------------------
    useEffect( () => {
        const auth = localStorage.getItem('user');
        if(auth)
        {
            navigate('/')
        }
        
    });

    //------------------------------------------------------------------------
    //--------------------------REGISTER API INTEGRATION----------------------
    const collectData= async() =>{          //integrate register API with react using in this function
        console.warn(name,email,password)
        let result = await fetch('http://127.0.0.1:5000/register', {   //API link
            method:'post',      //Api method
            body:JSON.stringify({name,email,password}),     // database filed name with JSON.stringify
            headers:{
                'content-type':'application/json'
            }
        });
        result = await result.json();
        console.warn(result);

        localStorage.setItem("user",JSON.stringify(result.resultData));
        localStorage.setItem("token",JSON.stringify(result.token));
        navigate('/');  
     } 
     //-----------------------------------------------------------------------   
    return(
        <div className='register'>
            <h1>Register</h1>
            <input type="text" placeholder='Enter your name' className='inputbox' value={name} onChange={(e)=>setName(e.target.value)}/>
            <input type="text" placeholder='Enter your Email' className='inputbox' value={email} onChange={(e)=>setEmail(e.target.value)}/>
            <input type="password" placeholder='Enter your password' className='inputbox' value={password} onChange={(e)=>setPassword(e.target.value)}/>
            <button onClick={collectData} className='appbutton'>Sign Up</button>
        </div>
    )
}

export default SignUp;