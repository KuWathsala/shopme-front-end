import React from 'react';
import './navigation.css';
import  '../../bootstrap-3.3.7-dist/css/bootstrap.min.css';

//import '../../bootstrap-3.3.7-dist/bootstrap.min.js';


const firstnav =() =>{
    return(

        <div className="bar">
            <nav>
                <ul>
                    <div className="row">
                                <div className="col col-md-11 col-sm-11">
                                    <li><a href="/"><span class="glyphicon glyphicon-home"></span>Home</a></li>
                                    <li><a href="/Bsignup">Register</a></li>
                                    <li><a href="/">Help</a></li>
                                    <li><a href="/">Notfication</a></li>
                                    <li><a href="/Signin">Hi, Sign In</a></li>
                                </div>
                            <div className="other">
                            <div className="col">
                                <li><a href="/Profile"><span class="glyphicon glyphicon-user"></span></a></li>
                                <li><a href="/Cart"><span class="glyphicon glyphicon-shopping-cart"></span></a></li>
                            </div>
                        </div>
                    </div>
                </ul>
            </nav>
        </div>
    )
};
export default firstnav;