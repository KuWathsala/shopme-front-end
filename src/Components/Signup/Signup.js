import React,{Component} from "react";
import {Link,withRouter} from 'react-router-dom';
import Select from 'react-select';
import "./Signup.css";
import {connect} from 'react-redux';
import * as actions from '../../Stores/Actions/Index';
import { Field, reduxForm } from 'redux-form';
//import submit from './submit';
import { relative } from "path";

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
  const isValidPassword=value=> value && !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i.test(value) ? 'Password must contain UPPERCASE lowercase and numbers':undefined;
  const passwordMatch=(value,allValues)=> value!==allValues.Password ? 'Passwords do not Match':undefined;
  
  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

  function submit(values) {
    return sleep(1000).then(() => {
      // simulate server latency
      // if (!['john', 'paul', 'george', 'ringo'].includes(values.username)) {
      //   throw new SubmissionError({
      //     username: 'User does not exist',
      //     _error: 'Login failed!'
      //   })
      // } else if (values.password !== 'redux-form') {
      //   throw new SubmissionError({
      //     password: 'Wrong password',
      //     _error: 'Login failed!'
      //   })
      // } else {
        window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`)
        console.log(values);
   
         }     ) 
  }
  

class Signup extends Component{
    constructor(props){
        super(props);}

        setLocation=()=>{
           // this.setState({isLocationSet:true})
            this.props.history.push('/map');  
        }
        
    

render() {
    const {handleSubmit, pristine, reset, submitting}=this.props;
    const vehicles = [
        { label: "Motor Bicycle", value: "motorbicyle" },
        { label: "Three wheel", value: "threewheel" },
      ];
return(
<div className="wrapper">
    <div className="form">
    <h1 style={{fontWeight:'bold' ,color:'white'}}>Create Account</h1>
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
                </div>:null}

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
                <Select options={ vehicles } /></div> :null}
        
                <Field
                    name="MobileNo"
                    type="text"
                    component={renderField}
                    label="Mobile No"
                    click={null}
                    value={null}
                    validate={[required]}
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

        {
            this.props.usertype=="Seller" ? 
            // <div onclick={this.setLocation}>
            //      <div style={{}}>
            //     <button type="default" onClick={this.setLocation}>Set location</button>
            //     </div> 
                <Field
                    name="Location"
                    type="text"
                    component={renderField}
                    label="Shop Location"
                    click={this.setLocation} 
                    value={this.props.Address}
                    validate={[required]}
                />

                // <div className='col col-md-12'>
                //     <input type="text" placeholder="Click to setup shop location" className='form-control 'onClick={this.setLocation} value={this.props.Address}/>
                //     <i class="glyphicon glyphicon-map-marker form-control-feedback"></i>
                // </div>
                 :null
        }
         <div style={{alignContent:'center',marginLeft:'30%'}}>
            <button type="submit" className="btn btn-default" disabled={submitting}>SUBMIT</button>
            <div><Link to="/Signin"><small>Already have an Account</small></Link></div>
        </div>   
    </form>
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
      lat:state.location.latValue
    }
  }

  const mapDispatchToProps=dispatch=>{
    return{
        onAuth:(email,password,firstName,lastName,lat,lng,userType,mobileno,shopname,accno,vhno,vehicle)=>dispatch(actions.auth(email,password,firstName,lastName,lat,lng,userType,mobileno,shopname,accno,vhno,vehicle))
    };
}

  export default withRouter(connect(mapStateToProps,null)(reduxForm({
    form: 'SignUp', // a unique identifier for this form
   // validate, // <--- validation function given to redux-form
    // <--- warning function given to redux-form
  })(Signup)))


/*export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Signup));*/