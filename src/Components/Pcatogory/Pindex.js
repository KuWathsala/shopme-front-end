import React,{Component} from 'react';
import {Switch,Route} from 'react-router-dom';
//import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
//import Navbar from './components/Navbar';
import ProductList from './Cofiles/ProductList';
import Details from './Cofiles/Details';
import Cart from './Cofiles/Cart/Cart';
import ShopList from '../Pcatogory/Cofiles/ShopList';
import Modal from './Cofiles/Modal';
class Pindex extends Component {
  render(){
    return (
     <React.Fragment>
      {/* <Navbar/> */}
        
      <Switch>
        <Route exact path="/ProductList" component={ProductList}/>
        <Route path="/details" component={Details}/>
        <Route path="/Cart" component={Cart}/>
        <Route path="/shops"exact component={ShopList}/>
      </Switch>
  <Modal/>
     </React.Fragment>
      );
    
  }
 
}


export default Pindex;
