import React, { Component } from 'react';
import Shop from './Shop';
import {ProductConsumer,ProductProvider} from '../context';
import {connect} from 'react-redux';
import axios from 'axios';
//import BodyData from './BodyData';
import "./ShopList.css";
class ShopList extends Component {
  constructor(props){
    super(props);
    this.state={
      shopes:[],
    }
  };
  
  componentDidMount(){
    axios.get(`https://backend-webapi20191102020215.azurewebsites.net/api/Sellers/${this.props.lat},${this.props.lng}`)
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
                <div className="container" style={{height:'100%',width:'100%'}} >
                  
                  {/* <Title title="Shops"/>*/}
                  <div class="jumbotron jumbotron-fluid">
                   <div className="tit">
                      <strong><h1><br/>SHOPS<br/></h1></strong>
                  <pre style={{textAlign:'center',fontStyle:'italic',fontSize:25}}>Stay home and shop online. You are too pretty to have to look for a parking spot.<br/><br/></pre>
                    </div>
                  </div>
                  <div className="row"> 
                  <div className='col md-4'>
                  <ProductConsumer>
                    {value=>{
                      return this.state.shopes.map( shop =>{    //return value.shopes.map
                        console.log("shop->"+shop.id)
                        return <Shop key={shop.id} shop ={shop}/>;
                      })
                    }}
                  </ProductConsumer>
                  </div>
                  </div>
                </div>
              </div>
            </React.Fragment>
          
          
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