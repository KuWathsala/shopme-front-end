import React,{Component,Fragment} from 'react';
import axios from 'axios';
import ColumnTitles from './ColumnTitles'
import OrderItems from './OrderItems';

import Img from '../../Assets/profile.png';

class OrderQueue extends Component{
    state={
        WaitingOrders:[
            {OrderId:1,DeliverId:'max', age:'25',
            Products:[
                {fname:"Milk",qty:2},
                {fname:"fish",qty:5},
                {fname:"Milk",qty:2},
                {fname:"fish",qty:5}
            ]},
            {OrderId:2,DeliverId:'dkdk', age:'25',Products:[{fname:"fish",qty:5}]},
            {OrderId:3,DeliverId:'kdjskd', age:'25',Products:[{fname:"meat",qty:2}]},
            {OrderId:4,DeliverId:'nsdjn', age:'25',Products:[{fname:"fish",qty:5}]}
        ],
    }

    componentDidMount(){
        axios.get('')
            .then(response=>{
                this.setState({WaitingOrders:response.data})
            });
    }

    render(){
        console.log(this.state.WaitingOrders);
        const WaitingOrders=this.state.WaitingOrders.map(orders=>{
            console.log(orders);
            console.log(orders.Products.fname);
           return <OrderItems value={orders} OrderId={orders.OrderId} DeliverId={orders.DeliverId} 
           OrderDetails={orders.Products.map((c,i)=>(
                    <div key={i} style={{MozBoxAlign:'center',paddingLeft:'50%'}}>
                        <div className='row'>
                            <div className='col'style={{paddingRight:'5%'}}>{c.fname} :  </div>
                            <div className='col'>{c.qty}</div>                            
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
export default OrderQueue;