import React, { Component } from 'react';
import {connect} from 'react-redux';

import './Blog.css';
import Footer from './Footer';
import Firstnav from './firstnav';
import { Route,Switch,Redirect} from 'react-router-dom';
import Signup from '../../Components/Signup/Signup';
import SignIn from '../../Components/Signin/Signin';
import BsignUp from '../../Components/ToSignup/BsignUp'
import Home from './Home';
import Profile from '../../Components/Profile/Profile';
import '../../bootstrap-3.3.7-dist/css/bootstrap.min.css';
import Map from '../../Components/map/Map_home';
import ProductList from '../../Components/Pcatogory/Cofiles/ProductList';
import Details from '../../Components/Pcatogory/Cofiles/Details';
import Cart from '../../Components/Pcatogory/Cofiles/Cart/Cart';
import Logout from '../../Components/Signin/Logout/Logout';
import OrderQueue from '../../Components/ShopView/OrderQueue';



class Blog extends Component{
   state={

   }


// componentDidMount=()=>{
//     switch(user){
//        case customer:{return}
//        case Seller:{}
//        case Deliverer:{}     
//     }
// }

    
    render(){
        let routes=(
        <Switch>
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
            <Route path="/LogAsSeller"exact component={OrderQueue}/>
        </Switch>
            
        );
        if(this.props.user=='Seller' && this.props.isAuthenticated){
            // case 'customer':{return}
            // case 'Seller':{return}
            // case 'Deliverer':{return}  
            routes=(
                <Switch>
                    <Route path="/"exact component={Home}/>
                    <Route path="/Signin" exact component={SignIn}/>
                    <Route path="/Profile" exact component={Profile}/>
                    <Route path="/details" component={Details}/>
                    <Route path="/logout" component={Logout}/>
                    <Route path="/LogAsSeller"exact component={OrderQueue}/>
                    <Redirect to="/"/>
                </Switch>
            );  
         }else if(this.props.user=='Deliverer' && this.props.isAuthenticated){
            routes=(
                <Switch>
                    <Route path="/"exact component={Home}/>
                    <Route path="/Signin" exact component={SignIn}/>
                    <Route path="/Profile" exact component={Profile}/>
                    <Route path="/map" component={Map}/>
                    <Route path="/details" component={Details}/>
                    <Route path="/cart" component={Cart}/>
                    <Route path="/logout" component={Logout}/>
                    <Route path="/LogAsSeller"exact component={OrderQueue}/>
                    <Redirect to="/"/>
                </Switch>
            );
         }else if(this.props.user=='Customer' && this.props.isAuthenticated){
            routes=(
                <Switch>
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
                    <Redirect to="/"/>
                </Switch>
            );
         }else{
             routes=(
                <Switch>
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
                        <Route path="/LogAsSeller"exact component={OrderQueue}/>
                </Switch>
             );
         }
        return (
            <div>
               
                <Firstnav
                    isAuth={this.props.isAuthenticated}
                    userT={this.props.user}/>
                    {routes}               
                <Footer/>
                
            </div>
            
          
        );
}

}
const mapStateToProps = state =>{
    return{
        isAuthenticated: state.auth.token!==null,
        user:state.auth.userType
        
    };
};
export default connect(mapStateToProps)(Blog);