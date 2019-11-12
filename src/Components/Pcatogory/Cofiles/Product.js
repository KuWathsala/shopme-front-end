import React, { Component } from 'react';
import styled from "styled-components";
import {Link} from "react-router-dom";
import {ProductConsumer} from "../context";
import PropTypes from "prop-types";

class Product extends Component {
    render() {
        const {id,name,image,unitPrice,rating,inCart,discount}=this.props.product;
        return (
           <ProductWrapper className="col-9 mx-auto col-md-6 col-lg-4 my-4">
               <div style={{paddingBottom:50, marginTop: 50, marginLeft: 50}}>
               <ProductConsumer>
                   {
                       value=>(
                        <div className="img-container p-5"  
                        onClick={()=>
                            
                            value.discriptionHandle(id)
                            //product details  ,
                        }>
                       
                       <Link to ="/details">
                            {/* <img src={"data:image/jpeg;base64,"+image} alt="product" className="card-img-top"  height="250px" width="100%"/> */}
                            <img src={image} alt="product" className="card-img-top"  height="200px" width="300px"/>
                       </Link>
         
                       <button className="cart-btn" 
                       disabled={inCart ? true:false}
                       onClick={()=>{
                           console.log("product clicked");
                           value.addToCart(id,);
                           //value.openModal(id);
                           }}
                           >
                       {inCart?(
                           <p className="text-capitalize mb-0" disabled>
                           {""}
                           in Cart
                           </p>
                       ):(
                           <i className="fas fa-cart-plus"/>
                       )}
                       
                       </button>

                      
                        </div>
                       )
                   }
              </ProductConsumer>

               {/* card footer 
               <div className="card-footer d-flex justify-content-between">
                <p className="align-self-center mb-0">{name}</p>
                <h5 className="align-self-center mb-0">
                    <span className="mr-1">LKR</span>
                    {unitPrice}
                </h5>
               </div>*/}

               <div className="card-footer d-flex justify-content-between" style={{fontFamily: 'Calibri Light', fontSize: 18, fontWeight:'bold'}}>
                    <p><strong style={{fontSize: 22,fontWeight:'-moz-initial' }}>{name}</strong></p>
                    <p className="align-self-center mb-0">
                        <text style={{fontWeight: 'normal'}}>unit price</text> {unitPrice*(1-discount/100)}  LKR 
                        {
                            (unitPrice*(1-discount/100)!=unitPrice) ? <text style={{textDecorationLine: 'line-through', color: 'red', marginLeft:10}}>{unitPrice} LKR</text>: null
                        }
                    </p>
                    
                    {
                            (unitPrice*(1-discount/100)!=unitPrice) ? <p className="align-self-center mb-0" >off  <text style={{color: 'brown'}}>{discount*unitPrice/100}%</text> </p> : null
                    }
                    
                    <br/>
                </div>

               </div>
           </ProductWrapper>
        );
    }
}

Product.propTypes ={
    product:PropTypes.shape({
        id:PropTypes.number,
        image:PropTypes.string,
        name:PropTypes.string,
        unitPrice:PropTypes.number,
        inCart:PropTypes.bool,
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

`
export default Product;
/*
.img-container:hover .cart-btn{
    transform: translate(0, 0);
}

.cart-btn:hover{
    color:var(--mainBlue);
    cursor: pointer;
}*/