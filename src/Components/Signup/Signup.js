import React,{Component} from "react";
import {Link,withRouter,Redirect} from 'react-router-dom';
import "./Signup.css";
import {connect} from 'react-redux';
import * as actions from '../../Stores/Actions/Index';
import { Field, reduxForm } from 'redux-form';
import { relative } from "path";
import Spinner from '../../Containers/Spinner/Spinner_2';
import Spinner2 from '../../Containers/Spinner/Spinner';
import axios from 'axios';
import {store} from '../../index';

const renderField = ({ input,label,type,click,value,meta: { touched, error, warning }}) => (
    <div className='row' style={{marginBottom:10,display:'flex'}}>
        <div className='col' style={{}}><label style={{color:'#ffff',fontWeight:'bold',columnWidth:120,paddingLeft:30}}>{label}</label></div>
        <div className='col col-xs-7 col-sm-7 col-lg-7' >
            <input {...input} placeholder={label} type={type} value={value} onclick={click} style={{alignSelf:'center',marginLeft:relative,width:200}}/>
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
            Image:Imgurl,
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
            isloading:false
        }
    }
        

 setLocation=()=>{
    // this.setState({isLocationSet:true})
    this.props.history.push('/map');  
}

fileUploadHandler =(event)=>{
    //this.setState({isloading:true})
    console.log(this.state.selectedFile)
    const files=event.target.files
    const formData = new FormData();
    formData.append("file", files[0]);
    // formData.append("public_id", "product_image");
    // formData.append("timestamp", timeStamp);
    formData.append("upload_preset", 'm0uhbhzz');
    // setLoading(true);
    //fd.append('image', this.state.selectedFile,this.state.selectedFile.name);
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
    
return(
<div className="wrapper">
    <div className="wrapForm">
    {this.props.isloading ? <Spinner/> : <div>
    <h1 style={{fontWeight:'bold' ,color:'white'}}>Create Account</h1>
    
    <div>
    
    {
    this.props.usertype=="Seller" ? 
        <div className='col col-md-12'>
            <input type="text" placeholder="Click to setup shop location" className='form-control 'onClick={this.setLocation} value={this.props.Address}/>
            <i class="glyphicon glyphicon-map-marker form-control-feedback"></i>
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
                {/* <Field name = "eventLocation"
                    values="gghhgghh"
                    component = {renderLatLng}
                     /> */}

                {/* <p>{this.props.Address}</p> */}
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
                <div className='row' style={{marginBottom:10,display:'flex'}}>
                <label style={{color:'#ffff',fontWeight:'bold',columnWidth:140,paddingLeft:30}}>Vehicle Type</label>
                <div>
                <Field name="VehicleType" component="select" style={{alignSelf:'center',marginLeft:relative,height:37,width:200}}>
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
                <label htmlFor="img">Image</label>
              {this.state.isloading ? <Spinner2/> :
              <input 
                style={{backgroundColor:'white',marginBottom:15,width:400}}
                name="Image"
                type="file"
                onChange={this.fileUploadHandler}
                value={this.state.image}
                // ref={fileInput=>this.fileInput=fileInput}/>
                // <button onClick={()=>this.fileInput.click()}>Pick File</button>
                // <button onClick={this.fileUploadHandler}>upload</button>
                />  }
         <div style={{alignContent:'center',marginLeft:'30%'}}>
            <button type="submit" className="btn btn-default" disabled={submitting}>SUBMIT</button>
            <div><Link to="/Signin"><small>Already have an Account</small></Link></div>
        </div>   
    </form>
    </div>}
</div>
</div>
);
};
    }
    

const mapStateToProps=state=>{
    return{
      usertype:state.auth.userType,
      Address:state.location.address,
      lng:state.location.lngValue,
      lat:state.location.latValue,
      isloading:state.auth.loading
    }
  }

  export default withRouter(connect(mapStateToProps,null)(reduxForm({
    form: 'SignUp',
  })(Signup)))
