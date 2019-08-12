import React from 'react';
import {withRouter,Link} from 'react-router-dom';
import  '../../bootstrap-3.3.7-dist/css/bootstrap.min.css';

export default class Firstnav extends React.Component {

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
    <nav class="navbar navbar-default">
  <div class="container-fluid">
    <div class="navbar-header">
      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse"  onClick={ this.toggleMenu } data-target="#bs-example-navbar-collapse-1">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <a class="navbar-brand" href="#">Home</a>
    </div>

    <div className={"collapse navbar-collapse " + show}>
      
      <ul class="nav navbar-nav">
        <li className="active"><a><Link to='/'><span class="glyphicon glyphicon-home">Home</span></Link></a></li>
                
            {!this.props.isAuth ?<li><a><Link to='/seluser'>Register</Link></a></li>:null}

          <li><a><Link to='/'>Help</Link></a></li>
          <li><a><Link to='/'>Notfication</Link></a></li>
          
          {!this.props.isAuth ? <li><a><Link to='/Signin'>Hi, Sign In</Link></a></li>
                          :<li><a><Link to='/logout'>Logout</Link></a></li>}
          {this.props.userT=="Seller" && this.props.isAuth ? 
                  <div><li><a><Link to='/'>Add Products</Link></a></li>
                        <li><a><Link to='/'>Inventory</Link></a></li>
                  </div>
            :null}
      </ul>
    </div>
  </div>
</nav>
  );
  }
}


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
      <a className="navbar-brand" href="/">Navbar</a>
      <button className="navbar-toggler" type="button" onClick={ this.toggleMenu }>
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className={"collapse navbar-collapse " + show}>
        <div className="navbar-nav">
          <a className="nav-item nav-link active" href="/">Home <span class="sr-only">(current)</span></a>
          <a className="nav-item nav-link" href="/">Features</a>
          <a className="nav-item nav-link" href="/">Pricing</a>
          <a className="nav-item nav-link" href="/">logout</a>
        </div>
      </div>
    </nav>

  );
  }
}
 */