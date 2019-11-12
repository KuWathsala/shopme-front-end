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

                  <div class="card bg-dark text-white" style={{backgroundImage: "url(" + this.props.location.state.shop.image + ")",top: 0, height: 390, width: '100%'}}>  
                    <div>
                        <text style={{marginTop: 80}}>.</text>
                    </div>
                    <div class="col" class="pull-right" style={{ backgroundColor: 'white',marginTop: 80, height: 200, width:500, borderWidth: 5, borderColor: 'black', justifyContent: 'center'}}>
                        <text style={{marginLeft: 10,  fontSize:40, color: '#26bf63',fontWeight:'600',}}>shop
                            <text style={{marginLeft: 10, fontSize:40,color: '#5189c9',fontWeight:'600',}}>Me</text>
                            <text style={{marginLeft: 10, fontSize: 35,color:'darkgreen', fontFamily: 'Calibri Light'}}></text>
                        </text>
                        <div  class="col">
                            <text  style={{marginLeft: 10, fontSize: 22}}>{this.props.location.state.shop.shopName}</text><br/>
                            <img src={require('../../../Assets/pin.png')} style={{width: 20, height: 20, marginLeft: 10, fontSize: 20, marginTop: 5}} /> <text style={{color:'green', fontSize: 18}}>{this.props.location.state.shop.shopAddress}</text> <br/>
                            <div className="glyphicon glyphicon-star" style={{color:'gold', marginTop: 10,marginLeft: 10, fontSize: 20, fontWeight:'bold'}}><text style={{color:'black', marginLeft: 5}} >{this.props.location.state.shop.rating.toFixed(1)}</text>
                              <text style={{fontWeight:'lighter', color: 'black'}}> /5.0</text>
                            </div>  
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