import React, { Component } from 'react';
import Product from './Product';
import Title from "./Title";
import {ProductConsumer,ProductProvider} from '../context';


class ProductList extends Component {
    
    render() {
        
          return (
            <ProductProvider>
            <React.Fragment>
                <div className="py-5" style={{height:'100%' ,width:'100%'}}>
                  <div className="container">
                    <Title name="our" title="products"/>

                    <div className="row"> 
                    <ProductConsumer>
                      {value=>{
                       return value.products.map( product =>{
                         return <Product key={product.id} product ={product}/>;
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

export default ProductList;