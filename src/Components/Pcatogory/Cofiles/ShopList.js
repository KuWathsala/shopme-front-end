import React, { Component } from 'react';
import Shop from './Shop';
import {ProductConsumer,ProductProvider} from '../context';
import {connect} from 'react-redux';
import axios from 'axios';
//import BodyData from './BodyData';
import "./ShopList.css";
import Spinner from '../../../Containers/Spinner/Spinner_2';

class ShopList extends Component {
  constructor(props){
    super(props);
    this.state={
      shopes:[],
      loading:false,
    }
  };
  
  componentDidMount(){
    this.setState({loading:true});
    axios.get(`https://backend-webapi20191102020215.azurewebsites.net/api/Sellers/${this.props.lat},${this.props.lng}`)
    .then(response=>{
        this.setState({loading:false});
        this.setState({shopes: response.data});
        console.log(this.state.shopes)
    })
    .catch(err=>{this.setState({loading:false}); })
  } 
  
  render() {
    if(this.state.loading)
      return <div style={{height:600,opacity:0.6,justifyContent:'center',marginTop:'10%'}}><Spinner/></div>
    else
      return (
         <React.Fragment>  
            
              <div className="py-5">
                <div className="container" style={{height:'100%',width:'100%'}} >
                  {/* <Title title="Shops"/>*/}
                  <div class="jumbotron jumbotron-fluid">
                   <div className="tit">
                   <strong style={{textAlign:'center'}}><h2><br/>SHOPS<br/></h2></strong>  
                  <pre style={{textAlign:'center',fontStyle:'italic',fontSize:25}}>Stay home and shop online. You are too pretty to have to look for a parking spot.<br/><br/></pre>
                    </div>
                  </div>
                  <div className="row"> 
                  <div className='col md-4'>
                  <ProductConsumer>
                    {value=>{
                      return this.state.shopes.map( shop =>{    
                        console.log("shop->"+shop.id)
                        return <Shop key={shop.id} shop={shop}/>;
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