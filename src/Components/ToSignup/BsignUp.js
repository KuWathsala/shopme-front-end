import React, { Component } from 'react';
import './BsignUp.css';
import { withRouter} from 'react-router-dom';

class BsignUp extends Component{

    try=()=>{
        this.props.history.push('/SignUp');        
    }    
    
render(){
return(

<div className="cont">


  <h2 ><br></br><b>Move The Way You Want</b></h2><br></br><br></br>

     <div className="row">

        <div className="col col-md-4">
            <h3><b>Buy</b></h3>
            <p>Buy when you want.<br></br> Find opportunities around you.</p>
            <button className="button" onClick={this.try} ><span><b>Sign Up To Buy  </b></span></button>
           
        </div>

        <div className="col col-md-4">
            <h3><b>Sell</b></h3>
            <p>Sell when you want.<br></br> Find opportunities around you.</p>
            <button className="button" onClick={this.try}><span><b>Sign Up To Sell</b>  </span></button>               
        </div>

        <div className="col col-md-4">
            <h3><b>Delliver</b></h3>
            <p>Delliver when you want.<br></br> Find opportunities around you.</p>
            <button className="button" onClick={this.try}><span><b>Sign Up To Deliver</b></span></button>
         </div>
        
     </div> 
</div>

);
}

}export default withRouter(BsignUp);

