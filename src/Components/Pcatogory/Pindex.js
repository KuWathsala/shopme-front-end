import React,{Component} from 'react';
import {Switch,Route} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

import ProductList from './Cofiles/ProductList';
import Details from './Cofiles/Details';
import Cart from './Cofiles/Cart/Cart';
import ShopList from '../Pcatogory/Cofiles/ShopList';
//import '../Pcatogory/Cofiles/pApp.css';
import '../Pcatogory/Cofiles/pApp.css';
import PayForm from '../Payment/PayForm';
class Pindex extends Component {
  render(){
    return (
     <React.Fragment>
    
        
      <Switch>
      <Route  path="/ProductList" component={ProductList}/>
        <Route path="/shops"exact component={ShopList}/>
        <Route path="/details" component={Details}/>
        <Route path="/Cart" component={Cart}/>
        <Route path="/PayForm" component={PayForm}/>
      </Switch>

     </React.Fragment>
      );
    
  }
 
}


export default Pindex;

      