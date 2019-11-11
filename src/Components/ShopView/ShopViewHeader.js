import React,{Component,Fragment} from 'react';
import axios from 'axios';
import {store} from '../../index';
import '../Signup/Signup.css';

class ShopViewHeader extends Component{
    state={
        shopName: '',
        shopImage: ''
    };

    componentDidMount(){
        axios.get(`https://backend-webapi20191102020215.azurewebsites.net/api/sellers/1`)
            .then(response=>{
                console.log("response")
                console.log(response)
                this.setState({shopName: response.data.shopName, shopImage: response.data.image})
        });
    }

    render(){
        console.log(this.state.shopProduct);       
        return(
            <div>
                <div class="card bg-dark text-white" style={{backgroundImage: "url(" + this.state.shopImage + ")", height: 200, }}>  
                    <div class="col" style={{ backgroundColor: 'white',marginTop: 20, height: 100, width: 300, borderWidth: 5, borderColor: 'black', }}>
                        <text style={{fontSize:30,color: '#26bf63',fontWeight:'600',}}>shop
                            <text style={{fontSize:30,color: '#5189c9',fontWeight:'600',}}>Me  
                            <text style={{fontSize: 20,color:'darkgreen', marginLeft: 15, fontFamily: 'Calibri Light'}}>{this.props.header}</text>
                            </text>
                        </text>
                        <div  class="col">
                            <text  style={{marginLeft: 50, fontSize: 22}}>{this.state.shopName}</text>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
}
export default ShopViewHeader;