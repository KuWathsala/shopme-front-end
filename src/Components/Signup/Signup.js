import React,{Component} from "react";
import {Link,withRouter,Redirect} from 'react-router-dom';
import "./Signup.css";
import {connect} from 'react-redux';
import * as actions from '../../Stores/Actions/Index';
import { Field, reduxForm } from 'redux-form';
import { relative } from "path";
import Spinner from '../../Containers/Spinner/Spinner_2';
// import Spinner2 from '../../Containers/Spinner/Spinner';
import axios from 'axios';
import {store} from '../../index';

const renderField = ({ input,label,type,click,value,meta: { touched, error, warning }}) => (
    <div className='row' style={{marginBottom:10,display:'flex'}}>
        <div className='col col-xs-7 col-sm-7 col-lg-7 pull-right' >
            <input {...input} placeholder={label} type={type} value={value} onclick={click} style={{alignSelf:'center',marginLeft:relative, width:350,height:40, borderBottomWidth:2, borderBottomColor:'green'}}/>{/**,color:"green" */}
          {touched && ((error && <span style={{color:'red',backgroundColor:'white',fontWeight:'bold'}}>{error}</span>) ||(warning && <span>{warning}</span>))}
        </div>
    </div>
  )


  const required=value=> value ? undefined:'Required';
  const isValidEmail=value=> value && !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i.test(value) ? 'Invalid email address':undefined;
  const isValidPassword=value=> value && !/^(?=.{10,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$/i.test(value) ? 'Required UPPERCASE, lowercase, digit, symbol and minimum 10 characters ':undefined;
  const passwordMatch=(value,allValues)=> value!==allValues.Password ? 'Passwords do not Match':undefined;
  const isMobile=(value)=> value && !/^[0-9]{10}$/i.test(value) ? "Invalid mobile number":undefined;

  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

  let Imgurl='';

  const submit=(values)=> {
    return sleep(500).then(() => {
        const latitude=store.getState().location.latValue;
        const longitude=store.getState().location.lngValue;
        const role=store.getState().auth.userType;
        console.log(store.getState().auth.userType)
        let authData
        if(role=="Seller")
          authData={
            LoginVM:{
              Email:values.Email,
              Password:values.Password,
              Role:role
            },
            FirstName:values.FirstName,
            LastName:values.LastName,
            MobileNumber:values.MobileNumber,
            ShopName:values.ShopName,
            AccountNo:values.AccountNo,
            ShopLocationLatitude:latitude,
            ShopLocationLongitude:longitude,
            ShopAddress:values.Address,
            returnSecureToken: true,
            profileImage:Imgurl,
            image:Imgurl,
              }
        else if(role=="Deliverer")
          authData={
            LoginVM:{
              Email:values.Email,
              Password:values.Password,
              Role:role
            },
            FirstName:values.FirstName,
            LastName:values.LastName,
            MobileNumber:values.MobileNumber,
            VehicleNo:values.VehicleNo,
            VehicleType:values.VehicleType,
            returnSecureToken: true,
            Image:Imgurl,
          }
        else if(role=="Customer")
          authData={
            LoginVM:{
              Email:values.Email,
              Password:values.Password,
              Role:role
            },
            FirstName:values.FirstName,
            LastName:values.LastName,
            MobileNumber:values.MobileNumber,
            returnSecureToken: true,
            ProfileImage:Imgurl,
          }
            
        console.log(authData)
        store.dispatch(actions.auth(authData));
        }) 
  }

class Signup extends Component{
    constructor(props){
        super(props);
        this.state={
            isloading:false,
            //authRedirect:this.props.isAuthenticated,
        }
    }
        

 setLocation=()=>{
    // this.setState({isLocationSet:true})
    this.props.history.push('/map');  
}

fileUploadHandler =(event)=>{
    console.log(this.state.selectedFile)
    const files=event.target.files
    const formData = new FormData();
    formData.append("file", files[0]);
    formData.append("upload_preset", 'm0uhbhzz');
    axios.post('https://api.cloudinary.com/v1_1/dubnsitvx/image/upload',formData,{
        onUploadProgress: ProgressEvent=>{
            console.log('Upload Progress:'+Math.round(ProgressEvent.loaded / ProgressEvent.total*100 )+'%')
        }
    })
    .then(res=>{
        console.log(res.data.url);
        Imgurl=res.data.url;
    });
}
    

render() {
    let authRedirect;
    if(this.props.isAuthenticated){
        authRedirect=<Redirect to="/"/>
    }
    const vehicles = ["Motor Bicycle", "Three Wheel"];
    const {handleSubmit, pristine, reset, submitting}=this.props;
    
    if(this.props.isverify==false)
        return <Redirect to="/verify"/>
    else return(
    <div style={{height:1200}}>
    <div className="wrapper" >
    {authRedirect}
    <div className="wrapForm">
    {this.props.isloading ? <Spinner/> : <div>
    <text style={{marginTop:50,fontSize: 50, fontFamily: 'Calibri Light', fontWeight:'bolder', marginLeft: 20}} >
        Create Account
    </text>
    
    <div>
    
    {
    this.props.usertype=="Seller" ? 
        <div className='col col-md-7'>
            <input type="text" placeholder="Click to setup shop location" className='form-control1 'onClick={this.setLocation} value={this.props.Address}
           style={{alignSelf:'center',marginBottom: 10,marginLeft: -15, width:350,height:40, borderBottomWidth:2, borderBottomColor:'green'}}
            />
            <i class="glyphicon glyphicon-map-marker form-control-feedback" style={{color:'red'}}></i>
        </div>
     :null
}
    </div>
    <form onSubmit={handleSubmit(submit)}>
        <Field 
            name="FirstName"
            type="text"
            component={renderField}
            label="First Name"
            validate={[required]}
            click={null}
            value={null}
        />
      <Field
            name="LastName"
            type="text"
            component={renderField}
            label="Last Name"
            click={null}
            value={null}
            validate={[required]}
      />
        
        {this.props.usertype=="Seller" ?
            <div>
                <Field
                    name="ShopName"
                    type="text"
                    component={renderField}
                    label="Shop Name"
                    click={null}
                    value={null}
                    validate={[required]}
                />
                <Field
                    name="AccountNo"
                    type="text"
                    component={renderField}
                    label="Account No"
                    click={null}
                    value={null}
                    validate={[required]}
                />
                <Field
                    name="Address"
                    type="text"
                    component={renderField}
                    label="Address"
                    click={null}
                    value={null}
                    validate={[required]}
                />
            </div>
                :null}


        {this.props.usertype=="Deliverer" ?
            <div>
                <Field
                    name="VehicleNo"
                    type="text"
                    component={renderField}
                    label="Vehicle No"
                    click={null}
                    value={null}
                    validate={[required]}
                />
                <div className='row' style={{marginBottom:10,display:'flex'}}><div>
                <Field name="VehicleType" component="select" 
                    style={{alignSelf:'center',marginLeft: 15, width:350,height:40, borderBottomWidth:2, borderBottomColor:'green'}}
                >
                <option value="">Select a vehicle...</option>
                    {vehicles.map(Option => (
                        <option value={Option} key={Option}>
                    {Option}
                </option>
                        
                    ))}
                </Field>
                </div>
                </div>
                </div> :null}
        
                <Field
                    name="MobileNumber"
                    type="text"
                    component={renderField}
                    label="Mobile No"
                    click={null}
                    value={null}
                    validate={[required,isMobile]}
                />

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
                    validate={[required,isValidPassword]}
                />

                <Field
                    name="ConfirmPassword"
                    type="password"
                    component={renderField}
                    label="Confirm Password"
                    click={null}
                    value={null}
                    validate={[required,passwordMatch]}
                />

                <div style={{textAlign:"left",color:'black'}}>     
              <input 
                style={{backgroundColor:'white',marginBottom:15,width:350,alignContent:'center', borderBottomWidth: 2, borderRadius: 0, borderBottomColor: 'green'}}
                name="Image"
                type="file"
                onChange={this.fileUploadHandler}
                value={this.state.image}
                /> 
                 </div>
         <div style={{alignContent:'center'}}>
            <button type="submit" className="btn btn-success" disabled={submitting}
                style={{backgroundColor: 'green', borderRadius: 0, width: 350, fontFamily:'calibri', fontSize: 20,marginBottom:50}}
            >
                SUBMIT
            </button>
            <div style={{alignSelf:'center'}}>
                <Link to="/Signin">
                    <text style={{alignSelf:'center', color: 'black', marginLeft: 100}} >Already have an Account</text></Link>
            </div>
            
        </div>   
    </form>
    </div>}
</div>
</div>
</div>
);
};
    }
    

const mapStateToProps=state=>{
    return{
      isAuthenticated:state.auth.token!=null,
      usertype:state.auth.userType,
      Address:state.location.address,
      lng:state.location.lngValue,
      lat:state.location.latValue,
      isloading:state.auth.loading,
      isverify:state.auth.verifyState
    }
  }

  export default withRouter(connect(mapStateToProps,null)(reduxForm({
    form: 'SignUp',
  })(Signup)))