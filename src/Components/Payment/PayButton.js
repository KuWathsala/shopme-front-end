import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import axios from 'axios';

import PayForm from './PayForm';
class PhButton extends Component {
click=()=> {
        
    console.log("this.props")
    
    let itemList= []; 

     
    for(let i = 0; i < this.props.cart.arr.length; i++){
        let item= {
            productId: this.props.cart.arr[i].id, 
            Quantity:  this.props.cart.arr[i].quantity,
        } 
        itemList=[...itemList, item];
    }

    const order= {
        customerId: parseInt(this.props.customer.userId), 
        customerLatitude: this.props.location.source.latitude,
        customerLongitude: this.props.location.source.longitude,
        sellerId: this.props.productsList.sellerId,
        status: "to be confirmed", 
        items: itemList 
    }

    console.log("order")
    console.log(order)

    axios.post('https://backend-webapi20190825122524.azurewebsites.net/api/orders/createNewOrder', order) //https://backend-webapi20190825122524.azurewebsites.net/api/orders/createNewOrder${order}
    .then(response=>{
        console.log("response")
        console.log(response)
        
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

