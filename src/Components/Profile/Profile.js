import React,{Component} from 'react';
import Img from '../../Assets/profile.png';
import {connect} from 'react-redux';
import './prof.css';
import axios from 'axios';

class Profile extends Component{

    state={
        userdata:[],
        oders:[]
    };

    componentDidMount(){
        if(this.props.userType=="Seller"){
            axios.get(`https://backend-webapi20191102020215.azurewebsites.net/api/sellers/${this.props.userId}`)
            .then(response=>{
                console.log(response);
                this.setState({userdata:response.data});
            });
        }else if(this.props.userType=='Customer'){
            axios.post(`https://backend-webapi20191102020215.azurewebsites.net/api/customers/${this.props.userId}`)
            .then(response=>{
                console.log(response);
                this.setState({userdata:response.data});
            });
        }else if(this.props.userType=="Deliverer"){
            axios.get(`https://backend-webapi20191102020215.azurewebsites.net/api/deliverers/${this.props.userId}`)
            .then(response=>{
                console.log(response);
                this.setState({userdata:response.data});
            });
        }
    }

    render(){
        return(
            <div style={{height:'100%'}}>
                <div style={{backgroundColor:'black',marginBottom:25}}>
                    <img style={{flex:1,height:300,width:300,borderRadius:150,marginLeft:'70%',marginTop:25,marginBottom:25}} src={this.state.userdata.image} />
                    <div style={{color:'white',flex:1,borderRadius:150,marginLeft:'70%'}}>
                        <text style={{fontSize:25,}}>{this.state.userdata.firstName+" "+this.state.userdata.lastName}<br/></text>
                        <span class="glyphicon glyphicon-star-empty" style={{fontSize:25,color:'yellow  '}}></span>
                    </div>
                </div>
                <div style={{fontSize:20}}>
                        <div className="row">
                            <div className='col-2 col-md-2'>Name</div>
                            <div className='col-4 col-md-4' style={{color:'grey'}}>{this.state.userdata.firstName+" "+this.state.userdata.lastName}</div>
                            <br/><br/>
                        </div>
                        <div className="row">
                            <div className='col-2 col-md-2'>Contact NO</div>
                            <div className='col-4 col-md-4'style={{color:'grey'}}>{this.state.userdata.mobileNumber}</div>
                            <br/><br/>
                        </div>

                        <div className="row">
                            <div className='col-2 col-md-2'>Shop Name</div>
                            <div className='col-4 col-md-4'style={{color:'grey'}}>{this.state.userdata.shopName}</div>
                            <br/><br/>
                        </div>
                        <div className="row">
                            <div className='col-2 col-md-2'>Shop Address</div>
                            <div className='col-4 col-md-4'style={{color:'grey'}}>{this.state.userdata.shopAddress}</div>
                            <br/><br/>
                        </div>
                            <a href='/'>Edit Profile</a>
                    </div>
                    </div>
        );
    }
}

const mapStateToProps=state=>{
    return{
      userType:state.auth.userType,
      userId:state.auth.userId
    //   Address:state.location.address,
    //   lng:state.location.lngValue,
    //   lat:state.location.latValue,
    //   isAuth:state.auth.token!==null
    }
  }
export default connect(mapStateToProps,null)(Profile);