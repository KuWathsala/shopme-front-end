import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../../Stores/Actions/Index';
import {Link,Redirect} from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import axios from 'axios';
import {store} from '../../index';
import Spinner from '../../Containers/Spinner/Spinner_2';


const renderField = ({ input,label,type,click,value,meta: { touched, error, warning }}) => (
  
      <div className="center-block" >
          <input  {...input} placeholder={label} type={type} value={value} onclick={click} style={{position: 'absolute', left: '50%',transform: 'translate(-50%, -50%)',marginTop:80,width:'40%',textAlign:'center',fontSize:24,borderColor:'white',borderBottomColor:'green',borderBottomWidth:3}}/><br/>
          {touched && ((error && <span style={{color:'red',backgroundColor:'white',fontWeight:'bold',position: 'absolute', left: '50%',transform: 'translate(-50%, -50%)',marginTop:100,width:'40%',textAlign:'center' , marginBottom: 80}}>{error}</span>) ||(warning && <span>{warning}</span>))}
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
    super(props);
    this.state={
      authRedirect:this.props.isAuthenticated,
    }
  }

render(){
  const {handleSubmit, pristine, reset, submitting}=this.props;
  if(this.state.authRedirect)  
    return (<Redirect to="/"/>);
  else return(
               <form onSubmit={handleSubmit(submit)}>
                <div style={{flex:1,height:600,width:'100%',}}> 
                    <h1 style={{marginTop:100,fontSize: 50, fontFamily: 'Calibri Light', fontWeight:'bolder'}}>Sign in</h1>
                    <Field
                    name="Email"
                    type="text"
                    component={renderField}
                    label="Email"
                    click={null}
                    value={null}
                    validate={[required,isValidEmail]}
                />
                <div style={{marginTop: 80}}></div>
                <Field
                    name="Password"
                    type="password"
                    component={renderField}
                    label="Password"
                    click={null}
                    value={null}
                    validate={[required]}
                />   
                    <button className="btn btn-success" disabled={this.state.loading} style={{marginTop: 170, position: 'absolute',left:'50%',transform: 'translate(-50%, -50%)',width:'40%',height:50,fontSize:25,backgroundColor:'green', borderRadius: 0}}>Next →
                    </button>
                    {this.props.isloading ? <div style={{position:'relative', marginTop: 220, }}><Spinner/></div>:null}
                </div>
                <text style={{position: 'absolute',color:'red', left: '50%',transform: 'translate(-50%, -50%)',marginTop:80,width:'40%',textAlign:'center',fontSize:24,borderColor:'white',borderBottomColor:'green',borderBottomWidth:3}}>
                  {this.props.errorr}
                </text>
                  
                </form>
      );
  }
}

const mapStateToProps=state=>{
  return{
    isAuthenticated:state.auth.token!=null,
    isloading:state.auth.loading,
    errorr: state.auth.error
   
  }
}
export default connect(mapStateToProps,null)(reduxForm({
  form: 'SignIn',
})(SignIn))
