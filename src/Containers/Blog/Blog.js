import React, { Component } from 'react';
import {connect} from 'react-redux';

import Footer from './Footer';
import Firstnav from './firstnav';
import { Route,Switch,Redirect} from 'react-router-dom';
import Signup from '../../Components/Signup/Signup';
import SignIn from '../../Components/SignIn/Signin';
import BsignUp from '../../Components/ToSignup/BsignUp'
import Home from './Home';
import Profile from '../../Components/Profile/Profile';
import '../../bootstrap-3.3.7-dist/css/bootstrap.min.css';
import Map from '../../Components/map/Map_home';
import ProductList from '../../Components/Pcatogory/Cofiles/ProductList';
import ShopList from '../../Components/Pcatogory/Cofiles/ShopList';
import Details from '../../Components/Pcatogory/Cofiles/Details';
import Cart from '../../Components/Pcatogory/Cofiles/Cart/Cart';
import Logout from '../../Components/SignIn/Logout/Logout';
import OrderQueue from '../../Components/ShopView/OrderQueue';
import AddProducts from '../../Components/ShopView/UploadForm';
import Modal from '../../Components/Pcatogory/Cofiles/Modal';
import Pindex from '../../Components/Pcatogory/Pindex';
import Navbar from '../../Components/Pcatogory/Cofiles/Navbar';
import {ProductProvider} from '../../Components/Pcatogory/context';
import Inventory from '../../Components/ShopView/Inventory';
import UpdateProduct from '../../Components/ShopView/EditProduct';
import upload from '../../Components/ShopView/UploadF';
import Spinner from '../../Containers/Spinner/Spinner_2';



class Blog extends Component{
    constructor(props){
        super(props)
    }
  
    render(){
        let routes=(
        <Switch>
            <Route path="/"exact component={Home}/>
            <Route path="/Signin" exact component={SignIn}/>
            <Route path="/Signuprole"exact component={BsignUp}/>
            <Route path="/SignUp" component={Signup}/>            
            <Route path="/Profile" exact component={Profile}/>
            <Route path="/AddNewProduct" exact component={AddProducts}/>
            <Route path="/map" component={Map}/>
            <Route path="/logout" component={Logout}/>
            <Route path="/Seller_login"exact component={OrderQueue}/>
            <Route path="/Inventory"exact component={Inventory}/>
            <Route path="/UpdateProduct" exact component={UpdateProduct}/>
            <Route path="/upload" exact component={upload}/>
            <Route path="/spinner" exact component={Spinner}/>
        </Switch>
        
            
        );
        if(this.props.user=='Seller' && this.props.isAuthenticated){
            routes=(
                <Switch>
                    <Route path="/"exact component={Home}/>
                    <Route path="/Signin" exact component={SignIn}/>
                    <Route path="/Profile" exact component={Profile}/>
                    <Route path="/AddNewProduct" exact component={AddProducts}/>
                    <Route path="/logout" component={Logout}/>
                    <Route path="/Seller_login"exact component={OrderQueue}/>
                    <Route path="/Inventory"exact component={Inventory}/>
                    <Route path="/UpdateProduct" exact component={UpdateProduct}/>
                    <Route path="/upload" exact component={upload}/>
                    <Route path="/spinner" exact component={Spinner}/>
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
                    <Route path="/logout" component={Logout}/>
                    <Route path="/Seller_login"exact component={OrderQueue}/>
                    <Route path="/Inventory"exact component={Inventory}/>
                    <Route path="/UpdateProduct" exact component={UpdateProduct}/>
                    <Route path="/upload" exact component={upload}/>
                    <Route path="/spinner" exact component={Spinner}/>
                    <Redirect to="/"/>
                </Switch>
            );
         }else if(this.props.user=='Customer' && this.props.isAuthenticated){
            routes=(
                <Switch>
                    <Route path="/"exact component={Home}/>
                    <Route path="/Signin" exact component={SignIn}/>
                    <Route path="/Signuprole"exact component={BsignUp}/>
                    <Route path="/SignUp" component={Signup}/>
                    <Route path="/Profile" exact component={Profile}/>
                    <Route path="/map" component={Map}/>
                    <Route path="/logout" component={Logout}/>
                    <Route path="/AddNewProduct" exact component={AddProducts}/>
                    <Route path="/Inventory"exact component={Inventory}/>
                    <Route path="/UpdateProduct" exact component={UpdateProduct}/>
                    <Route path="/upload" exact component={upload}/>
                    <Route path="/spinner" exact component={Spinner}/>
                    <ProductProvider>
                       <Pindex/>
                    </ProductProvider>
                    <Redirect to="/"/>
                </Switch>
            );
         }else{
             routes=(
                 <React.Fragment>
                <Switch>
                      <Route path="/"exact component={Home}/>
                        <Route path="/Signin" exact component={SignIn}/>
                        <Route path="/Signuprole"exact component={BsignUp}/>
                        <Route path="/SignUp" component={Signup}/>
                        <Route path="/Profile" exact component={Profile}/>
                        <Route path="/map" component={Map}/>
                        <Route path="/logout" component={Logout}/>
                        <Route path="/Seller_login"exact component={OrderQueue}/>
                        <Route path="/AddNewProduct" exact component={AddProducts}/>
                        <Route path="/Inventory"exact component={Inventory}/>
                        <Route path="/UpdateProduct" exact component={UpdateProduct}/>
                        <Route path="/upload" exact component={upload}/>
                        <Route path="/spinner" exact component={Spinner}/>
      
                </Switch>
                </React.Fragment>
             );
         }
        return (
            <div>
            
               <Firstnav
                    isAuth={this.props.isAuthenticated}
                    userT={this.props.user}/>
                    {/* <ProductProvider>
                       <Pindex/>
                    </ProductProvider> */}
                    {routes}         
                <Footer/>
            </div>
            
          
        );
}

}
const mapStateToProps = state =>{
    return{
        isAuthenticated: state.auth.token!==null,
        user:state.auth.userType,
        lng:state.location.lngValue
        
    };
};
export default connect(mapStateToProps)(Blog);