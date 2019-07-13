import React, { Component } from 'react';
import Autocomplete from 'react-google-autocomplete';

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
                        <div className='col'><img src={logo}/></div>    
                        <div className='col col-md-8'><input type="text" placeholder="Enter Your Address"className='form-control 'onClick={this.try1}/></div>
                        {/* <div className='col col-md-8'>
                        
                        </div>
                        <Autocomplete
                                style={{
                                    width: '100%',
                                    height: '40px',
                                    paddingLeft: '16px',
                                    marginTop: '2px',
                                    marginBottom: '100px'
                                }}
                                //onPlaceSelected={ this.onPlaceSelected }
                                types={['(regions)']}
                        /> */}
                        <div className=''><input type="button" name="search" value="Show Products" onClick={this.try2} /></div>
                        </div>
                </nav>
                  
            </div>
        );
    }    
}
export default withRouter(secondtab);