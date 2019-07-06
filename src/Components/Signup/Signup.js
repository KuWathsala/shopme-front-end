import React,{Component} from "react";
import "./Signup.css";
import axios from 'axios';
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
            formErrors:{
                firstName:"",
                lastName:"",
                email:"",
                password:"",
                confirmPassword:""
            },
            showresults: false,
        };
    }

   boxHandeler = () =>{
       this.setState({showresults:true});
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

return(
<div className="wrapper">
    <div className="form-wrapper">
    <h1>Create Account</h1>
    <form onSubmit={this.hadleSubmit} novalidate>
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

    <div className="createAccount">
    <button type="submit" onClick={this.SubmitHandeler}>SUBMIT</button>
    <small>Already have an Account</small>
    </div>
    
    {
        this.state.showresults ===true ? 
            <div>
                <label>Shop Name</label>
                <input type="text" placeholder="Shop Name"  />
            </div>:null
    }       
    
    </form>
</div>
</div>
);
}

}

const mapDispatchToProps=dispatch=>{
    return{
        onAuth:(email,password,firatName,lastName,isSignInUp)=>dispatch(actions.auth(email,password,firatName,lastName,isSignInUp))
    };
}
export default connect(null,mapDispatchToProps)(Signup);