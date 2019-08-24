import React, { Component } from 'react';
import * as signalR from '@aspnet/signalr';

export default class Singalr extends Component {

    constructor(props){
        super(props);
        this.state={
            id: 1,
            message: '',
            connection : '',
            latitude: 6.9343,
            longitude: 79.846,
        }
    }

    componentDidMount(){
        this.state.connection=new signalR.HubConnectionBuilder().withUrl("http://192.168.43.16:5001/connectionHub").build()
        this.state.connection.start()
        .then(()=> {
            console.log("connected");
            this.state.connection.invoke("SellerOnline",this.state.id);
        })
        .catch(error => console.log(error));
    }

    sendMessage = () => {
        this.state.connection.invoke('SendRequest', this.state.latitude, this.state.longitude)
        .then(response=>console.log("SendRequest "+response))
        .catch(err => console.error(err));

        this.state.connection.on("Reply",  (message)=> {
            console.log("reply "+message);
        });
        
        /*
        this.state.connection.on("DelivererReply",  (message)=> {
            console.log(message);
        });
        this.setState({message: ''}); 
        */     
    };

    render() {
    return ( 
        <div>
            <input
                type="text"
                value={this.state.message}
                onChange={e => this.setState({ message: e.target.value })}
            />

            <button onClick={this.sendMessage}>Send</button>

        </div>
    );
    }
}
/*
import React, { Component } from 'react';
import * as signalR from '@aspnet/signalr';

export default class Singalr extends Component {

    componentDidMount(){
        let connection = new signalR.HubConnectionBuilder()
        .withUrl("https://localhost/connectionHub")
        .build();
        
        connection.start()
        .then(()=> {
            console.log("connected");
            connection.invoke("SendRequest");
            connection.on("SendRequest",(message)=>{
                console.log(message);
            });
        })
        .catch(error => console.log(error));


        connection.on("ReceiveMessage",  (message)=> {
            this.setState({
                message: message
            })
            console.log(message);
        });
    }

    render() {
    return ( 
        <div>
            <text>a</text>
        </div>
    );
    }
}

 */