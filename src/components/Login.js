import React, {useEffect} from 'react';
import { useNavigate } from "react-router-dom";
const Login = () => {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const navigate = useNavigate();

    //----------------------------Singup me effect lagaya hai humlog direct browser pe url daal kar signup pe nahi ja sakte----------------------------
    useEffect( () => {
        const auth = localStorage.getItem('user');
        if(auth)
        {
            navigate('/')
        }
        
    });

    //--------------------------LOGIN API INTEGRATION----------------------
    const handleLogin = async () => {         //integrate login API with react using in this function
        console.log("email, password", email, password);
        let result = await fetch('http://127.0.0.1:5000/login', {   //API link
            method: 'post',      //Api method
            body: JSON.stringify({ email, password }),     // database filed name with JSON.stringify
            headers: {
                'content-type': 'application/json'
            }
        });
        result = await result.json();
        console.warn(result);
        if (result.token) {
            localStorage.setItem("token", JSON.stringify(result.token));
            localStorage.setItem("user", JSON.stringify(result.user));
            navigate('/');
        }
        else {
            alert("Please Enter Contact Details!!!");
        }
    }
    //-----------------------------------------------------------------------  

    return (
        <div className="login">
            <h1>Login</h1>
            <input type="text" placeholder="Enter your email " className="inputbox" value={email} onChange={(e) => setEmail(e.target.value)} />

            <input type="pasword" placeholder="Enter your Password " className="inputbox" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleLogin} className='appbutton '>Login</button>
        </div>
    )
}

export default Login;