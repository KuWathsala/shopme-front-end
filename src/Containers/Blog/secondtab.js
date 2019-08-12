import React, { Component } from 'react';
import {connect} from 'react-redux';
import './Blog.css';
import logo from '../../Assets/logo.png';
import '../../bootstrap-3.3.7-dist/css/bootstrap.min.css';
import { withRouter} from 'react-router-dom';
import { ProductProvider} from '../../Components/Pcatogory/context';

class secondtab extends Component{
    try1=()=>{
        this.props.history.push('/map'); 
    } 
    try2=()=>{
        this.props.history.push('/Shops');  
    } 

     render(){
        return(
            <div className="secondTab">
                        <div className='row'>
                            <div className='col col-md-3' ><img src={logo} style={{height:'80px',width:'250px'}}/></div>
                            <div className='col col-md-9'>
                            <div className="form-group has-feedback">
                            <input type="text" placeholder="Enter Your Address"className='form-control 'onClick={this.try1} value={this.props.Address}/>
                                <i class="glyphicon glyphicon-map-marker form-control-feedback"></i>
                            </div>
                        </div>
                        
                        <ProductProvider lng={this.props.lng} lat={this.props.lat}><div className=''><input type="button" name="search" value="Show Products" onClick={this.try2} /></div></ProductProvider>
                        </div>
            </div>
        );
    }    
}
const mapStateToProps=state=>{
    return{
        Address:state.location.address,
        lng:state.location.lngValue,
        lat:state.location.latValue
    }
  }
export default withRouter(connect(mapStateToProps,null)(secondtab));