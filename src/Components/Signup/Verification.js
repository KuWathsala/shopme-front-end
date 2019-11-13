import React,{Component} from "react";
import {connect} from 'react-redux';
import axios from 'axios';
import {Link,Redirect} from 'react-router-dom';
import * as actions from '../../Stores/Actions/Index';

class Verification extends Component{
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

    resend=(e)=>{
        // e.preventDefault();
        // let url=`https://backend-webapi20191102020215.azurewebsites.net/api/UserAuth/verify/${this.state.code}`;
        // axios.post(url,)
        // .then(response=>{
        //     console.log(response);  
        //     this.setState({isTrue:response.data});   
        // })
        // .catch(err=>{
        //     console.log(err);
        // });
        console.log("resend");
    }
    render(){
        if(this.state.isTrue){
            this.props.verify();
            return (<Redirect to="/Signin" />);
        }
        else
        return(
            <form onSubmit={this.handleSubmit}>
            <div style={{flex:1,height:600,width:'100%',}}> 
                <h1 style={{marginTop:100}}>Your verification code has been sent to your email..</h1>
                <div className='col'>
                <input type='text' value={this.state.code} style={{position: 'absolute', left: '50%',transform: 'translate(-50%, -50%)',marginTop:80,width:'40%',textAlign:'center',fontSize:48,borderColor:'white',borderBottomColor:'green',borderBottomWidth:5}}
                    onChange={(event)=>this.setState({code:event.target.value}) }
                ></input>
                <button className="btn btn-success" style={{marginTop:180,position: 'absolute',left:'50%',transform: 'translate(-50%, -50%)',width:'40%',height:60,fontSize:25,backgroundColor:'green'}}
                >Next →</button>
                {this.state.isTrue==false ?
                <div>
                <p style={{marginTop:260,position: 'absolute',left:'50%',transform: 'translate(-50%, -50%)',fontSize:25,color:'red'}}>Invalid Verification code</p>
                <p style={{marginTop:300,position: 'absolute',left:'50%',transform: 'translate(-50%, -50%)',fontSize:25,color:'blue'}} onClick={()=>this.resend()}>Resend verification code</p>
                </div>
                :null}
                </div>
            </div>
            </form>
        )
    }
}
const mapDispatchToProps=dispatch=>{
    return{
        verify:()=>dispatch(actions.Verified()),
    };
  }
export default connect(null,mapDispatchToProps)(Verification)