import React,{Component} from 'react';

class Orders extends Component{

    constructor(props){
        super(props);
        this.state={
         
        }
    }

render(){
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

