import React, { Component } from 'react';
import Shop from './Shop';
import Title from "./Title";
import {ProductConsumer,ProductProvider} from '../context';
import {connect} from 'react-redux';
import axios from 'axios';

class ShopList extends Component {
  constructor(props){
    super(props);
    this.state={
      shopes:[],
    }
  };
  
  componentDidMount(){
    axios.get(`https://localhost:5001/api/Sellers/${this.props.lat},${this.props.lng}`)
    .then(response=>{
        this.setState({shopes: response.data});
        console.log(this.state.shopes)
    })
    .catch()
  } 
  
  render() {
        console.log("shopList")
        return (
          <React.Fragment>
              <div className="py-5">
                <div className="container">
                  <Title name="our" title="Shopes"/>
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