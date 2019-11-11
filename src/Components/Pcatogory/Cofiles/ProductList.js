import React, { Component } from 'react';
import Product from './Product';
//import Title from "./Title";
import {ProductConsumer} from '../context';
//import BodyData from './BodyData';
import './ProductList.css';

class ProductList extends Component {
  render() {
    console.log(this.props.location.state.shop.image)
    return (
      <React.Fragment>
        
          <div className="py-5" style={{marginLeft:'20px'}}>
            <div>
            <div>
            {/*  <div className="tit1">
                <strong><h1><br/>PRODUCTS<br/><br/><br/></h1></strong>
                <div class="jumbotron jumbotron-fluid">
                </div>*/}
                
                
                {/*<div className="tit1">
                <h1>PRODUCTS</h1></div>*/}
                <div>
                  <div class="card bg-dark text-white" style={{ backgroundImage: "url(" +this.props.location.state.shop.image+ ")", height: 300, }}>  
                      <div class="col" style={{ backgroundColor: 'white',marginTop: 20, height: 100, width: 300, borderWidth: 5, borderColor: 'black', }}>
                          <text style={{fontSize:30,color: '#26bf63',fontWeight:'600',}}>shop
                              <text style={{fontSize:30,color: '#5189c9',fontWeight:'600',}}>Me  
                              <text style={{fontSize: 20,color:'darkgreen', marginLeft: 15, fontFamily: 'Calibri Light'}}></text>
                              </text>
                          </text>
                          <div  class="col">
                              <text  style={{marginLeft: 50, fontSize: 22}}>{this.props.location.state.shop.shopName}</text>
                          </div>
                      </div>
                  </div>
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