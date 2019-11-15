import React,{Component} from "react";
import axios from 'axios';
import {Link,Redirect} from 'react-router-dom';
import * as actions from '../../Stores/Actions/Index';
import Img from '../../Assets/wrong.png'

class Payment_unsucess extends Component{
    constructor(props){
        super(props);
    this.state={
        code:null,
        isTrue:null,
    }
    }

    handleSubmit=(e)=>{
        e.preventDefault();
        let url=`https://backend-webapi20191102020215.azurewebsites.net/api/UserAuth/verify/${this.state.code}`;
        axios.post(url,)
        .then(response=>{
            console.log(response);  
            this.setState({isTrue:response.data});   
        })
        .catch(err=>{
            console.log(err);
        });
    }

    
    render(){
        return(
            <div style={{flex:1,height:600,width:'100%',}}> 
                <h1 style={{marginTop:100}}>Payment Unsuccessful</h1>
                <div className='col'>
                <img src={Img} style={{width:250,height:250,marginTop:140,position: 'absolute',left:'50%',transform: 'translate(-50%, -50%)'}}/>
                <div className='row' style={{marginTop:330,position: 'absolute',left:'50%',transform: 'translate(-50%, -50%)'}}>
                <button className="btn btn-success" onClick style={{width:300,height:60,fontSize:25,backgroundColor:'green',marginRight:10}}
                >Proceed to Payment</button>
                <button className="btn btn-success" style={{width:300,height:60,fontSize:25,backgroundColor:'red'}}
                >Discard Order</button>
                </div>
                </div>
            </div>
        )
    }
}

export default Payment_unsucess