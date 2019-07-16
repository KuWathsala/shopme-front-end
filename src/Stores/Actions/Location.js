import * as ActionTypes from './ActionType';
import axios from 'axios';

export const location=(latVal,lngVal,address)=>{
    return{
        type:ActionTypes.MARKER_LOCATION,
        latValue:latVal,
        lngValue:lngVal,
        address:address
        };
};

export const submission=(submit)=>{
    return{
        type:ActionTypes.SUBMISSION,
        submit:submit
        };
};