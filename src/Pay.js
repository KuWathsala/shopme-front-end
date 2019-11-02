import React, { Component } from 'react';
import { connect} from 'react-redux';

import './App.css';
import Blog from './Containers/Blog/Blog';
import {BrowserRouter,withRouter} from 'react-router-dom';
import * as actions from './Stores/Actions/Index';
import axios from 'axios';

class App extends Component {

  componentDidMount(){
  }

  pay(){
      console.log("pay")
      const object= {
        merchant_id: 1213071,
        return_url: '',
        cancel_url: '',
        order_id: 12,
        items: '',
        currency: 'LKR',
        amount:1800,
        first_name: 'kumuthu',
        last_name: 'wathsala',
        email:'wathdantha@gmail.com',
        phone:'320499321',
        address: 'galle',
        city: 'galle',
        country: 'sri lanka',
        notify_url: `https://backend-webapi20191102020215.azurewebsites.net/api/payment/${13},${1800}`,
      }

    axios.post('https://sandbox.payhere.lk/pay/checkout',object)
      .then(response=>{
        console.log(response);
    }).catch(error=>{
        console.log(error);
    });
  }

  render() {
    return ( 
        <button onClick={this.pay}>Pay now</button>
    );
  }
}

const mapDispatchToProps=dispatch=>{
  return{
    onTryAutoSignUp: ()=>dispatch(actions.authCheckState())
  };
};

export default withRouter(connect(null,mapDispatchToProps)(App));
