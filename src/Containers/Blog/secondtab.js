import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../../Stores/Actions/Index';

import './Blog.css';
import logo from '../../Assets/logo.png';
import '../../bootstrap-3.3.7-dist/css/bootstrap.min.css';
import { withRouter} from 'react-router-dom';
//import Autocomplete from 'react-google-autocomplete';
//import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
//import {Row} from 'react-bootstrap';


class secondtab extends Component{
    try1=()=>{
        this.props.history.push('/map'); 
    } 
    try2=()=>{
        this.props.history.push('/ProductList');  
    } 

     render(){
        return(
            <div className="b">
                <nav>
                        <div className='row'>
                        <div className='col col-md-3'><img src={logo}/></div>
                        
                        <div className='col col-md-9'>
                        <div className="form-group has-feedback">
                            <input type="text" placeholder="Enter Your Address"className='form-control 'onClick={this.try1} value={this.props.Address}/>
                                <i class="glyphicon glyphicon-map-marker form-control-feedback"></i>
                        </div>
                        </div>
                        <div className=''><input type="button" name="search" value="Show Products" onClick={this.try2} /></div>
                        </div>
                </nav>
                  
            </div>
        );
    }    
}
const mapStateToProps=state=>{
    return{
        Address:state.location.address
    }
  }
export default withRouter(connect(mapStateToProps,null)(secondtab));