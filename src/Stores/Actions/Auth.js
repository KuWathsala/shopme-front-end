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

export const auth=(email,password,isSignInUp)=>{
    return dispatch=>{
        dispatch(authStart());
        const authData={
            email:email,
            password:password,
            returnSecureToken: true
        };
        
        let url='https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyAH_1vanm5ZV02dvZSUnrlberVRRSBL3-k';
        if(isSignInUp=="signIn"){
           url='https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyAH_1vanm5ZV02dvZSUnrlberVRRSBL3-k';
        }else if(isSignInUp="signUp"){
            url='https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyAH_1vanm5ZV02dvZSUnrlberVRRSBL3-k';
        }
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