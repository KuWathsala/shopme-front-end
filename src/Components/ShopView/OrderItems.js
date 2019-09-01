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
                <button type="button" className="btn btn-success" disabled={this.state.loading} loading={this.state.loading} onClick={this.confirmOrderHandeler}>{this.button}{this.state.buttonConfirm}</button>
            </div>
            </div>
            </div>
            <hr/>
        </div>
        );    
    }  
}

const mapStateToProps=state=>{
    return{
      seller:state.auth
    }
}
  
export default connect(mapStateToProps,null)(OrderItems)

