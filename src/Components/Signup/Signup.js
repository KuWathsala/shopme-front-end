import React,{Component} from "react";
import {Link,withRouter} from 'react-router-dom';
import Select from 'react-select';
import "./Signup.css";
//import axios from 'axios';
import {connect} from 'react-redux';
import * as actions from '../../Stores/Actions/Index';

const emailRegex=RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);

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

class Signup extends Component{

    constructor(props){
        super(props);
        this.state={
            firstName:null,
            lastName:null,
            email:null,
            password:null,
            confirmPassword:null,
            shopLocation:{
                lat:null,
                lng:null
            },
            mobileNumber:null,
            shopname:null,
            accNo:null,
            VHno:null,
            Vehicle:null,
            formErrors:{
                firstName:"",
                lastName:"",
                email:"",
                password:"",
                confirmPassword:"",
                shopLocation:{
                    lat:"",
                    lng:""
                },
                mobileNumber:"",
                shopname:"",
                accNo:"",
                VHno:"",
                Vehicle:"",
            },
            isLocationSet: false,

        };
    }

    submitDataHandler =()=>{
        const formdetails={
            firstName:this.state.firstname,
            lastName:this.state.lastName,
            email:this.state.email,
            password:this.state.password,
            confirmPassword:this.state.confirmPassword,
            addressLine1:this.state.addressLine1,
            addressLine2:this.state.addressLine2,
            city:this.state.city,
            zipCode:this.UNSAFE_componentWillMount.state.zipCode


        }
       /* axios.post('https://localhost:44314/api/customers',formdetails)
        .then(response=>{
            console.log(response);
        });*/
    }
   

    handleSubmit= (event)=>{
        event.preventDefault();
        //this.props.onAuth(this.state.email,this.state.formdetails.password.value);

        if(formValid(this.state)){
            console.log(
                `----SUBMITTING----
            First Name: ${this.state.firstName}
            Last Name: ${this.state.lastName}
            Email: ${this.state.email}
            password: ${this.state.password}
            Confirm Password: ${this.state.confirmPassword}
            
            `)
        }else{
            console.error(`FORM INVALID=DISPLAY ERROR MESSAGE`);
        }
};

SubmitHandeler= (event)=>{
    event.preventDefault();
    this.props.onAuth(
        this.state.email,
        this.state.password,
        this.state.firstName,
        this.state.lastName,
        "signUp"
        );
};
setLocation=()=>{
    this.setState({isLocationSet:true})
    this.props.history.push('/map');  
}


    handleChange=e=>{
        e.preventDefault();
        const{name,value}=e.target;
        let formErrors=this.state.formErrors;
    
            switch(name){
            case "firatName":
            formErrors.firstName=
            value.length<2 ?"minimum 2 characters required":"";
            break;

            case "lastName":
            formErrors.lastName=
            value.length<2 
            ?"minimum 2 characters required":"";
            break;

            case "email":
            formErrors.email=
            emailRegex.test(value) 
            ?""
            :"Invalid email address";
            break;

            case "password":
            formErrors.password=
            value.length<6 
            ?"minimum 6 characters required":"";
            break;

            case "confirmPassword":
            formErrors.confirmPassword=(formErrors.confirmPassword===formErrors.password) ? "" : "minimum 6 characters required";
            break;
             
            default:
            break;
    }
    this.setState({formErrors,[name]:value},()=>console.log(this.state));
    };
render(){
    const{formErrors}=this.state;

    const vehicles = [
        { label: "Motor Bicycle", value: "motorbicyle" },
        { label: "Three wheel", value: "threewheel" },
      ];

return(
<div className="wrapper">
    <div className="form-wrapper">
    <h1>Create Account</h1>
    <form onSubmit={this.hadleSubmit} novalidate>
        
            <div>
            <div className="firstName">
            <label htmlFor="firstName">First Name</label>

            <input
                type="text" 
                className={formErrors.firstName.length>0?"error":null}
                placeholder="First Name" 

                name="firstName"
                noValidate
                onChange={this.handleChange}
            />
            {formErrors.firstName.length>0 &&(
                <span className="errorMessage">{formErrors.firstName}</span>
            )}
        </div>

        <div className="lastName">
            <label htmlFor="lastName">Last Name</label>
                <input
                    type="text" 
                    className={formErrors.lastName.length>0?"error":null}
                    placeholder="Last Name" 

                    name="lastName"
                    noValidate
                    onChange={this.handleChange}
                />
            {formErrors.lastName.length>0 &&(
                <span className="errorMessage">{formErrors.lastName}</span>
            )}
        </div>
        </div>
        
        {
            this.props.usertype=="Seller" ?
            <div>
                        <div className="firstName">
                    <label htmlFor="shopname">Shop Name</label>

                    <input
                        type="text" 
                        className={formErrors.firstName.length>0?"error":null}
                        placeholder="Shop Name" 

                        name="shopname"
                        noValidate
                        onChange={this.handleChange}
                    />
                    {formErrors.firstName.length>0 &&(
                        <span className="errorMessage">{formErrors.firstName}</span>
                    )}
                    </div>

                    <div className="accNo">
                    <label htmlFor="accNo">Account No.</label>

                    <input
                        type="text" 
                        className={formErrors.firstName.length>0?"error":null}
                        placeholder="Account No." 

                        name="mobileNumber"
                        noValidate
                        onChange={this.handleChange}
                    />
                    {formErrors.firstName.length>0 &&(
                        <span className="errorMessage">{formErrors.firstName}</span>
                    )}
                    </div>
            </div>
            
            :null}

            {this.props.usertype=="Deliverer" ?
                <div>
                        <div className="VHno">
                                <label htmlFor="VHno">Vehicle No.</label>

                                <input
                                    type="text" 
                                    className={formErrors.firstName.length>0?"error":null}
                                    placeholder="Vehicle No." 

                                    name="VHno"
                                    noValidate
                                    onChange={this.handleChange}
                                />
                                {formErrors.firstName.length>0 &&(
                                    <span className="errorMessage">{formErrors.firstName}</span>
                                )}
                        </div>
                        <Select options={ vehicles } />

                    </div> :null}
        
        <div className="mobileNumber">
            <label htmlFor="mobileNumber">Mobile No.</label>

            <input
                type="text" 
                className={formErrors.firstName.length>0?"error":null}
                placeholder="Mobile No." 

                name="mobileNumber"
                noValidate
                onChange={this.handleChange}
            />
            {formErrors.firstName.length>0 &&(
                <span className="errorMessage">{formErrors.firstName}</span>
            )}
        </div>

        <div className="email">
            <label htmlFor="email">Email</label>
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
            <label htmlFor="password">Password</label>
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

        <div className="confirmPassword">
            <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                    type="Password" 
                    className={formErrors.password.length>0?"error":null}
                    placeholder="Confirm Password" 

                    name="confirmPassword"
                    noValidate
                    onChange={this.handleChange}
                />
            {formErrors.password.length>0 &&(
                <span className="errorMessage">{formErrors.confirmPassword}</span>
            )}
        </div>

        {
            this.props.usertype=="Seller" ? 
                <div className='col col-md-12'>
                    <input type="text" placeholder="Click to setup shop location" className='form-control 'onClick={this.setLocation} value={this.props.Address}/>
                    <i class="glyphicon glyphicon-map-marker form-control-feedback"></i>
                </div>
             :null
        }
        
         

        <div className="createAccount">
            <button type="submit" onClick={this.SubmitHandeler}>SUBMIT</button>
            <Link to="/Signin"><small>Already have an Account</small></Link>
        </div>   
    </form>
</div>
</div>
);
}

}

const mapStateToProps=state=>{
    return{
      usertype:state.auth.userType,
      Address:state.location.address
    }
  }

const mapDispatchToProps=dispatch=>{
    return{
        onAuth:(email,password,firatName,lastName,isSignInUp)=>dispatch(actions.auth(email,password,firatName,lastName,isSignInUp))
    };
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Signup));