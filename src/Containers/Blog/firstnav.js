import React from 'react';
import {withRouter,Link} from 'react-router-dom';

import './navigation.css';
import  '../../bootstrap-3.3.7-dist/css/bootstrap.min.css';

//import '../../bootstrap-3.3.7-dist/bootstrap.min.js';


const firstnav =(props) =>{
    return(

        <div className="bar">
            <nav>
                <ul>
                    <div className="row">
                                <div className="col col-md-11 col-sm-11">
                                    <li><a><Link to='/'><span class="glyphicon glyphicon-home">Home</span></Link></a></li>
                                    <li><a><Link to='/Bsignup'>Register</Link></a></li>
                                    <li><a><Link to='/'>Help</Link></a></li>
                                    <li><a><Link to='/'>Notfication</Link></a></li>
                                    {!props.isAuth ?
                                            <li><a><Link to='/Signin'>Hi, Sign In</Link></a></li>
                                            :<li><a><Link to='/logout'>Logout</Link></a></li>}
                                    {console.log(props)}
                                    
                                </div>
                            <div className="other">
                            <div className="col">
                                <li><a><Link to='/Profile'><span class="glyphicon glyphicon-user"></span></Link></a></li>
                                <li><a><Link to='/Cart'><span class="glyphicon glyphicon-shopping-cart"></span></Link></a></li>
                            </div>
                        </div>
                    </div>
                </ul>
            </nav>
        </div>
    )
};
export default withRouter(firstnav);