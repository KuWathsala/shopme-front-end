import * as ActionTypes from './ActionType';
import axios from 'axios';

export const authStart=()=>{
    return{
        type:ActionTypes.AUTH_START
    };
};

export const authSuccess=(authData)=>{
    return{
        type:ActionTypes.AUTH_SUCCESS,
        authData:authData
    };
};

export const authFail=(error)=>{
    return{
        type:ActionTypes.AUTH_FAIL,
        error:error
    };
};

export const auth=(email,password,isSignInUp)=>{
    return dispatch=>{
        dispatch(authStart());
        const authData={
            email:email,
            password:password,
            returnSecureToken: true
        };
        
        let url='https://localhost:44314/api/customers';
        if(isSignInUp=="signIn"){
           url='https://localhost:44314/api/customers';
        }else if(isSignInUp="signUp"){
            url='https://localhost:44314/api/customers';
        }
        axios.post(url,authData)
        .then(response=>{
            console.log(response);
            dispatch(authSuccess(response.data));
        })
        .catch(err=>{
            console.log(err);
            dispatch(authFail(err));
        });
    };
};