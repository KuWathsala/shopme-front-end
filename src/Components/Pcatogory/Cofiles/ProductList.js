import React, { Component } from 'react';
import Product from './Product';
//import Title from "./Title";
import {ProductConsumer} from '../context';
//import BodyData from './BodyData';
import './ProductList.css';
class ProductList extends Component {
 
  render() {
    
          return (
            <React.Fragment>
              
                <div className="py-5" style={{marginLeft:'20px'}}>
                  <div>
                  <div>
                  {/*  <div className="tit1">
                      <strong><h1><br/>PRODUCTS<br/><br/><br/></h1></strong>
                      <div class="jumbotron jumbotron-fluid">
                      </div>*/}
                     
                      
                      <div className="tit1">
                      <h1>PRODUCTS</h1>
                  
                    
                  
                 </div>
                   <br/>
                  </div>
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