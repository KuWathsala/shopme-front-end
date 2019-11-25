import React,{Component,Fragment} from 'react';
import axios from 'axios';
import ColumnTitles from './ColumnTitles'
import OrderItems from './OrderItems';
import * as signalR from '@aspnet/signalr';
import Img from '../../Assets/logo.png';
import {connect} from 'react-redux';
import ShopViewHeader from './ShopViewHeader';
import Spinner from '../../Containers/Spinner/Spinner_2';

class OrderQueue extends Component{
    state={
        WaitingOrders:[],
        connection:'',
        loading:false,
    }

    componentDidMount(){
        this.state.connection=new signalR.HubConnectionBuilder().withUrl("https://backend-webapi20191102020215.azurewebsites.net/connectionHub").build()
        this.state.connection.start()
        .then(()=> {
            console.log("connected");
            this.state.connection.invoke("SellerOnline",this.props.userId);//this.props.seller.userId
        })
        .catch(error => console.log(error));
        this.setState({loading:true});
        axios.post(`https://backend-webapi20191102020215.azurewebsites.net/api/orders/getWaitingOrderDetailsBySeller/${this.props.sellerid}`)//this.props.seller.userId
        .then(response=>{
            console.log(response.data)
            for(let i=0; i<response.data.length; i++ )
                this.setState({WaitingOrders: [...this.state.WaitingOrders, response.data[i]],loading:false})
        })
        .catch(error=>{
            console.log(error);
            this.setState({loading:false});
        });
    }

    render(){
        const WaitingOrders=this.state.WaitingOrders.map(orders=>{
           return <OrderItems value={orders} OrderId={orders.id} time={orders.createdAt} total={orders.totalPrice} verified={orders.paymentStatus} connection={this.state.connection}
                        OrderDetails={orders.products.map((c,i)=>(
                            <td  class="row-xs-1" >
                                <div class="row-xs-1">
                                    <text style={{fontWeight:'lighter', fontFamily:'Calibri Light' }} >{c.name}:  <text style={{fontWeight:'bold'}}>{c.quantity}</text></text>
                                </div>
                            </td>
                        ))}
                    />
             }); 
        if(this.state.loading)
            return <div style={{height:700,paddingTop:200}}><Spinner /></div>
        else       
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

