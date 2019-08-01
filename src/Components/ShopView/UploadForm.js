import React, { Component } from 'react';
import "./UForm.css";
import UploadF from './UploadF';
class UploadForm extends Component {
   



    
    state ={
        title:"",
        img:"",
        price:"",
        company:"",
        info:"",

    };
    render() {
        return (
            <div className="wrapper">
    <div className="form-wrapper">
      <h1>Add Products</h1>
            <form>
                <div className="title">
              <label htmlFor="title">Title</label>
                <input
                type="text" 
                
                 placeholder="title" 
                value={this.state.title}
                onChange={e=>this.setState({title:e.target.value})}/>

</div>



<div className="img">
              <label htmlFor="img">Image</label>
              <UploadF/>
               

</div>

<div className="price">
              <label htmlFor="price">Price</label>
                <input
                type="text" 
                
                 placeholder="price" 
                value={this.state.price}
                onChange={e=>this.setState({price:e.target.value})}/>

</div>

<div className="company">
              <label htmlFor="company">Company</label>
                <input
                type="text" 
                
                 placeholder="company" 
                value={this.state.company}
                onChange={e=>this.setState({comany:e.target.value})}/>

</div>

<div className="info">
              <label htmlFor="info">Information</label>
                <input
                type="text" 
                
                 placeholder="info" 
                value={this.state.info}
                onChange={e=>this.setState({info:e.target.value})}/>

</div>

<div className="submit">
    <button type="submit" onClick={this.fileUploadHandler}>SUBMIT</button>
    {/* preview should be here */}
    </div>
            </form>

            </div>
            </div>
        );
    }
}

export default UploadForm;