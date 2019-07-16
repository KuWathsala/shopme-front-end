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

export const auth=(email,password,firstName,lastName,isSignInUp)=>{
    return dispatch=>{
        dispatch(authStart());
        const authData={
            email:email,
            password:password,
            firstName:firstName,
            lastName:lastName,
            returnSecureToken: true
        };
        
        let url='https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyAH_1vanm5ZV02dvZSUnrlberVRRSBL3-k';
        axios.post(url,authData)
        .then(response=>{
            console.log(response);
            dispatch(authSuccess(response.data.idToken,response.data.localId));
            dispatch(checkAuthTImeout(response.data.expiresIn));
        })
        .catch(err=>{
            console.log(err);
            dispatch(authFail(err));
        });
    };
};

export const authVerify=(email,password,isSignInUp)=>{
    return dispatch=>{
        dispatch(authStart());
        const authVerifyData={
            email:email,
            password:password,
            returnSecureToken: true
        };
        
        let url='https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyAH_1vanm5ZV02dvZSUnrlberVRRSBL3-k';
        axios.post(url,authVerifyData)
        .then(response=>{
            console.log(response);
            const expirationDate=new Date(new Date().getTime()+response.data.expiresIn*1000);
            localStorage.setItem('token',response.data.idToken);
            localStorage.setItem('expirationDate',expirationDate);
            localStorage.setItem('userId',response.data.localId);
            dispatch(authSuccess(response.data.idToken,response.data.localId));
            dispatch(checkAuthTImeout(response.data.expiresIn));
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