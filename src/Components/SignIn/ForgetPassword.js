import React,{Component} from "react";
import {connect} from 'react-redux';
import axios from 'axios';
import { Redirect} from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import {store} from '../../index';
import * as actions from '../../Stores/Actions/Index';
import Spinner from '../../Containers/Spinner/Spinner_2';

const renderField = ({ input,label,type,click,value,meta: { touched, error, warning }}) => (
    <div className='row' style={{display:'flex'}}>
        <div style={{flex:1,height:600,width:'100%'}} >
            <input {...input} placeholder={label} type={type} value={value} onclick={click} style={{position: 'absolute', left: '50%',transform: 'translate(-50%, -50%)',marginTop:80,width:'40%',textAlign:'center',fontSize:24,borderColor:'white',borderBottomColor:'green',borderBottomWidth:5}}/>{/**,color:"green" */}
          {touched && ((error && <span style={{color:'red',backgroundColor:'white',fontWeight:'bold',position: 'absolute', left: '80%',transform: 'translate(-50%, -50%)',marginTop:80,width:'40%',textAlign:'center'}}>{error}</span>) ||(warning && <span>{warning}</span>))}
        </div>
    </div>
  )
  const renderField2 = ({ input,label,type,click,value,meta: { touched, error, warning }}) => (
    <div className='row' style={{marginBottom:10,display:'flex'}}>
        <div style={{flex:1,height:600,width:'100%',}} >
            <input {...input} placeholder={label} type={type} value={value} onclick={click} style={{position: 'absolute', left: '50%',transform: 'translate(-50%, -50%)',marginTop:-380,width:'40%',textAlign:'center',fontSize:24,borderColor:'white',borderBottomColor:'green',borderBottomWidth:5}}/>{/**,color:"green" */}
          {touched && ((error && <span style={{color:'red',backgroundColor:'white',fontWeight:'bold',position: 'absolute', left: '80%',transform: 'translate(-50%, -50%)',marginTop:-380,width:'40%',textAlign:'center'}}>{error}</span>) ||(warning && <span>{warning}</span>))}
        </div>
    </div>
  )

const required=value=> value ? undefined:'Required';

class ForgetPassword extends Component{
    constructor(props){
        super(props);
    this.state={
        code:null,
        isTrue:null,
        email:null,
        emailadd:false,
        sentEmail:null,
        loading:false,
    }
    }

    submit=(values)=>{
        this.setState({loading:true});
        const resetPassword={
            email:this.state.email,
            password:values.password
        }
        let url=`https://backend-webapi20191102020215.azurewebsites.net/api/UserAuth/resetPassword/`;
        axios.post(url,resetPassword)
        .then(response=>{
            console.log(response);  
            this.setState({loading:false});
            store.dispatch(actions.authSuccess(response.data.data.token,response.data.data.id,response.data.role));
        })
        .catch(err=>{
            console.log(err);
            this.setState({loading:false});
        });
    }

    handleSubmitEmail=(e)=>{
        e.preventDefault();
        this.setState({loading:true});
        let url=`https://backend-webapi20191102020215.azurewebsites.net/api/UserAuth/forgetPassword/${this.state.email}`;
        axios.post(url,)
        .then(response=>{
            console.log(response); 
            this.setState({loading:false}); 
            this.setState({emailadd:response.data,sentEmail:response.data});   
        })
        .catch(err=>{
            console.log(err);
            this.setState({loading:false});
        });
    }
    handleSubmitCode=(e)=>{
        e.preventDefault();
        this.setState({loading:true});
        let url=`https://backend-webapi20191102020215.azurewebsites.net/api/UserAuth/verify/${this.state.code}`;
        axios.post(url,)
        .then(response=>{
            console.log(response);  
            this.setState({isTrue:response.data});  
            this.setState({loading:false}); 
        })
        .catch(err=>{
            console.log(err);
            this.setState({loading:false});
        });
    }

    resend=(e)=>{
        e.preventDefault();
        this.setState({loading:true});
        let url=`https://backend-webapi20191102020215.azurewebsites.net/api/UserAuth/forgetPassword/${this.state.email}`;
        axios.post(url,)
        .then(response=>{
            console.log(response);  
            this.setState({isTrue:response.data});  
            this.setState({loading:false}); 
        })
        .catch(err=>{
            console.log(err);    
            this.setState({loading:false});
        });
        console.log("resend");
    }
    render(){
        const {handleSubmit, pristine, reset, submitting}=this.props;
        if(this.state.isTrue){
            return(
                <form onSubmit={handleSubmit(this.submit)}>
                <div style={{flex:1,height:600,width:'100%',}}> 
                    <h1 style={{marginTop:100}}>Reset your password</h1>
                     <Field 
                        name="password"
                        type="text"
                        component={renderField}
                        label="Password"
                        validate={[required]}
                        click={null}
                        value={null}
                    />
                    <Field 
                        name="ConfirmPassword"
                        type="text"
                        component={renderField2}
                        label="Confirm Password"
                        validate={[required]}
                        click={null}
                        value={null}
                    />
                    <button className="btn btn-success" disabled={this.state.loading} style={{marginTop:-900, position: 'absolute',left:'50%',transform: 'translate(-50%, -50%)',width:'40%',height:60,fontSize:25,backgroundColor:'green'}}
                    >Next →</button>
                    {this.state.loading ? <div style={{position:'relative'}}><Spinner/></div>:null}
                </div>
                </form>
            )
        }else return(
            <div>
                <h1 style={{marginTop:100,fontSize:48}}>Forget Password</h1>
            {this.state.emailadd ===false ?
            <form onSubmit={this.handleSubmitEmail}>
            <div style={{flex:1,height:600,width:'100%',}}> 
                <div className='col'>
                <input type='text' placeholder='Email' value={this.state.code} style={{position: 'absolute', left: '50%',transform: 'translate(-50%, -50%)',marginTop:80,width:'40%',textAlign:'center',fontSize:24,borderColor:'white',borderBottomColor:'green',borderBottomWidth:5}}
                    onChange={(event)=>this.setState({email:event.target.value}) }
                ></input>
                <button className="btn btn-success" disabled={this.state.loading} style={{marginTop:180,position: 'absolute',left:'50%',transform: 'translate(-50%, -50%)',width:'40%',height:60,fontSize:25,backgroundColor:'green'}}>
                    Next →
                </button>
                {this.state.sentEmail==false ?
                <div>
                <p style={{marginTop:260,position: 'absolute',left:'50%',transform: 'translate(-50%, -50%)',fontSize:25,color:'red'}}>Invalid Email Address or User not Signed up</p>
                </div>
                :null}
                
                </div>
                {this.state.loading ? <div style={{position:'relative',marginTop:300}}><Spinner/></div>:null}
            </div>
            </form>:
            <form onSubmit={this.handleSubmitCode}>
            <div style={{flex:1,height:600,width:'100%',}}> 
                <h1 style={{marginTop:100}}>Your verification code has been sent to your email..</h1>
                <div className='col'>
                <input type='text' value={this.state.code} style={{position: 'absolute', left: '50%',transform: 'translate(-50%, -50%)',marginTop:80,width:'40%',textAlign:'center',fontSize:48,borderColor:'white',borderBottomColor:'green',borderBottomWidth:5}}
                    onChange={(event)=>this.setState({code:event.target.value}) }
                ></input>
                <button className="btn btn-success" disabled={this.state.loading} style={{marginTop:180,position: 'absolute',left:'50%',transform: 'translate(-50%, -50%)',width:'40%',height:60,fontSize:25,backgroundColor:'green'}}
                >Next →</button>
                {this.state.isTrue==false ?
                <div>
                <p style={{marginTop:260,position: 'absolute',left:'50%',transform: 'translate(-50%, -50%)',fontSize:25,color:'red'}}>Invalid Verification code</p>
                <p style={{marginTop:300,position: 'absolute',left:'50%',transform: 'translate(-50%, -50%)',fontSize:25,color:'blue'}} onClick={()=>this.resend()}>Resend verification code</p>
                </div>
                :null}
                </div>
                {this.state.loading ? <div style={{position:'relative',marginTop:300}}><Spinner/></div>:null}
            </div>
            </form>}
            </div>
        )
    }
}

const mapStateToProps=state=>{
    return{
      isAuthenticated:state.auth.token!=null,
      //isloading:state.auth.loading
    }
  }
  
export default reduxForm({
    form:'ForgetPassword'
})(connect(mapStateToProps,null)(ForgetPassword))

