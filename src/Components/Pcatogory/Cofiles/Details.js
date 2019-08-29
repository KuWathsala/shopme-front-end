import React, { Component } from 'react';
import {ProductConsumer,ProductProvider} from '../context';
import {Link} from 'react-router-dom';
import {ButtonContainer} from './Button';
import Modal from './Modal';
class Details extends Component {
    render() {
        return (
            
            <ProductConsumer>
                {value =>{
                    const{id,rating,like,discount,description,shortDescription,quantity,image,unitPrice,inCart}=value.discription;
                    let price=unitPrice-unitPrice*discount/100; 
                    return(
                        <div className="container py-5">
                        {/* title */}
                            <div className="row">
                                <div className="col-10 mx auto text-center text-slanted text-blue my-5">
                                    <h1>{}</h1>
                                </div>
                            </div>
                        {/* end title */}

                        {/* product info*/}
                            <div clas="row"> 
                                <div className="col-10 mx-auto col-md-6 my-3">
                                    {/* <img src={"data:image/jpeg;base64,"+image} className="img-fluid" alt="product"/> */}
                                    <img src={image} className="img-fluid" alt="product" height="250px" width="300px"/>
                                </div>
                                {/* product text */}
                                    <div className="col-10 mx-auto col-md-6 my-3 text-capitalize">
                                            <h2>{}</h2>
                                            <h4 className="text-title text-uppercase text-muted mt-3 mb-2">
                                            about :<span className="text-uppercase">
                                                {description}
                                            </span>
                                            </h4>
                                            <p className="text-capitalize font-weight-bold mt-3 mb-0">
                                                some info about product:{shortDescription}
                                            </p>
                                            <p className="text-capitalize font-weight-bold mt-3 mb-0">
                                                Unit Price:{price}
                                            </p>
                                            <p className="text-capitalize font-weight-bold mt-3 mb-0">
                                                Quantity:{quantity}
                                            </p>
                                            <p className="text-capitalize font-weight-bold mt-3 mb-0">
                                                discoount:{discount}
                                            </p>
                                            <p className="text-capitalize font-weight-bold mt-3 mb-0">
                                                off:{discount*unitPrice/100}
                                            </p>
                                        {/* buttons */}
                                        <div>
                                            <Link to="/ProductList">
                                                <ButtonContainer>
                                                    back to product
                                                </ButtonContainer>
                                            
                                            </Link>

                                            <ButtonContainer
                                            cart
                                            disabled={inCart?true:false}
                                            onClick={()=>{
                                                value.addToCart(id, price, image, description);
                                                //value.openModal(id);
                                                console.log("add to cart");
                                            }}>
                                                {inCart ? "inCart" : "add to cart"}
                                                
                                            </ButtonContainer>
                                            
                                        </div>
                                    </div>
                            </div>
                        </div>
                    )
                }}
            </ProductConsumer>
           
        );
    }
}

export default Details;