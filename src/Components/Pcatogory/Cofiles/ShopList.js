import React, { Component } from 'react';
import Shop from './Shop';
import Title from "./Title";
import {ProductConsumer,ProductProvider} from '../context';

class ShopList extends Component {
    
    render() {
        
          return (
            <ProductProvider>
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
            </ProductProvider>
              //<Product/> 
            
        );
    }
}

export default ShopList;