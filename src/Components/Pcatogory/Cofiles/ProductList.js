import React, { Component } from 'react';
import Product from './Product';
import Title from "./Title";
import {ProductConsumer,ProductProvider} from '../context';

class ProductList extends Component {
  constructor(props){
    super(props);
  };
  
  render() {
        return (
          <React.Fragment>
              <div className="py-5" style={{marginLeft:'20px'}}>
                <div>
                  <Title name="our" title="products"/>
                  <div className='row'> 
                    <div className='col md-4'>
                  <ProductConsumer>

                    {value=>{
                      return value.detailProduct.map( product =>{
                        return <Product key={product.id} product={product}/>;
                      })
                    }}

                  </ProductConsumer>
                  </div>
                  </div>
                </div>
              </div>
              
          </React.Fragment>
      );
  }
}

export default ProductList;