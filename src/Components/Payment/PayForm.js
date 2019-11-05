import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import context from '../Pcatogory/context';

class PayForm extends Component {

    constructor(props){
        super(props);
    
        this.state = {
            first_name : "",
            last_name : "",
            phone : "",
            address:"",
            city:"",
           country :"",
           order_id :"",
           items: "",
           currency:"",
           amount:"",
         custDetails:[]      

        };  
    }

    componentDidMount=()=>{
        axios.post(`https://backend-webapi20190825122524.azurewebsites.net/api/customers/${this.props.userid}`)
        .then(response=>{
            this.setState({custDetails:response.data})
            console.log(response);
        }).catch(error=>{console.log(error)})
    }

    change = e =>{
        this.setState(
      {
       [ e.target.name] : e.target.value,
     // value.ProductTotalPrice(id,price,);
       
      }

        );

    };

    onSubmit = e =>{
        e.preventDefault();
        /*
        axios.post('https://sandbox.payhere.lk/pay/checkout',this.state)
        .then(response=>{
            console.log(response);
        }).catch(error=>{console.log(error)})
        */

        console.log(this.state);
      }

   
  

    render() {
    
        return (       


  <div>


  <div className ="row">
  <div className ="col-0">
    <form method="post" action="https://sandbox.payhere.lk/pay/checkout">     

    <input type="hidden" name="merchant_id" value="1212843"/>   
    <input type="hidden" name="return_url" value="http://sample.com/return"/>
    <input type="hidden" name="cancel_url" value="http://sample.com/cancel"/>
    <input type="hidden" name="notify_url" value="http://sample.com/notify"/>
    <div className = "itemDetails">
    Item Details<br/>
    <input type="text" name="order_id" value="ID_"/>
    <input type="text" name="items" value="3"/><br/>
    <input type="text" name="currency" value="LKR"/>
    <input type="text" name="amount" value="450"/>  
 
    </div> 
   
       <div className = "cuDetails">
        Customer Details<br/>
        
    <input type="text" name="first_name" placeholder="first Name" value={this.props.isauth ? this.state.custDetails.firstName : this.state.first_name} onChange = {e => this.change(e)} />
    <input type="text" name="last_name" placeholder="last Name" value={this.props.isauth ? this.state.custDetails.lastName : this.state.last_name} onChange = {e => this.change(e)}/><br/><br/>
    <input type="hidden" name="email" placeholder="email" value={this.props.isauth ?this.state.custDetails.Email:this.state.Email} onChange = {e => this.change(e)}/>
    <input type="text" name="phone" placeholder="contact number"  value={this.props.isauth ? this.state.custDetails.mobileNumber : this.state.phone} onChange = {e => this.change(e)} /><br/><br/>
    <input type="hidden" name="address" placeholder="address" value={this.state.address} onChange = {e => this.change(e)} />
    <input type="hidden" name="city" placeholder="city" value={this.props.isauth ? this.state.custDetails.city : this.state.city} onChange = {e => this.change(e)}/>
    <input type="hidden" name="country" placeholder="country" value={this.state.country} onChange = {e => this.change(e)}/><br/><br/>
    <input type="submit" value="Buy Now" 
     style = {{
        backgroundColor:" cornflowerblue",
        color: "white",
        padding: "12px 20px",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        float: "right",
    }} />   
    </div>
</form> 
</div>
<div className ="col-0">
<img src="https://image.shutterstock.com/image-vector/landing-page-template-online-shopping-600w-1396237571.jpg" alt="Flowers in Chania"></img>
</div>
</div>

</div>  


);
};
};
/*
{this.props.isauth ? <div></div>:<div></div>}
*/
const mapStateToProps=state=>{
    return{
      userid:state.auth.userId,
      isauth:state.auth.token!==null    }
  }

export default connect(mapStateToProps,null)(PayForm);


