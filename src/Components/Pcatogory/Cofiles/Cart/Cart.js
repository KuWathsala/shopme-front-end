import React, { Component } from 'react';
import Title from "../Title";
import CartColumns from "./CartColumns";
import EmptyCart from "./EmptyCart";
import {ProductConsumer,ProductProvider} from '../../context';
import CartList from './CartList';
 import CartTotals from './CartTotals';
 //import './cart.css';
class Cart extends Component {
    render() {
        let x;
        return (
            <section>
                
                <ProductConsumer>
                    {value =>{
                        const {cart} = value;
                        if (cart.length > 0){
                            return(
                                <React.Fragment>
                                    <div className="cart1">
                                    <h1><strong>SHOPPING CART</strong></h1><br/>
                                    <CartColumns/>
                                    <CartList value={value}/>
                                    </div>
                            <div class="pull-right">
                                    <h5 >
                                        <span className="text-title">
                                            total:
                                        </span>
                                        <strong>LKR{value.cartTotal}</strong>
                                    </h5>

                                    
                                    {/*<CartTotals value={value} history={this.props.history}/>*/}

                                    <button onClick={()=>value.createOrder()} >
                                        {console.log("x===> "+value.x)}
                                        <text>Buy now</text>
                                    </button>
                                    <div>
                                        {value.payhereButton}
                                    </div>
                                    </div>
                               <br/><br/><br/>
                                </React.Fragment >
                            );
                            
                        }
                            else{
                                return  (<EmptyCart/>);
                        }
                    }}
                </ProductConsumer>
                
            </section>
        );
    }
}

export default Cart;

