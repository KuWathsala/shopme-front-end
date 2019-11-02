import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import axios from 'axios';

import PayForm from './PayForm';
class PhButton extends Component {
click=()=> {
        
    console.log("this.props")
    //create order
    let itemList= []; //items is an array of  {productId, Quantity}

    //loop to take every productId and Quantity of cart array and put into itemList made by prabashi... ask her 
    for(let i = 0; i < this.props.cart.arr.length; i++){
        let item= {
            productId: this.props.cart.arr[i].id, 
            Quantity:  this.props.cart.arr[i].quantity,
        } 
        itemList=[...itemList, item];
    }

    const order= {
        customerId: parseInt(this.props.customer.userId), //customerId
        customerLatitude: this.props.location.source.latitude, //this must prepared
        customerLongitude: this.props.location.source.longitude,
        sellerId: this.props.productsList.sellerId,
        status: "to be confirmed", //keep same as
        items: itemList //array
    }

    console.log("order")
    console.log(order)

    axios.post('https://backend-webapi20191102020215.azurewebsites.net/api/orders/createNewOrder', order) //https://backend-webapi20190825122524.azurewebsites.net/api/orders/createNewOrder${order}
    .then(response=>{
        console.log("response")
        console.log(response)
        //this.props.navigation.navigate(Payment, response.data)
    //after response success, response.daata.id is the id of the order
    /*here to code redirect to payhere......*/
    }) 
    .catch (error=>{
        console.log("error")
        console.log(error);
    })
    
}


    try2=()=>{
        this.props.history.push('/PayForm');
        
        }

    render() {
        return (
        
<div>
    
<form >

<input name="submit" type="image" src="https://www.payhere.lk/downloads/images/pay_with_payhere.png"
 style={{width:"150px"}} value="Buy Now"  onClick={this.try2}/>
</form>

</div>



);
}
}
export default withRouter(PhButton);

