import React,{Component} from 'react';
import * as signalR from '@aspnet/signalr';
import {connect} from 'react-redux';

class OrderItems extends Component{

    constructor(props){
        super(props);
        this.state={
            id: 4,
            message: '',
            connection : '',
            latitude: 6.9343,
            longitude: 79.846,
            loading: false,
            buttonConfirm: 'confirm'
        }
    }

    componentDidMount(){
        console.log("this.props.connection")
        console.log(this.props.connection)
        console.log("this.props.OrderDetails")
        console.log(this.props.OrderDetails)
    }


    confirmOrderHandeler=()=>{
        this.setState({loading: true})
        this.props.connection.invoke('SendRequest', this.state.latitude, this.state.longitude, this.props.OrderId) //order id
        .then(response=>console.log("SendRequest "+response))
        .catch(err => {
            console.error(err)
            alert("something went wrong, try again later")
            this.setState({loading: false})
        });

        this.props.connection.on("Reply",  (message)=> {
            console.log("reply "+message);
            if(message==='Reject'){
                this.setState({loading: false})
                alert("currently trere are no any deliverers near to you")
            }
        });
    };

    button=()=>{
        (this.state.loading===false) ? this.setState({buttonConfirm: 'confirm'}) : this.setState({buttonConfirm: 'order is confirmed'}) ;
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
                    <th class="col-xs-1 "><text class="pull-right" >{this.props.total}</text></th>
                    <th class="col-xs-2"style={{justifyContent: 'center'}} >
                        <button type="button" className="btn btn-success center-block" style={{color: 'white', borderRadius: 0, backgroundColor: 'green'}} disabled={this.state.loading} loading={this.state.loading} onClick={this.confirmOrderHandeler}>{this.button}{this.state.buttonConfirm}
                            <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                        </button>
                    </th>
                </tr>
            </thead>
        </table>
        );    
    }  
}

const mapStateToProps=state=>{
    return{
      seller:state.auth
    }
}
  
export default connect(mapStateToProps,null)(OrderItems)

