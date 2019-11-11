import React,{Component,Fragment} from 'react';
import axios from 'axios';
import ColumnTitles from './ColumnTitles'
import OrderItems from './OrderItems';
import * as signalR from '@aspnet/signalr';
import Img from '../../Assets/logo.png';
import {connect} from 'react-redux';
import ShopViewHeader from './ShopViewHeader';

class OrderQueue extends Component{
    state={
        WaitingOrders:[],
        connection:'',
    }

    componentDidMount(){
        // console.log("this.props.seller.user")
        // console.log(this.props.seller.user)

        this.state.connection=new signalR.HubConnectionBuilder().withUrl("https://backend-webapi20191102020215.azurewebsites.net/connectionHub").build()
        this.state.connection.start()
        .then(()=> {
            console.log("connected");
            this.state.connection.invoke("SellerOnline",this.props.userId);//this.props.seller.userId
        })
        .catch(error => console.log(error));

        axios.post(`https://backend-webapi20191102020215.azurewebsites.net/api/orders/getWaitingOrderDetailsBySeller/1`)//this.props.seller.userId
        .then(response=>{
            console.log(response.data)
            for(let i=0; i<response.data.length; i++ )
                this.setState({WaitingOrders: [...this.state.WaitingOrders, response.data[i]]})
        })
        .catch(error=>{
            console.log(error)
        });
    }

    render(){
        console.log(this.state.WaitingOrders)
        const WaitingOrders=this.state.WaitingOrders.map(orders=>{
           return <OrderItems value={orders} OrderId={orders.id} time={orders.createdAt} total={orders.totalPrice} connection={this.state.connection}
                        OrderDetails={orders.products.map((c,i)=>(
                            <td  class="row-xs-1" >
                                <div class="row-xs-1">
                                    <text style={{fontWeight:'lighter', fontFamily:'Calibri Light' }} >{c.name}:  <text style={{fontWeight:'bold'}}>{c.quantity}</text></text>
                                </div>
                            </td>
                        ))}
                    />
             });        
        return(
            <div>
                <ShopViewHeader header={"my portal"} />
                <section>
                    <Fragment>
                        <ColumnTitles/> 
                        {WaitingOrders}                     
                    </Fragment>
                </section>
                
            </div>
        );
    };
}

const mapStateToProps=state=>{
    return{
      sellerid:state.auth.userId
    }
}
  
export default connect(mapStateToProps,null)(OrderQueue)

