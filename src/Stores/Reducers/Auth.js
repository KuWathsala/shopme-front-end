import * as actionTypes from '../Actions/ActionType';
import {updateObject} from '../utility';

const initialState={
    token:null,
    userId:null,
    error:null,
    loading:false,
    userType:null,
    user:[],
    verifyState:null,
}

const authstart =(state,action)=>{
    return updateObject(state,{error:null,loading:true})
}

const authSuccess=(state,action)=>{
    console.log("auth successss");
    return updateObject(state,{error:null,
        token:action.idToken,
        userId:action.userId,
        userType:action.userType,
        user:action.user,
        error:null,
        loading:false,
        verifyState:false,
    })
}

const authfail=(state,action)=>{
    return updateObject(state,{error:action.error,loading:false})
}

const authLogout=(state,action)=>{
    return updateObject(state,{token:null,userId:null});
}

const notVerified=(state,action)=>{
    return updateObject(state,{verifyState:false})
}

const reducer =( state=initialState,action)=>{
    switch(action.type){
        case actionTypes.AUTH_START:return authstart(state,action)
        case actionTypes.AUTH_SUCCESS:return authSuccess(state,action)
        case actionTypes.AUTH_FAIL:return authfail(state,action)
        case actionTypes.AUTH_LOGOUT:return authLogout(state,action)
        case actionTypes.USER_TYPE:return usertype(state,action)
        case actionTypes.NOT_VERIFIED:return notVerified(state,action)
        default:
            return state;
    }
}
export default reducer; 

const usertype=(state,action)=>{
    return updateObject(state,{userType:action.userType})
}