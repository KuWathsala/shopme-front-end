import React from 'react';
//import './Blog.css';
import './navigation.css'

const firstnav =() =>{
    return(
    <div className="bar">
    <header>
        <nav>
            <ul>
                <li><a href="/">Hi, Sign in</a></li>
                <li><a href="./register">Register</a> </li>                             
                <li><a href="/">Help</a></li>
                <li><a href="/">Notfication</a></li>
            </ul>
            
        </nav>
    </header>
    </div>
    )
};
export default firstnav;