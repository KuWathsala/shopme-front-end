import { SubmissionError } from 'redux-form';
import * as actions from '../../Stores/Actions/Index';
import {store} from '../../index'


const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const submit=(values)=> {
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
      const latitude=store.getState().location.latValue;
      const longitude=store.getState().location.lngValue;
      const role=store.getState().auth.userType;
      console.log(store.getState().auth.userType)
      let authData
      store.getState().auth.userType=="Seller" ? authData={...values,ShopLocationLatitude:latitude,ShopLocationLongitude:longitude,Role:role}:authData={...values,Role:role}
      console.log(authData)
      store.dispatch(actions.auth(authData));
      //actions.auth(authData);
      //window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2,latitude,longitude)}`)
      }) 
}

export default submit;