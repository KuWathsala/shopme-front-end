import React, { Component } from 'react';
import './Blog.css';
import Footer from './Footer';
import Firstnav from './firstnav';
import Secondtab from './secondtab';
import Thirdtab from './thirdtab';
import { Route } from 'react-router-dom';
import Signup from '../../Components/Signup/Signup';
import Signin from '../../Components/Signin/Signin';
import Home from './Home';
import { BrowserRouter } from 'react-router-dom';




class Blog extends Component{
   
    
    render(){
       
        return (
            <div className="container">
                
                <Firstnav/>
                <BrowserRouter>
                <Route path="/"exact component={Home}/>
                <Route path="/Signin" exact component={Signin}/>
                <Route path="/Signup"exact component={Signup}/>
                </BrowserRouter>
                
                <div className="container">
                    <Footer/>
                </div>
            </div>
            
          
        );
}
}
export default Blog;