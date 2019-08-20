import React, { Component } from 'react';
import {connect} from 'react-redux';
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
            <div style={{marginTop:'2%'}}>
                        <div className='row '>
                            <div className='col-xs-3 col-sm-3 col-lg-3' ><img src={logo} style={{height:'70px',width:'250px'}}/></div>
                            <div className='col-xs-6 col-sm-6 col-lg-6' style={{float:'right',width:'100%',marginTop:10}}><input type="text" placeholder="Enter Your Address"className='form-control 'onClick={this.try1} value={this.props.Address}/>
                                <i class="glyphicon glyphicon-map-marker form-control-feedback"></i>
                            </div>
                            <div className='col-xs-3 col-sm-3 col-lg-3' style={{marginTop:10}}>
                                <ProductProvider lng={this.props.lng} lat={this.props.lat}><input type="" name="search" value="Show Products" onClick={this.try2} className="btn btn-default" style={{fontWeight:'bold',color:'green'}}/></ProductProvider>
                            </div>
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