import React,{Component} from 'react';
import Img from '../../Assets/profile.png';
import {connect} from 'react-redux';
import './prof.css';
import axios from 'axios';
import Orders from './Orders';

class Profile extends Component{

    state={
        userdata:[],
        orders:[]
    };

    componentDidMount(){
        if(this.props.userType=="Seller"){
            axios.get(`https://backend-webapi20191102020215.azurewebsites.net/api/sellers/${this.props.userId}`)
            .then(response=>{
                console.log(response);
                this.setState({userdata:response.data});
            });
        }else if(this.props.userType=='Customer'){
            axios.post(`https://backend-webapi20191102020215.azurewebsites.net/api/customers/${this.props.userId}`)
            .then(response=>{
                console.log(response);
                this.setState({userdata:response.data});
            });
            axios.post(`https://backend-webapi20191102020215.azurewebsites.net/api/orders/getAllOrderDetailsByCustomer/${this.props.userId}`)
            .then(response=>{
                console.log(response);
                for(let i=0; i<response.data.length; i++ )
                this.setState({orders: [...this.state.orders, response.data[i]]})
            });
        }else if(this.props.userType=="Deliverer"){
            axios.get(`https://backend-webapi20191102020215.azurewebsites.net/api/deliverers/${this.props.userId}`)
            .then(response=>{
                console.log(response);
                this.setState({userdata:response.data});
            });
        }
    }

    render(){
        const purschasedOrders=this.state.orders.map(order=>{
            return <Orders value={order} OrderId={order.id} time={order.createdAt} total={order.totalPrice} shop={order.shopName} status={order.orderStatus} payment={order.paymentStatus}
                         OrderDetails={order.products.map((c,i)=>(
                             <td  class="row-xs-1" >
                                 <div class="row-xs-1">
                                     <text style={{fontWeight:'lighter', fontFamily:'Calibri Light' }} >{c.name}:  <text style={{fontWeight:'bold'}}>{c.quantity}</text></text>
                                 </div>
                             </td>
                         ))}
                     />
              });     
        return(
            <div style={{height:'100%'}}>
                <div style={{backgroundColor:'black',marginBottom:40}}>
                    {this.props.userType == "Seller" ? 
                    <img style={{flex:1,height:300,width:300,borderRadius:150,marginLeft:'70%',marginTop:25,marginBottom:25}} src={this.state.userdata.image} />
                    :
                    <img style={{flex:1,height:300,width:300,borderRadius:150,marginLeft:'70%',marginTop:25,marginBottom:25}} src={this.state.userdata.profileImage} />
                    }
                    <div style={{color:'white',flex:1,borderRadius:150,marginLeft:'72%',marginBottom:100}}>
                        <text style={{fontSize:30,}}>{this.state.userdata.firstName+" "+this.state.userdata.lastName}<br/><br/></text>
                        {this.props.userType!=="Customer"?
                        <div>
                            <span class="glyphicon glyphicon-star" style={{fontSize:25}}></span>
                            <text style={{fontSize:25}}>{Math.round(this.state.userdata.rating*100)/100+" "}Rating<br/><br/></text>
                        </div>
                        :null}
                        </div>
                </div>
                <div style={{fontSize:20,marginLeft:25}}>
                        <div className="row">
                            <div className='col-2 col-md-2'>Name</div>
                            <div className='col-4 col-md-4' style={{color:'grey'}}>{this.state.userdata.firstName+" "+this.state.userdata.lastName}</div>
                            <br/><br/>
                        </div>
                        <div className="row">
                            <div className='col-2 col-md-2'>Contact No</div>
                            <div className='col-4 col-md-4'style={{color:'grey'}}>{this.state.userdata.mobileNumber}</div>
                            <br/><br/>
                        </div>
                        {this.props.userType=="Seller" ? 
                        <div>
                        <div className="row">
                            <div className='col-2 col-md-2'>Shop Name</div>
                            <div className='col-4 col-md-4'style={{color:'grey'}}>{this.state.userdata.shopName}</div>
                            <br/><br/>
                        </div>
                        <div className="row">
                            <div className='col-2 col-md-2'>Shop Address</div>
                            <div className='col-4 col-md-4'style={{color:'grey'}}>{this.state.userdata.shopAddress}</div>
                            <br/><br/>
                        </div>
                        </div>:null}
                            {/* <a href='/'>Edit Profile</a> */}
                    </div>
                    {this.props.userType=="Customer" ?
                    <div>
                    <table class="table table-bordered " style={{fontFamily: 'Calibri Light', fontSize: 17,fontWeight: 'normal', backgroundColor: 'green', color: 'white',marginTop:50}} >
                        <thead>
                            <tr>
                            <th class="col-xs-1 center-block">Order id</th>
                            <th class="col-xs-1 center-block">Date/time</th>
                            <th scope="col-xs-3 center-block">Ordered items</th>
                            <th class="col-xs-1 center-block">Price LKR</th>
                            <th class="col-xs-1 center-block">Shop</th>
                            <th class="col-xs-1 center-block">Order Status</th>
                            {/* <th class="col-xs-1 center-block">Payment</th> */}
                            </tr>
                        </thead>
                   
                    </table>
                    {purschasedOrders}
                    </div>
                    :null}
                    </div>
        );
    }
}

const mapStateToProps=state=>{
    return{
      userType:state.auth.userType,
      userId:state.auth.userId
    //   Address:state.location.address,
    //   lng:state.location.lngValue,
    //   lat:state.location.latValue,
    //   isAuth:state.auth.token!==null
    }
  }
export default connect(mapStateToProps,null)(Profile);