import React,{Component} from 'react';
import Img from '../../Assets/profile.png';
import './prof.css';
import axios from 'axios';

class Profile extends Component{

    state={
        userdata:[],
        oders:[]
    };

    componentDidMount(){
        axios.get('')
        .then(response=>{
            this.setState({userdata:response.data});
        });
        axios.get('')
        .then(response=>{
            this.setState({userdata:response.data});
        });
    }

    render(){
        return(
            <div style={{height:'500px'}}>
                <div className='col-4 col-md-4'  style= {{borderRight:'3px solid grey', height:'400px',}} >
                <img style={{width:'60%',height:'60%',borderRadius:'80%',position:'relative',paddingLeft:'10%'}} src={Img} />
                </div>
                <div className='col-8 col-md-8'>
                    <div className="personalInfo">
                        <tr>
                            <div className='col-8 col-md-8'>Name : </div>
                            <div className='col-4 col-md-4'>{this.state.userdata.name}</div>
                        </tr> 
                        <tr>
                            <div className='col-8 col-md-8'>Adress : </div>
                            <div className='col-4 col-md-4'>{this.state.userdata.addres}</div>
                        </tr>
                        <tr>
                            <div className='col-8 col-md-8'>Contact NO: </div>
                            <div className='col-4 col-md-4'>{this.state.userdata.contactNo}</div>
                        </tr>
                            <a href='/'>Edit Profile</a>
                    </div>
                        <div className="container" style={{width:"80%",paddingTop:"10%"}}>
                            <h5><b>Previous orders</b></h5>
                            <div className="table-stripped">
                                <div className="row" style={{background:'#4CAF50'}}>
                                    <div className="col-md-4"><th>Date</th></div>
                                    <div className="col-md-2" style={{textAlign:"center"}}><th >Order No</th></div>
                                    <div className="col-md-2" ><th style={{textAlign:"center"}}>Items</th></div>
                                    <div className="col-md-2" ><th style={{textAlign:"center"}}>Price</th></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        );
    }
}
export default Profile;