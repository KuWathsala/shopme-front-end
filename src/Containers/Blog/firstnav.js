import React from 'react';
import './navigation.css';
import  '../../bootstrap-4.0.0-dist/css/bootstrap.min.css';

const firstnav =() =>{
    return(
        
    <div className="bar">
        <header>
            <nav>
                <ul>
                    <div className="col-md-10 ol-md">
                        <div className="row">
                            <div className="col">
                                <li><a href="/">Home</a></li>
                                <li><a href="/Signup">Register</a></li>
                                <li><a href="/">Help</a></li>
                                <li><a href="/">Notfication</a></li>
                            </div>
                            <div className="col">
                                <div className="login"><li><a href="/Signin">Hi, Sign In</a></li></div>
                            </div>
                            
                        </div>                        
                    </div>                  
                </ul>
            </nav>
        </header>
    </div>
    )
};
export default firstnav;