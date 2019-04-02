import React, { Component } from 'react';
import './SignIn.css';

class SignIn extends Component{
    render(){
        return(

<div className="login-page">
  <div className="form">
  <h3> Sign In</h3>
    <form className="register-form">
          <input type="text" placeholder="name"/>
      <input type="password" placeholder="password"/>
      <input type="text" placeholder="email address"/>
      <button>create</button>
      <p className="message">Already registered? <a href="#">Sign In</a></p>
    </form>
    <form className="login-form">
      <input type="text" placeholder="username"/>
      <input type="password" placeholder="password"/>
      <button>login</button>
    <br></br>
    <br></br>
    <p>or Sign In using</p>
    
      <a href="#" className="fa fa-google"></a>
      <a href="#" className="fa fa-facebook"></a>
      <a href="#" className="fa fa-twitter"></a>
      <p className="message">Not registered? <a href="#">Create an account</a></p>

    </form>
  </div>
</div>
        );
    }
}

export default SignIn;