import React from "react";
import {Link} from "react-router-dom";


export default function CartTotals({value,history }){
    const{cartTotal,clearCart}= value;

    return(
        <React.Fragment>
            <div className="container">
                <div className="row">
                    <div className="col-10 mt-2 ml-sm-5 ml-md-auto col-sm-8 text-capitalize text-right">
                
                        <Link to="/">
                            <button className="btn btn-outline-danger text-uppercase mb-3 px-5 " type="button"
                           
                            onClick={()=> clearCart()}
                            >
                                clear cart
                            </button>
                        </Link>

                       

                        <h5>
                            <span className="text-title">
                                total:
                            </span>
                            <strong>LKR{cartTotal}</strong>
                        </h5>
                        {/*<PayButton/>*/}
                        <div>
                            <form method="post" action="https://sandbox.payhere.lk/pay/checkout?merchant_id=1213071&return_url=https://localhost:3000&cancel_url=https://localhost:3000&order_id=64&items=xxxx&currency=LKR&amount=114&first_name=wathsala&last_name=danthasinghe&email=wathdanthasinghe@gmail.com&phone=0716325124&address=Galle&city=Galle&country=SriLanka&notify_url=https://backend-webapi20191102020215.azurewebsites.net/api/orders/update-payment"> 
                                <input name="submit" type="image" src="https://www.payhere.lk/downloads/images/pay_with_payhere.png"
                                    style={{width:"150px"}} value="Buy Now" // onClick={this.try2}
                                />
                            </form>
                        </div>

            
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}