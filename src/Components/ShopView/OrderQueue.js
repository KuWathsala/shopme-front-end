import React,{Component,Fragment} from 'react';
import axios from 'axios';
import ColumnTitles from './ColumnTitles'
import OrderItems from './OrderItems';
import * as signalR from '@aspnet/signalr';
import Img from '../../Assets/profile.png';
import {connect} from 'react-redux';

class OrderQueue extends Component{
    state={
        WaitingOrders:[],
        connection:''
    }

    componentDidMount(){
        console.log("this.props.seller.user")
        console.log(this.props.seller.user)

        this.state.connection=new signalR.HubConnectionBuilder().withUrl("http://192.168.43.15:5001/connectionHub").build()
        this.state.connection.start()
        .then(()=> {
            console.log("connected");
            this.state.connection.invoke("SellerOnline",4);//this.props.seller.userId
        })
        .catch(error => console.log(error));

        axios.post(`http://192.168.43.15:5001/api/orders/getWaitingOrderDetailsBySeller/${4}`)//this.props.seller.userId
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
        const WaitingOrders=this.state.WaitingOrders.map(orders=>{
           return <OrderItems value={orders} OrderId={orders.id} time={orders.createdAt} total={orders.totalPrice} connection={this.state.connection}
           OrderDetails={orders.products.map((c,i)=>(
                    <div key={i} style={{MozBoxAlign:'center',paddingLeft:'50%'}}>
                        <div className='row'>
                            <div className='col'style={{paddingRight:'5%'}}>{c.name} :  </div>
                            <div className='col'>{c.quantity}</div>                            
                        </div>                        
                    </div>))}/>
             });        
        return(
            <div>
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
      seller:state.auth
    }
}
  
export default connect(mapStateToProps,null)(OrderQueue)

