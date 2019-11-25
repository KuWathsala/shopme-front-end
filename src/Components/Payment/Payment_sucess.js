import React,{Component} from "react";
import axios from 'axios';
import {Link,Redirect} from 'react-router-dom';
import * as actions from '../../Stores/Actions/Index';
import Img from '../../Assets/tick.png'

class Payment_sucess extends Component{
    constructor(props){
        super(props);
    this.state={
        code:null,
        isTrue:null,
        payment:false,
        Id:null
    }
    }

    componentDidMount=()=>{
        const {id}=this.props.match.params;
        this.setState({Id:id})
    }

    handleSubmit=()=>{
        console.log(this.state.Id);
        let url=``;
        axios.post(url,)
        .then(response=>{
            console.log(response);  
            this.setState({isTrue:response.data,payment:true});   
        })
        .catch(err=>{
            console.log(err);
            this.setState({payment:true});
        });
    }

    render(){
        if(this.state.payment)
            return <Redirect to='/'/>
        else
            return(
            <div style={{flex:1,height:600,width:'100%',}}> 
                <h1 style={{marginTop:100}}>Payment Successfully done..</h1>
                <div className='col'>
                <img src={Img} style={{width:250,height:250,marginTop:140,position: 'absolute',left:'50%',transform: 'translate(-50%, -50%)'}}/>
                <button className="btn btn-success" onClick={this.handleSubmit} style={{marginTop:330,position: 'absolute',left:'50%',transform: 'translate(-50%, -50%)',width:'10%',height:60,fontSize:25,backgroundColor:'green'}}
                >Ok</button>
                </div>
            </div>
        )
    }
}

export default Payment_sucess