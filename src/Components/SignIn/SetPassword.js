import React,{Component} from "react";
import axios from 'axios';
import { Field, reduxForm } from 'redux-form';

const renderField = ({ input,label,type,click,value,meta: { touched, error, warning }}) => (
    <div className='row' style={{display:'flex'}}>
        <div style={{flex:1,height:600,width:'100%'}} >
            <input {...input} placeholder={label} type={type} value={value} onclick={click} style={{position: 'absolute', left: '50%',transform: 'translate(-50%, -50%)',marginTop:80,width:'40%',textAlign:'center',fontSize:24,borderColor:'white',borderBottomColor:'green',borderBottomWidth:5}}/>{/**,color:"green" */}
          {touched && ((error && <span style={{color:'red',backgroundColor:'white',fontWeight:'bold',position: 'absolute', left: '80%',transform: 'translate(-50%, -50%)',marginTop:80,width:'40%',textAlign:'center'}}>{error}</span>) ||(warning && <span>{warning}</span>))}
        </div>
    </div>
  )
  const renderField2 = ({ input,label,type,click,value,meta: { touched, error, warning }}) => (
    <div className='row' style={{marginBottom:10,display:'flex'}}>
        <div style={{flex:1,height:600,width:'100%',}} >
            <input {...input} placeholder={label} type={type} value={value} onclick={click} style={{position: 'absolute', left: '50%',transform: 'translate(-50%, -50%)',marginTop:-380,width:'40%',textAlign:'center',fontSize:24,borderColor:'white',borderBottomColor:'green',borderBottomWidth:5}}/>{/**,color:"green" */}
          {touched && ((error && <span style={{color:'red',backgroundColor:'white',fontWeight:'bold',position: 'absolute', left: '80%',transform: 'translate(-50%, -50%)',marginTop:-380,width:'40%',textAlign:'center'}}>{error}</span>) ||(warning && <span>{warning}</span>))}
        </div>
    </div>
  )

const required=value=> value ? undefined:'Required';

const submit=(values)=>{
    const resetPassword={
        email:this.props.location.state.email,
        password:values.password
    }
    let url=`https://backend-webapi20191102020215.azurewebsites.net/api/UserAuth/resetPassword/`;
    axios.post(url,resetPassword)
    .then(response=>{
        console.log(response);  
        this.setState({isTrue:response.data});   
    })
    .catch(err=>{
        console.log(err);
    });
}

class SetPassword extends Component{
    constructor(props){
        super(props);
    this.state={
        code:null,
        isTrue:null,
    }
    }


    // handleSubmit=(e)=>{
    //     e.preventDefault();
    //     let url=`https://backend-webapi20191102020215.azurewebsites.net/api/UserAuth/verify/${this.state.code}`;
    //     axios.post(url,)
    //     .then(response=>{
    //         console.log(response);  
    //         this.setState({isTrue:response.data});   
    //     })
    //     .catch(err=>{
    //         console.log(err);
    //     });
    // }

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
        console.log(this.props.location.state.email);
        const {handleSubmit, pristine, reset, submitting}=this.props;
        return(
            <form onSubmit={handleSubmit(submit)}>
            <div style={{flex:1,height:600,width:'100%',}}> 
                <h1 style={{marginTop:100}}>Reset your password</h1>
                {/* <div className='col'>
                <input type='text' value={this.state.code} placeholder="Password" style={{position: 'absolute', left: '50%',transform: 'translate(-50%, -50%)',marginTop:80,width:'40%',textAlign:'center',fontSize:24,borderColor:'white',borderBottomColor:'green',borderBottomWidth:5}}
                    onChange={(event)=>this.setState({code:event.target.value}) }
                ></input>
                <input type='text' value={this.state.code} placeholder="Confirm Password" style={{position: 'absolute', left: '50%',transform: 'translate(-50%, -50%)',marginTop:180,width:'40%',textAlign:'center',fontSize:24,borderColor:'white',borderBottomColor:'green',borderBottomWidth:5}}
                    onChange={(event)=>this.setState({code:event.target.value}) }
                ></input>
                <button className="btn btn-success" style={{marginTop:280,position: 'absolute',left:'50%',transform: 'translate(-50%, -50%)',width:'40%',height:60,fontSize:25,backgroundColor:'green'}}
                >Next →</button>
                {this.state.isTrue==false ?
                <div>
                <p style={{marginTop:260,position: 'absolute',left:'50%',transform: 'translate(-50%, -50%)',fontSize:25,color:'red'}}>Invalid Verification code</p>
                
                </div>
                :null}
                </div> */}
                 <Field 
                    name="password"
                    type="text"
                    component={renderField}
                    label="Password"
                    validate={[required]}
                    click={null}
                    value={null}
                />
                <Field 
                    name="ConfirmPassword"
                    type="text"
                    component={renderField2}
                    label="Confirm Password"
                    validate={[required]}
                    click={null}
                    value={null}
                />
                <button className="btn btn-success" style={{marginTop:-900, position: 'absolute',left:'50%',transform: 'translate(-50%, -50%)',width:'40%',height:60,fontSize:25,backgroundColor:'green'}}
                >Next →</button>
            </div>
            </form>
        )
    }
}

export default reduxForm({
    form:'setPassword'
})(SetPassword)