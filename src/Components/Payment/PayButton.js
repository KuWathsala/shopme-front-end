import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import axios from 'axios';

class PhButton extends Component {

    try2=()=>{
        this.props.history.push('/PayForm');    
    }

    render() {
        return (   
            <div>
                <form method="post" action="https://sandbox.payhere.lk/pay/checkout?merchant_id=1213071&return_url=https://google.com&cancel_url=https://google.com&order_id=145&items=xxxx&currency=LKR&amount=114&first_name=wathsala&last_name=danthasinghe&email=wathdanthasinghe@gmail.com&phone=0716325124&address=Galle&city=Galle&country=SriLanka&notify_url=https://backend-webapi20191102020215.azurewebsites.net/api/orders/update-payment"> 
                    <input name="submit" type="image" src="https://www.payhere.lk/downloads/images/pay_with_payhere.png"
                        style={{width:"250px"}} value="Buy Now"  onClick={this.try2}
                    />
                </form>
            </div>
        );
        }
}
export default withRouter(PhButton);

