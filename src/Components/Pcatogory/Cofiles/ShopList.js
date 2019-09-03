import React, { Component } from 'react';
import Shop from './Shop';
import Title from "./Title";
import {ProductConsumer,ProductProvider} from '../context';
import {connect} from 'react-redux';
import axios from 'axios';
import Spinner from '../../../Containers/Spinner/Spinner_2';

class ShopList extends Component {
  constructor(props){
    super(props);
    this.state={
      shopes:[],
    }
  };

 sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
  
  isloading=true
  componentDidMount(){
    this.isloading=true;
    this.sleep(500).then(() => {
    axios.get(`https://backend-webapi20190825122524.azurewebsites.net/api/Sellers/${this.props.lat},${this.props.lng}`)
    .then(response=>{
      this.isloading=false;
        this.setState({shopes: response.data});
        console.log(this.state.shopes)
    })
    .catch(this.isloading=false)})
  } 
  
  render() {
        console.log("shopList")
        return (
          <React.Fragment>
              <div className="py-5">
                <div className="container">
                  <Title name="our" title="Shopes"/>
                  {this.isloading ? <Spinner/> :null}
                  <div className="row"> 
                  <ProductConsumer>
                    {value=>{
                      return this.state.shopes.map( shop =>{    //return value.shopes.map
                        console.log("shop->"+shop)
                        return <Shop key={shop.id} shop ={shop}/>;
                      })
                    }}
                  </ProductConsumer>
                  </div>
                </div>
              </div>
            </React.Fragment>
            //<Product/> 
          
      );
    }
}
const mapStateToProps=state=>{
  return{
    lng:state.location.lngValue,
    lat:state.location.latValue
  }
}

export default connect(mapStateToProps,null)(ShopList);