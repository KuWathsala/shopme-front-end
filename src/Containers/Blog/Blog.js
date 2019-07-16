import React, { Component } from 'react';
import {connect} from 'react-redux';

import './Blog.css';
import Footer from './Footer';
import Firstnav from './firstnav';
import { Route } from 'react-router-dom';
import Signup from '../../Components/Signup/Signup';
import SignIn from '../../Components/Signin/Signin';
import BsignUp from '../../Components/ToSignup/BsignUp'
import Home from './Home';
//import Cart from '../../Components/Shopping cart/shCart';
import Profile from '../../Components/Profile/Profile';
import { BrowserRouter } from 'react-router-dom';
import { LastLocationProvider } from 'react-router-last-location';
import '../../bootstrap-3.3.7-dist/css/bootstrap.min.css';
import Map from '../../Components/map/Map_home';
//import Proapp from '../../Components/Productcart/Proapp';
import ProductList from '../../Components/Pcatogory/Cofiles/ProductList';
import Details from '../../Components/Pcatogory/Cofiles/Details';
import Cart from '../../Components/Pcatogory/Cofiles/Cart/Cart';
import Logout from '../../Components/Signin/Logout/Logout';



class Blog extends Component{
   state={

   }
    
    render(){
       
        return (
            <div>
                
                <Firstnav
                    isAuth={this.props.isAuthenticated}/>

                    
                        <Route path="/"exact component={Home}/>
                        <Route path="/Signin" exact component={SignIn}/>
                        <Route path="/seluser"exact component={BsignUp}/>
                        <Route path="/SignUp" component={Signup}/>
                        <Route path="/ProductList" exact component={ProductList}/>
                        <Route path="/Profile" exact component={Profile}/>
                        <Route path="/map" component={Map}/>
                        <Route path="/details" component={Details}/>
                        <Route path="/cart" component={Cart}/>
                        <Route path="/logout" component={Logout}/>
                        

                <Footer/>
                
            </div>
            
          
        );
}

}
const mapStateToProps = state =>{
    return{
        isAuthenticated: state.auth.token !==null
        
    };
};
export default connect(mapStateToProps)(Blog);