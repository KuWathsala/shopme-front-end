import * as ActionTypes from './ActionType';
import axios from 'axios';

export const authStart=()=>{
    return{
        type:ActionTypes.AUTH_START
    };
};

export const authSuccess=(token,userId)=>{
    return{
        type:ActionTypes.AUTH_SUCCESS,
        idToken:token,
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

export const auth=(email,password,firstName,lastName,lat,lng,userType,mobileno,shopname,accno,vhno,vehicle)=>{
    return dispatch=>{
        dispatch(authStart());
        const authCust={
            LoginVM:{
                Email:email,
                Password:password,
                Role:userType
            },
            FirstName:firstName,
            LastName:lastName,
            MobileNumber:mobileno,
            returnSecureToken: true
        };

        const authSeller={
            LoginVM:{
                Email:email,
                Password:password,
                Role:userType
            },
            FirstName:firstName,
            LastName:lastName,
            MobileNumber:mobileno,
            ShopName:shopname,
            AccountNo:accno,
            ShopLocationLatitude:lat,
            ShopLocationLongtitude:lng,
            returnSecureToken: true
        }

        const authDeliver={
            LoginVM:{
                Email:email,
                Password:password,
                Role:userType
            },
            FirstName:firstName,
            LastName:lastName,
            MobileNumber:mobileno,
            VehicleNo:vhno,
            VehicleType:vehicle,
        }
        console.log(userType);
        let url='';
        if(userType=='Customer'){
            console.log("workss");
            url='https://localhost:5001/api/UserAuth/Signup-Customer';
            axios.post(url,authCust)
                .then(response=>{
            console.log(response);
            dispatch(authSuccess(response.data.token,response.data.id));
            dispatch(checkAuthTImeout(3600/*response.data.expiresIn*/));
        })
        .catch(err=>{
            console.log(err);
            dispatch(authFail(err));
        });
        }else if(userType=='Seller'){
            url='https://localhost:5001/api/UserAuth/Signup-Seller';
            axios.post(url,authSeller)
                .then(response=>{
            console.log(response);
            dispatch(authSuccess(response.data.token,response.data.id));
            dispatch(checkAuthTImeout(3600/*response.data.expiresIn*/));
        })
        .catch(err=>{
            console.log(err);
            dispatch(authFail(err));
        });
        }else if(userType=='Deliverer'){
            url='https://localhost:5001/api/UserAuth/Signup-Deliverer';
            axios.post(url,authDeliver)
                .then(response=>{
            console.log(response);
            dispatch(authSuccess(response.data.token,response.data.id));
            dispatch(checkAuthTImeout(3600/*response.data.expiresIn*/));
        })
        .catch(err=>{
            console.log(err);
            dispatch(authFail(err));
        });
        }
    }
};

export const authVerify=(email,password,isSignInUp)=>{
    return dispatch=>{
        dispatch(authStart());
        const authVerifyData={
            email:email,
            password:password,
            returnSecureToken: true
        };
        
        let url='https://localhost:5001/api/UserAuth/signin';
        axios.post(url,authVerifyData)
        .then(response=>{
            console.log(response);
            const expirationDate=new Date(new Date().getTime()+response.data.expiresIn*1000);
            localStorage.setItem('token',response.data.token);
            localStorage.setItem('expirationDate',expirationDate);
            localStorage.setItem('userId',response.data.localId);
            dispatch(authSuccess(response.data.token,response.data.id));
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