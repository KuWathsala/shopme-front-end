import React,{Component} from 'react';
import axios from 'axios';

// state={
//     pro:[]
// }



class OrderItems extends Component{

finishOrderHandeler=()=>{
    axios.delete('')
    .then(response=>{
        console.log(response);
    });
};

render(){
    // const OrderI=this.props.Items.map(item=>{
    //     return <Product product={item.product} quantity={item.quantity}/>
    // });
    
        return (
        <div className="row my-2 text-capitalize text-center" style={{padding:'15px'}}>
            <div className="col-10 mx-auto col-lg-2" >
                {this.props.OrderId}
            </div>

            <div className="col-10 mx-auto col-lg-2">
                {this.props.OrderDetails}
            </div>

            <div className="col-10 mx-auto col-lg-2">
                {this.props.DeliverId}
            </div>

            <div className="col-10 mx-auto col-lg-2 my-2 my-lg-0">
                <div className="d-flex justify-content-center"> 
                <   button type="button" className="btn btn-success" onClick={this.finishOrderHandeler}>Finish order</button>
                </div>
            </div>
            <hr/>
        </div>
        );    
    }  
}
export default OrderItems;


