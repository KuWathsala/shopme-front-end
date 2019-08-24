import { SubmissionError } from 'redux-form';
import * as actions from '../../Stores/Actions/Index';
import {store} from '../../index'


const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const submit=(values)=> {
  return sleep(500).then(() => {
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
        }
          
      console.log(authData)
      store.dispatch(actions.auth(authData));
      //actions.auth(authData);
      //window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2,latitude,longitude)}`)
      }) 
}

export default submit;