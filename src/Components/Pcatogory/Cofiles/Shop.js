import React, { Component } from 'react';
import styled from "styled-components";
import {Link} from "react-router-dom";
import {ProductConsumer} from "../context";
import PropTypes from "prop-types";

class Shop extends Component {
    
    render() {
        const {id,shopName,image,distance,rating, shopAddress}=this.props.shop;
        console.log("Shop")
        console.log(id)
        return (
           <ProductWrapper className="col-9 mx-auto col-md-6 col-lg-4 my-4">
              <div style={{paddingBottom:50, marginTop: 50, marginLeft: 50}}>
             <ProductConsumer>
                   {
                       value=>(
                        <div className="img-container p-5"  
                            onClick={()=>
                            value.handleDetails(id)
                            //shop details
                        }>
                       
                       <Link to={{ pathname: `productList`, state: {shop: this.props.shop } }}>
                           {/*"data:image/jpeg;base64,"+ */}
                            <img src={image} alt="product" className="card-img-top"  height="200px" width="300px"/>
                        </Link> 
                        </div>
                       )
                   }
        
              </ProductConsumer> 

               {/* card footer */}
               
               <div className="card-footer d-flex justify-content-between" style={{fontFamily: 'Calibri Light', fontSize: 18, fontWeight:'bold'}}>
                    <p className="align-self-center mb-0" ><strong style={{fontSize: 22,fontWeight:'bolder' }}>{shopName}</strong></p>
                    <p className="align-self-center mb-0" style={{}}>close to you : {distance.toFixed(1)} km </p>
                    <img src={require('../../../Assets/pin.png')} style={{width: 20, height: 20}} /> <text style={{color:'green', fontSize: 18}}>{shopAddress}</text> <br/>
                    <div className="glyphicon glyphicon-star" style={{color:'gold', marginTop: 5}}> </div>  {rating.toFixed(1)} 
                        <text style={{fontWeight:'lighter'}}> / 5.0</text>
                    <br/>
                </div>
               </div>
           </ProductWrapper>
        );
    }
}

Shop.propTypes ={
shop:PropTypes.shape({
        id:PropTypes.number,
        shopName:PropTypes.string,
        image:PropTypes.string,
        distance:PropTypes.string,
    }).isRequired
}




 const ProductWrapper= styled.div`
 .card{
     border-color: transparent;
     transition:all 1s linear;
 }
 .card-footer{
     background: transparent;
     border-top: transparent;
     transition: all 1s linear;
 }
 &:hover{
     .card{
         border:0.04rem solid rgba(0,0,0,0.2);
         box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.2);
     }
     .card-footer{
         background: rgba(247,247,247);
     }
 }
 .img-container{
     position: relative;
     overflow:hidden;
 }

 .card-img-top{
     transition : all 1s linear;
 }
 .img-container:hover .card-img-top{
     transform : scale(1.2);
 }
 .cart-btn{
     position: absolute;
     bottom:0;
     right:0;
     padding: 0.2rem 0.4rem;
     background: var(--lightBlue);
     border: none;
     color: var(--mainWhite);
     font-size: 1.4rem;
     border-radius: 0.5rem 0 0 0;
     transform: translate(100%, 100%);
     transition: all 1s linear;
 }
 .img-container:hover .cart-btn{
     transform: translate(0, 0);
 }
 .cart-btn:hover{
     color:var(--mainBlue);
     cursor: pointer;
 }

 `
export default Shop;