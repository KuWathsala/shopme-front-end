import React from 'react';
import {withRouter,Link} from 'react-router-dom';
import {connect} from 'react-redux';
import  '../../bootstrap-3.3.7-dist/css/bootstrap.min.css';

class Firstnav extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      menu: false
    };
    this.toggleMenu = this.toggleMenu.bind(this);
  }

  toggleMenu(){
    this.setState({ menu: !this.state.menu })
  }

  render() {

  const show = (this.state.menu) ? "show" : "" ;

  return (
    <nav class="navbar navbar-default" style={{backgroundColor:'#fff',borderColor:'#fff',}}>
  <div class="container-fluid" style={{fontSize:15,fontWeight:'bold'}}>
    <div class="navbar-header">
      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse"  onClick={ this.toggleMenu } data-target="#bs-example-navbar-collapse-1">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
    </div>

    <div className={"collapse navbar-collapse " + show}>
      
      <ul class="nav navbar-nav" style={{color:'red'}}>
        <li className="active" style={{color:'red',}}><Link to='/'><span class="glyphicon glyphicon-home">Home</span></Link></li>
        {!this.props.isAuth ?<li><Link to='/seluser'>Register</Link></li>:null}
        <li><Link to='/'>Help</Link></li>
        <li><Link to='/'>Notfication</Link></li>
        {!this.props.isAuth ? <li><Link to='/Signin'>Hi, Sign In</Link></li>:<li><Link to='/logout'>Logout</Link></li>}
        {this.props.userType=="Seller" && this.props.isAuth ? <li><Link to='/'>Add Products</Link></li>:null}
        {this.props.userType=="Seller" && this.props.isAuth ? <li><Link to='/'>Inventory</Link></li>:null}
        <li><Link to='/Profile'><span class="glyphicon glyphicon-user"></span></Link></li>
        <li><Link to='/Cart'><span class="glyphicon glyphicon-shopping-cart"></span></Link></li>
      </ul>
    </div>
  </div>
</nav>
  );
  }
}
const mapStateToProps=state=>{
  return{
    userType:state.auth.userType,
    Address:state.location.address,
    lng:state.location.lngValue,
    lat:state.location.latValue,
    isAuth:state.auth.token!==null
  }
}

export default connect(mapStateToProps,null)(Firstnav)

/**
 *import React, { Component } from "react";

export default class firstnav extends Component {

  constructor(props) {
    super(props);
    this.state = {
      menu: false
    };
    this.toggleMenu = this.toggleMenu.bind(this);
  }

  toggleMenu(){
    this.setState({ menu: !this.state.menu })
  }

  render() {

  const show = (this.state.menu) ? "show" : "" ;

  return (

    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="/">Navbar
      <button className="navbar-toggler" type="button" onClick={ this.toggleMenu }>
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className={"collapse navbar-collapse " + show}>
        <div className="navbar-nav">
          <a className="nav-item nav-link active" href="/">Home <span class="sr-only">(current)</span>
          <a className="nav-item nav-link" href="/">Features
          <a className="nav-item nav-link" href="/">Pricing
          <a className="nav-item nav-link" href="/">logout
        </div>
      </div>
    </nav>

  );
  }
}
 */