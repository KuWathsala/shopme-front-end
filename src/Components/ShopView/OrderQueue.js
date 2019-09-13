import React,{Component,Fragment} from 'react';
import axios from 'axios';
import ColumnTitles from './ColumnTitles'
import OrderItems from './OrderItems';
import * as signalR from '@aspnet/signalr';
import Img from '../../Assets/logo.png';
import {connect} from 'react-redux';

class OrderQueue extends Component{
    state={
        WaitingOrders:[],
        connection:'',
        Details:[]
    }

    componentDidMount(){
        // console.log("this.props.seller.user")
        // console.log(this.props.seller.user)

        this.state.connection=new signalR.HubConnectionBuilder().withUrl("https://backend-webapi20190825122524.azurewebsites.net/connectionHub").build()
        this.state.connection.start()
        .then(()=> {
            console.log("connected");
            this.state.connection.invoke("SellerOnline",this.props.userId);//this.props.seller.userId
        })
        .catch(error => console.log(error));

        axios.post(`https://backend-webapi20190825122524.azurewebsites.net/api/orders/getWaitingOrderDetailsBySeller/${this.props.sellerid}`)//this.props.seller.userId
        .then(response=>{
            console.log(response.data)
            for(let i=0; i<response.data.length; i++ )
                this.setState({WaitingOrders: [...this.state.WaitingOrders, response.data[i]]})
        })
        .catch(error=>{
            console.log(error)
        });

        axios.get(`https://backend-webapi20190825122524.azurewebsites.net/api/sellers/${this.props.sellerid}`)//this.props.seller.userId
        .then(response=>{
            console.log(response.data)
                this.setState({Details:response.data})
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
                <div className='row'  style={{flex:1,backgroundColor:'white',textAlign:'center',fontSize:'24px',marginBottom:'5px',marginLeft:10}}>
                    {/* <img src={Img} alt="product" className="card-img-top"  height="100px" width="200px" style={{marginLeft:30}}/> */}
                    <p style={{fontSize:60,color: '#26bf63',fontWeight:'600',}}>Shop</p>
                    <p style={{fontSize:60,color: '#5189c9',fontWeight:'600',}}>Me</p>
                    <p style={{alignSelf:'flex-end',color:'darkgreen',marginBottom:25}}>Seller's Portal</p>
                </div>
                <div className='row'  style={{backgroundColor:'green',textAlign:'center',fontSize:'24px',color:'lightgreen',marginBottom:'20px'}}>
                    <img src={this.state.Details.image} alt="product" className="card-img-top"  height="100px" width="200px" style={{marginLeft:30}}/>
                    <p style={{alignSelf:'center',color:'lightgreen',textAlign:'center',marginLeft:20}}>{this.state.Details.shopName}</p>
                </div>
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

