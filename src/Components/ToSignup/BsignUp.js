import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../../Stores/Actions/Index';

import './BsignUp.css';
import { withRouter,Redirect} from 'react-router-dom';

class BsignUp extends Component{
    
    state={
        userType:'',
        signupstate:false
    }
      
        
      

    try=()=>{
       // this.setState( {userType:'cust'},()=>this.props.history.push('/SignUp'));
        
        //;    
    }    
    

    userHandelerCust=event=>{
        event.preventDefault();
        this.setState( {userType:'Customer',signupstate:true},()=>this.props.onUserSelect(this.state.userType));
        console.log(this.state.userType)
      
        
    };
    userHandelerSell=event=>{
        event.preventDefault();
        this.setState( {userType:'Seller',signupstate:true},()=>this.props.onUserSelect(this.state.userType));
        
    };
    userHandelerDeliver=event=>{
        event.preventDefault();
        this.setState( {userType:'Deliverer',signupstate:true},()=>this.props.onUserSelect(this.state.userType));
        
    };
    
render(){
    let proceedSignup=null;
    if(this.state.signupstate){
        proceedSignup=<Redirect to="/SignUp"/>
    }
return(

<div className="cont">
    {proceedSignup}

  <h2 ><br></br><b>Move The Way You Want</b></h2><br></br><br></br>

     <div className="row">

        <div className="col col-md-4">
            <h3><b>Buy</b></h3>
            <p>Buy when you want.<br></br> Find opportunities around you.</p>
            <button className="button" onClick={this.userHandelerCust} ><span><b>Sign Up To Buy  </b></span></button>
           
        </div>

        <div className="col col-md-4">
            <h3><b>Sell</b></h3>
            <p>Sell when you want.<br></br> Find opportunities around you.</p>
            <button className="button" onClick={this.userHandelerSell}><span><b>Sign Up To Sell</b>  </span></button>               
        </div>

        <div className="col col-md-4">
            <h3><b>Delliver</b></h3>
            <p>Delliver when you want.<br></br> Find opportunities around you.</p>
            <button className="button" onClick={this.userHandelerDeliver}><span><b>Sign Up To Deliver</b></span></button>
         </div>
        
     </div> 
</div>

);
}
}
const mapDispatchToProps=dispatch=>{
    return{
        onUserSelect:(userType)=>dispatch(actions.setUserType(userType))
    };
}

export default connect(null,mapDispatchToProps)(BsignUp);

