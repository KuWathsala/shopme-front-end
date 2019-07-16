import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../../Stores/Actions/Index';
import {Redirect} from 'react-router-dom';
import axios from 'axios';

import "../Signup/Signup.css";
import { FacebookLoginButton, GoogleLoginButton } from "react-social-login-buttons";
import FacebookSignin from "./FacebookSignin.js";
import GoogleSignin from "./GoogleSignin.js";
import Spinner from '../../Containers/Spinner/Spinner'


const emailRegex=RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i);

const formValid=({formErrors,...rest})=>{
    let valid=true;
    Object.values(formErrors).forEach(val=>{
        val.length>0 &&(valid=false)
    });

    Object.values(rest).forEach(val=>{
        val=null && (valid=false);
    });

    return valid;
}

class SignIn extends Component{
  constructor(props){
    super(props);
    this.state={
      email:null,
      password:null,
      formErrors:{
        email:'',
        password:''
      }
    }
  }

  handleChange=e=>{
    e.preventDefault();
    const{name,value}=e.target;
    let formErrors=this.state.formErrors;

    switch(name){
        case "email":
        formErrors.email=
        emailRegex.test(value) 
        ?"":"Invalid email address";
        break;

        case "password":
        formErrors.password=
        value.length<1
        ?"required":"";
        break;
         
        default:
        break;
    }
    this.setState({formErrors,[name]:value},()=>console.log(this.state));
};

 /* handleSubmit= e=>{
    e.preventDefault();
    alert("process");
    axios.post('https://localhost:44337/api/users/create')
    .then(response=>{
        console.log(response);
        this.props.history.push("/");
    })
    .catch(error=>{
      console.log(error);
    });
    alert("Success");
};*/

SubmitHandeler= (event)=>{
    event.preventDefault();
    this.props.onAuth(this.state.email,this.state.password);
};


  render(){

    let authRedirect=null;
    if(this.props.isAuthenticated){
        authRedirect=<Redirect to="/"/>
    }

    let fomm=null;
    if(this.props.loading){
      fomm=<Spinner/>
    }

    const {formErrors}=this.state;
      return(
        
        <div className="wrapper">
        <div className="form-wrapper">
        {authRedirect}
        {fomm}
          <h3>Welcome Back, Sign in</h3><br/>
          <form className="pure-form" name="signin" onSubmit={this.SubmitHandeler}>

            <div className="email">
              <label htmlFor="email" className="col-form-label">Email</label>
              <input
                type="email" 
                className={formErrors.email.length>0?"error":null}
                placeholder="Email" 

                name="email"
                noValidate
                onChange={this.handleChange}
              />

              {formErrors.email.length>0 &&(
                  <span className="errorMessage">{formErrors.email}</span>
              )}
            </div>
                
            <div className="password">
              <label htmlFor="password" className="col-form-label">Password</label>
              <input
                  type="password" 
                  className={formErrors.password.length>0?"error":null}
                  placeholder="Password" 

                  name="password"
                  noValidate
                  onChange={this.handleChange}
              />
              {formErrors.password.length>0 &&(
                  <span className="errorMessage">{formErrors.password}</span>
              )}
            </div>             
              
            <button variant="outline-primary" type="submit" className="col-md-12 btn btn-primary btn-lg" style={{marginTop: 30}}>Sign in</button>
          </form>
          <div className="col-lg-12  row " style={{marginTop: 40}} >
            <div style={{marginLeft: 10}}><FacebookSignin /></div>
            <div style={{marginLeft: 14}}><GoogleSignin/></div>
          </div>

          <div class="text-center createAccount">
              <label className="col-form-label">New to <b>shopMe?</b></label><a href="/Bsignup"> Create an account</a>
          </div>
            </div>
          </div>
      );
  }
}

const mapStateToProps=state=>{
  return{
    isAuthenticated:state.auth.token!=null,
    loading:state.auth.loading
  }
}
const mapDispatchToProps=dispatch=>{
  return{
      onAuth:(email,password)=>dispatch(actions.authVerify(email,password))
  };
}
export default connect(mapStateToProps,mapDispatchToProps)(SignIn);
