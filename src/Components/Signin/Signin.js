import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../../Stores/Actions/Index';
import {Redirect} from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import axios from 'axios';
import {store} from '../../index'

import "../Signup/Signup.css";
import { FacebookLoginButton, GoogleLoginButton } from "react-social-login-buttons";
import FacebookSignin from "./FacebookSignin.js";
import GoogleSignin from "./GoogleSignin.js";
import Spinner from '../../Containers/Spinner/Spinner_2'

const renderField = ({ input,label,type,click,value,meta: { touched, error, warning }}) => (
  <div className='row' style={{marginBottom:10,display:'flex'}}>
      <div className='col' style={{}}><label style={{color:'#ffff',fontWeight:'bold',columnWidth:120,paddingLeft:30}}>{label}</label></div>
      <div className='col col-xs-7 col-sm-7 col-lg-7' >
          <input {...input} placeholder={label} type={type} value={value} onclick={click} style={{alignSelf:'center',width:200}}/>
        {touched && ((error && <span style={{color:'red',backgroundColor:'white',fontWeight:'bold'}}>{error}</span>) ||(warning && <span>{warning}</span>))}
      </div>
  </div>
)
const required=value=> value ? undefined:'Required';
const isValidEmail=value=> value && !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i.test(value) ? 'Invalid email address':undefined;

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const submit=(values)=> {
  return sleep(1000).then(() => {
      let authData
      authData={...values,returnSecureToken: true}
      console.log(authData)
     store.dispatch(actions.authVerify(authData));
      //window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`)
      }) 
}

class SignIn extends Component{
  constructor(props){
    super(props);}

render(){

    let authRedirect=null;
    if(this.props.isAuthenticated){
        authRedirect=<Redirect to="/"/>
    }

    let fomm=null;
    if(this.props.loading){
      fomm=<Spinner/>
    }
    const {handleSubmit, pristine, reset, submitting}=this.props;
    return(
        
        <div className="wrapper">
        {this.props.isloading ? <Spinner/>:null}
        <div style={{
                alignSelf:'center',
                justifyContent:'center',
                flex:1,
                backgroundColor:'rgb(73, 71, 71)',
                margin: '10px',
                width: '400px',
                display: 'flex',
                flexDirection: 'column',
                /* border-radius: 10px; */
                boxShadow: '0px 10px 50px #555',
                opacity: 0.6,
                filter: 'alpha(opacity=60)', 
                flexWrap:'wrap',}}>
        {authRedirect}
        {fomm}
          <h3 style={{alignSelf:'center',fontWeight:'bold',color:'white'}}>Welcome Back, Sign in</h3><br/>
          <form onSubmit={handleSubmit(submit)}>
                <Field
                    name="Email"
                    type="text"
                    component={renderField}
                    label="Email"
                    click={null}
                    value={null}
                    validate={[required,isValidEmail]}
                />
                
                <Field
                    name="Password"
                    type="password"
                    component={renderField}
                    label="Password"
                    click={null}
                    value={null}
                    validate={[required]}
                />             
              
            <button variant="outline-primary" type="submit" className="col-md-12 btn btn-primary btn-lg" disabled={submitting} style={{marginTop: 30}}>Sign in</button>
          </form>
          <div className="col-lg-12  row " style={{marginTop: 40}} >
            <div style={{marginLeft: 10}}><FacebookSignin /></div>
            <div style={{marginLeft: 14}}><GoogleSignin/></div>
          </div>

          <div class="text-center createAccount">
              <label className="col-form-label" style={{alignSelf:'center',fontWeight:'bold',color:'white'}}>New to <b>shopMe?</b></label><a href="/BsignUp"> Create an account</a>
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
export default connect(mapStateToProps,null)(reduxForm({
  form: 'SignIn',
})(SignIn))
