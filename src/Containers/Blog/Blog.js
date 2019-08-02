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
import ShopList from '../../Components/Pcatogory/Cofiles/ShopList';
import Details from '../../Components/Pcatogory/Cofiles/Details';
import Cart from '../../Components/Pcatogory/Cofiles/Cart/Cart';
import Logout from '../../Components/Signin/Logout/Logout';
import OrderQueue from '../../Components/ShopView/OrderQueue';
import AddProducts from '../../Components/ShopView/UploadForm';
import Modal from '../../Components/Pcatogory/Cofiles/Modal';
import Pindex from '../../Components/Pcatogory/Pindex';
import Navbar from '../../Components/Pcatogory/Cofiles/Navbar';
import {ProductProvider} from '../../Components/Pcatogory/context';



class Blog extends Component{
    constructor(props){
        super(props);
        this.state={
            lng:'12223',
        }
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
            <Route path="/Profile" exact component={Profile}/>
            <Route path="/Addaproduct" exact component={AddProducts}/>
            <Route path="/map" component={Map}/>
            <Route path="/logout" component={Logout}/>
            <Route path="/LogAsSeller"exact component={OrderQueue}/>
        </Switch>
        
            
        );
        if(this.props.user=='Seller' && this.props.isAuthenticated){
            routes=(
                <Switch>
                    <Route path="/"exact component={Home}/>
                    <Route path="/Signin" exact component={SignIn}/>
                    <Route path="/Profile" exact component={Profile}/>

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
                    <Route path="/Profile" exact component={Profile}/>
                    <Route path="/map" component={Map}/>
                    <Route path="/logout" component={Logout}/>
                    <Route path="/AddProduct" exact component={AddProducts}/>
                    <Redirect to="/"/>
                </Switch>
            );
         }else{
             routes=(
                 <React.Fragment>
                <Switch>
                      <Route path="/"exact component={Home}/>
                        <Route path="/Signin" exact component={SignIn}/>
                        <Route path="/seluser"exact component={BsignUp}/>
                        <Route path="/SignUp" component={Signup}/>
                        <Route path="/Profile" exact component={Profile}/>
                        <Route path="/map" component={Map}/>
                        <Route path="/logout" component={Logout}/>
                        <Route path="/LogAsSeller"exact component={OrderQueue}/>
                        <Route path="/AddProduct" exact component={AddProducts}/>
                        
                </Switch>
                </React.Fragment>
             );
         }
        return (
            <div>
            
               <Firstnav
                    isAuth={this.props.isAuthenticated}
                    userT={this.props.user}/>
                    <ProductProvider {...this.state}>
                       <Pindex/>
                    </ProductProvider>
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
        lng:state.location.latValue
        
    };
};
export default connect(mapStateToProps)(Blog);