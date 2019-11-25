import React,{Component} from 'react';

class Orders extends Component{

    constructor(props){
        super(props);
        this.state={
         
        }
    }

handlePayment=()=>{
    this.setState({payment:true})
}

render(){
let url=`https://sandbox.payhere.lk/pay/checkout?merchant_id=1213071&return_url=http://10.10.7.105:3000/Payment_sucess&cancel_url=http://10.10.7.105:3000/Payment_unsucess&items=xxx&currency=LKR&amount=&first_name=xxxx&last_name=xxxx&email=xxxx&phone=0711234567&address=xxxx&city=xxxx&country=SriLanka&order_id=&notify_url=https://backend-webapi20191102020215.azurewebsites.net/api/orders/update-payment` 
if(this.state.payment)
    return <div>   
        <form method="post" action={url}> 
            <input name="submit" type="image" src="https://www.payhere.lk/downloads/images/pay_with_payhere.png" style={{width:"150px"}} value="Buy Now" // onClick={this.try2}
            />
        </form>
    </div>
else
    return (
        <table  class="table table-bordered"  style={{fontFamily: 'Calibri Light', fontSize: 16, fontWeight:'normal', }} >
            <thead>
                <tr class="d-flex">
                    <th class="col-xs-1">{this.props.OrderId}</th>
                    <th class="col-xs-1" >
                        <div class="row-xs-1">
                                <text>{this.props.time.substring(0, 10)}</text>
                        </div>
                        <div class="row-xs-1">
                            <text>{this.props.time.substring(12, 19)}</text>
                        </div>
                    </th>

                    {this.props.OrderDetails}
                    <th class="col-xs-1 "><text class="center-block" >{this.props.total}</text></th>
                    <th class="col-xs-1 "><text class="center-block" >{this.props.shop}</text></th>
                    <th class="col-xs-1 "><text class="center-block" >{this.props.status}</text></th>
                    {/* {this.props.paymentStatus!==2 ?
                    <th class="col-xs-1 "> <button type="button" className="btn btn-success center-block" style={{color: 'white', borderRadius: 0, backgroundColor: 'green'}} onClick={this.handlePayment}>Proceed Payment</button></th>
                    :null} */}
                </tr>
            </thead>
        </table>
        );    
    }  
}

// const mapStateToProps=state=>{
//     return{
//       seller:state.auth
//     }
// }
  
export default Orders

