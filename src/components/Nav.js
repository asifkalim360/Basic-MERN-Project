import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Nav = () => {
    const auth = localStorage.getItem('user');
    const navigate = useNavigate();
    const logout = () => {
        // console.log("aaaaaaaaaaa");
        localStorage.clear();
        navigate('/signup')
    }

    // return(
    //     <div>
    //         <ul className="nav-ul">
    //             <li><Link to="/">Products</Link></li>
    //             <li><Link to="/add">Add Product</Link></li>
    //             <li><Link to="/update">Update Product</Link></li>
    //             <li><Link to="/profile">Profile </Link></li>
    //             {/* <li>{ auth ? <Link onClick={logout} to="/signup">Logout</Link> : <Link to="/signup">Sign Up </Link>
    //                 }
    //             </li>
    //             <li><Link to="/login">Login </Link></li> */}

    //             {
    //                 auth ? <li><Link onClick={logout} to="/signup">Logout</Link></li>
    //                 :
    //                 <>            {/* blank tag ko hmlog yahan fragmentation kahte hain  */}
    //                     <li><Link to="/signup">Sign Up </Link></li>
    //                     <li><Link to="/login">Login </Link></li>
    //                 </>
                    
    //             }
                
    //         </ul>
    //     </div>
    // )
    return(
        <div>
            <img src="https://s.tmimgcdn.com/scr/800x500/239300/luxury-elegant-aa-shade-golden-logo_239336-original.png" alt="logo" className='logo'/>
            {   auth ? 
                <ul className="nav-ul">
                <li><Link to="/">Products</Link></li>
                <li><Link to="/add">Add Product</Link></li>
                <li><Link to="/update">Update Product</Link></li>
                <li><Link to="/profile">Profile </Link></li>
                <li><Link onClick={logout} to="/signup">Logout ( {JSON.parse(auth).name} )</Link></li>
                </ul>
                :
                <ul className="nav-ul nav-right " >
                    <li><Link to="/signup">Sign Up </Link></li>
                    <li><Link to="/login">Login </Link></li>
                </ul>
            }    
        </div>
    )    
}

export default Nav;