import React,{Component} from 'react';
import axios from 'axios';

// state={
//     pro:[]
// }



class OrderItems extends Component{

finishOrderHandeler=()=>{
    axios.update('')
    .then(response=>{
        console.log(response);
    })
    .catch(err=>{

    });
};

render(){
    // const OrderI=this.props.Items.map(item=>{
    //     return <Product product={item.product} quantity={item.quantity}/>
    // });
    
        return (
        <div className="container-fluid text-center d-none d-lg-block">
            <div className="row">
            <div className="col-10 mx-auto col-lg-2" >
                {this.props.OrderId}
            </div>

            <div className="col-10 mx auto col-lg-2">
                {this.props.time}
            </div>

            <div className="col-10 mx auto col-lg-2">
                {this.props.OrderDetails}
            </div>

            <div className="col-10 mx-auto col-lg-2">
                {this.props.total}
            </div>

            <div className="col-10 mx-auto col-lg-2">
                <div className="d-flex justify-content-center"> 
                <   button type="button" className="btn btn-success" onClick={this.finishOrderHandeler}>Finish order</button>
            </div>
            </div>
            </div>
            <hr/>
        </div>
        );    
    }  
}
export default OrderItems;


