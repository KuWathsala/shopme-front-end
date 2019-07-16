import * as actionTypes from '../Actions/ActionType';
import {updateObject} from '../utility';
import { submission } from '../Actions/Index';

const intialState={
    latValue:6.9271,
    lngValue:79.8612,
    submit:false,
    address:''
}

const markerLocation=(state,action)=>{
    console.log(state);
    return updateObject(state,{
        latValue:action.latValue,
        lngValue:action.lngValue,
        address:action.address
    }
    )
};

const setlocation=(state,action)=>{
    return updateObject(state,{
        submit:action.submit
    }
    )
};


const reducer = (state=intialState,action)=>{
    switch(action.type){
        case actionTypes.MARKER_LOCATION:return markerLocation(state,action)
        case actionTypes.SUBMISSION:return setlocation(state,action)
        default:return state;
    }
    
};
export default reducer;


