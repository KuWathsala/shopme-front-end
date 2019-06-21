import React, { Component } from 'react';
import './Blog.css';
import Footer from './Footer';
import Firstnav from './firstnav';
import { Route } from 'react-router-dom';
import Signup from '../../Components/Signup/Signup';
import SignIn from '../../Components/SignIn/SignIn';
import BsignUp from '../../Components/ToSignup/BsignUp'
import Home from './Home';
import Search from '../../Components/Items/items';
//import Cart from '../../Components/Shopping cart/shCart';
import Profile from '../../Components/Profile/Profile';
import { BrowserRouter } from 'react-router-dom';
import '../../bootstrap-3.3.7-dist/css/bootstrap.min.css';
import Map from '../../Components/map/Map_home';
//import Proapp from '../../Components/Productcart/Proapp';
import ProductList from '../../Components/Pcatogory/Cofiles/ProductList';
import Details from '../../Components/Pcatogory/Cofiles/Details';
import Cart from '../../Components/Pcatogory/Cofiles/Cart/Cart'



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
                <Route path="/Search"exact component={Search}/>
                <Route path="/ProductList" exact component={ProductList}/>
                <Route path="/Profile" exact component={Profile}/>
                <Route path="/map" component={Map}/>
                <Route path="/details" component={Details}/>
                <Route path="/cart" component={Cart}/>
                </BrowserRouter>
                <Footer/>
            </div>
            
          
        );
}
}
export default Blog;