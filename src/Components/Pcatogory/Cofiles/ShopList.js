import React, { Component } from 'react';
import Shop from './Shop';
import Title from "./Title";
import {ProductConsumer,ProductProvider} from '../context';
import {connect} from 'react-redux';

class ShopList extends Component {
    
    render() {
        
          return (
            <React.Fragment>
                <div className="py-5">
                  <div className="container">
                    <Title name="our" title="Shopes"/>
                    <div className="row"> 
                    <ProductConsumer>
                      {value=>{
                       return value.shopes.map( shop =>{
                         return <Shop key={shop.sid} shop ={shop}/>;
                       }

                       )
                      }}
                    </ProductConsumer>
                    </div>
                  </div>
                </div>
                
            </React.Fragment>
              //<Product/> 
            
        );
    }
}
const mapStateToProps=state=>{
  return{
    lng:state.location.lngValue,
    lat:state.location.latValue
  }
}

export default connect(mapStateToProps,null)(ShopList);