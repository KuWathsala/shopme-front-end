import React, { Component } from 'react';
import './Blog.css';
import Footer from './Footer';
import Firstnav from './firstnav';
import Secondtab from './secondtab';
import Thirdtab from './thirdtab';
import { Route } from 'react-router-dom';
import Signup from '../../Components/Signup/Signup';
import SignIn from '../../Components/SignIn/SignIn';
import BsignUp from '../../Components/ToSignup/BsignUp'
import Home from './Home';
import { BrowserRouter } from 'react-router-dom';
import '../../Assets/bootstrap.min.css';




class Blog extends Component{
   
    
    render(){
       
        return (
            <div>
                
                <Firstnav/>
                <BrowserRouter>
                <Route path="/"exact component={Home}/>
                <Route path="/Signin" exact component={SignIn}/>
                <Route path="/Bsignup"exact component={BsignUp}/>
                <Route path="/SignUp" component={Signup}/>
                </BrowserRouter>
                
                <div>
                    <Footer/>
                </div>
            </div>
            
          
        );
}
}
export default Blog;