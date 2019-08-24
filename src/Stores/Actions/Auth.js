import * as ActionTypes from './ActionType';
import axios from 'axios';

export const authStart=()=>{
    return{
        type:ActionTypes.AUTH_START
    };
};

export const authSuccess=(token,userId,role)=>{
    return{
        type:ActionTypes.AUTH_SUCCESS,
        idToken:token,
        userType:role,
        userId:userId
    };
};

export const authFail=(error)=>{
    return{
        type:ActionTypes.AUTH_FAIL,
        error:error
    };
};

export const logout=()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type:ActionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTImeout=(expirationTime)=>{
    return dispatch=>{setTimeout(()=>{
        dispatch(logout());
    },expirationTime*1000 );
};
};

export const auth=(authData)=>{
    console.log(authData)
    return dispatch=>{
        dispatch(authStart());
        // const authCust={
        //     LoginVM:{
        //         Email:email,
        //         Password:password,
        //         Role:userType
        //     },
        //     FirstName:firstName,
        //     LastName:lastName,
        //     MobileNumber:mobileno,
        //     returnSecureToken: true
        // };

        // const authSeller={
        //     LoginVM:{
        //         Email:email,
        //         Password:password,
        //         Role:userType
        //     },
        //     FirstName:firstName,
        //     LastName:lastName,
        //     MobileNumber:mobileno,
        //     ShopName:shopname,
        //     AccountNo:accno,
        //     ShopLocationLatitude:lat,
        //     ShopLocationLongitude:lng,
        //     returnSecureToken: true
        // }

        // const authDeliver={
        //     LoginVM:{
        //         Email:email,
        //         Password:password,
        //         Role:userType
        //     },
        //     FirstName:firstName,
        //     LastName:lastName,
        //     MobileNumber:mobileno,
        //     VehicleNo:vhno,
        //     VehicleType:vehicle,
        // }
        console.log("auth : ",authData);
        let url='';
        if(authData.LoginVM.Role=='Customer'){
            console.log("customer");
            url='https://backend-webapi20190825122524.azurewebsites.net/api/UserAuth/Signup-Customer';
            axios.post(url,authData)
                .then(response=>{
            console.log(response);
            dispatch(authSuccess(response.data.data.token,response.data.data.id,response.data.role));
            dispatch(checkAuthTImeout(3600/*response.data.expiresIn*/));
        })
        .catch(err=>{
            console.log(err);
            dispatch(authFail(err));
        });
        }else if(authData.LoginVM.Role=='Seller'){
            console.log("seller");
            url='https://backend-webapi20190825122524.azurewebsites.net/api/UserAuth/Signup-Seller';
            axios.post(url,authData)
                .then(response=>{
            console.log(response);
            dispatch(authSuccess(response.data.data.token,response.data.data.id,response.data.role));
            dispatch(checkAuthTImeout(3600/*response.data.expiresIn*/));
        })
        .catch(err=>{
            console.log(err);
            dispatch(authFail(err));
        });
        }else if(authData.LoginVM.Role=='Deliverer'){
            console.log("deliverer  ");
            url='https://backend-webapi20190825122524.azurewebsites.net/api/UserAuth/Signup-Deliverer';
            axios.post(url,authData)
                .then(response=>{
            console.log(response);
            dispatch(authSuccess(response.data.data.token,response.data.data.id,response.data.role));
            dispatch(checkAuthTImeout(3600/*response.data.expiresIn*/));
        })
        .catch(err=>{
            console.log(err);
            dispatch(authFail(err));
        });
        }
    }
};

export const authVerify=(authData)=>{
    return dispatch=>{
        dispatch(authStart());
        let url='https://backend-webapi20190825122524.azurewebsites.net/api/UserAuth/signin';
        axios.post(url,authData)
        .then(response=>{
            console.log(response);
            const expirationDate=new Date(new Date().getTime()+response.data.expiresIn*1000);
            localStorage.setItem('token',response.data.token);
            localStorage.setItem('expirationDate',expirationDate);
            localStorage.setItem('userId',response.data.localId);
            dispatch(authSuccess(response.data.data.token,response.data.data.id,response.data.role));
            dispatch(checkAuthTImeout(3600/*response.data.expiresIn*/));
        })
        .catch(err=>{
            console.log(err);
            dispatch(authFail(err));
        });
    };
};

export const authCheckState=()=>{
    return dispatch=>{
        const token=localStorage.getItem('token');
        if(!token){
            dispatch(logout());
        }else{
            const expirationDate=new Date(localStorage.getItem('expirationDate'));
            if(expirationDate<=new Date()){
                dispatch(logout());
            }else{
                const userId=localStorage.getItem('userId');
                dispatch(authSuccess(token,userId));
                dispatch(checkAuthTImeout((expirationDate.getTime()-new Date().getTime())/1000));
            }
        }
    };
};

export const setUserType=(userType)=>{
    return{
        
        type:ActionTypes.USER_TYPE,
        userType:userType
    };
}