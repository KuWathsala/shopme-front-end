import React, { Component } from 'react';
import { connect} from 'react-redux';

import './App.css';
import Blog from './Containers/Blog/Blog';
import {BrowserRouter,withRouter} from 'react-router-dom';
import * as actions from './Stores/Actions/Index';

class App extends Component {

  componentDidMount(){
    this.props.onTryAutoSignUp();
  }

  render() {
    return ( 
      <BrowserRouter>
        <div> 
          <Blog/>
        </div>
      </BrowserRouter>
    );
  }
}

const mapDispatchToProps=dispatch=>{
  return{
    onTryAutoSignUp: ()=>dispatch(actions.authCheckState())
  };
};

export default withRouter(connect(null,mapDispatchToProps)(App));
