import React,{Component,Fragment} from 'react';
import axios from 'axios';
import {store} from '../../index';
import '../Signup/Signup.css';

class ShopViewHeader extends Component{
    state={
        shopName: '',
        shopImage: '',
        shopAddress: ''
    };

    componentDidMount(){
        axios.get(`https://backend-webapi20191102020215.azurewebsites.net/api/sellers/1`)
            .then(response=>{
            console.log("response")
            console.log(response)
            this.setState({
                shopName: response.data.shopName, 
                shopImage: response.data.image, 
                shopAddress: response.data.shopAddress
            })
        });
    }

    render(){
        console.log(this.state.shopProduct);       
        return(
            <div class="card bg-dark text-white" style={{backgroundImage: "url(" + this.state.shopImage + ")",top: 0, height: 350, width: '100%'}}>  
                <div>
                    <text style={{marginTop: 80}}>.</text>
                </div>
                <div class="col" class="pull-right" style={{ backgroundColor: 'white',marginTop: 80, height: 200, width:500, borderWidth: 5, borderColor: 'black', justifyContent: 'center'}}>
                    <text style={{marginLeft: 10,  fontSize:40, color: '#26bf63',fontWeight:'600',}}>shop
                        <text style={{marginLeft: 10, fontSize:40,color: '#5189c9',fontWeight:'600',}}>Me</text>
                        <text style={{marginLeft: 10, fontSize: 35,color:'darkgreen', fontFamily: 'Calibri Light'}}>{this.props.header}</text>
                    </text>
                    <div  class="col">
                        <text  style={{alignSelf: 'center', fontSize: 30}}>{this.state.shopName}<br/></text>
                        <text  style={{marginLeft: 10, fontSize: 18}}>{this.state.shopAddress}</text>
                    </div>
                </div>
            </div>
        );
    };
}
export default ShopViewHeader;