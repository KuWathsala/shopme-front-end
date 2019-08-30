import React, { Component } from 'react';
import "./UForm.css";
import UploadF from './UploadF';
import axios from 'axios';
import Select from 'react-select'
import { Field, reduxForm } from 'redux-form';
import {connect} from 'react-redux';
import { auth } from '../../Stores/Actions/Auth';
import {store} from '../../index';


// let categories=[{label:'',value:null}];

const renderField = ({ input,label,type,meta: { touched, error, warning }}) => (
  <div className="title">
  <label htmlFor={label}>{label}</label>
      <input
        {...input} 
        type={type}
        placeholder={label}
        //value={value}
        //onChange={e=>this.setState({title:e.target.value})}
        />
         {touched && ((error && <span style={{color:'red',backgroundColor:'white',fontWeight:'bold'}}>{error}</span>) ||(warning && <span>{warning}</span>))}
  </div>
)
const required=value=> value ? undefined:'Required';

const submit=(values)=> {
  console.log(values)
  let productData={
    ...values,
    Image:'https://res.cloudinary.com/dubnsitvx/image/upload/v1567060621/anchor_fbyjiy.jpg',
    SellerId:store.getState().auth.userId,
  }
  console.log(productData);
  axios.post('https://backend-webapi20190825122524.azurewebsites.net/api/products/create',productData)
  .then(res=>{
      console.log(res);
  });
}


class EditProduct extends Component {
  constructor(props){
    super(props);
    this.state ={
      categories:[],
  };
  }
       

 
componentDidMount=()=>{
  axios.get('https://backend-webapi20190825122524.azurewebsites.net/api/categories')
    .then(response=>{
      console.log(response)
      this.setState({categories:response.data});
    })
    .catch(err=>{
      console.log(err)
    })
}

  fileUploadHandle=()=>{
    console.log(this.state);
    const data={}
    axios.post('https://backend-webapi20190825122524.azurewebsites.net/api/',data)
        .then(res=>{
            console.log(res);
        });
  }
render() {
  const {handleSubmit, pristine, reset, submitting}=this.props;
  console.log(this.state.categories);
        
  return (
    <div className="wrapper">
      <div className="wrapForm">
        <h1>Update Product</h1>
        <form onSubmit={handleSubmit(submit)}>
            <Field name="CategoryId" component="select" style={{alignSelf:'center',marginLeft:'relative',height:37,width:200}}>
                <option value="">Select a Category...</option>
                    {this.state.categories.map((Option,key) => (
                        <option value={Option.id} key={key}>
                    {Option.categoryName}
                </option>
                        
                    ))}
            </Field>
            <Field
              name="Name"
              type="text"
              component={renderField}
              label="Product Name"
              validate={[required]}
            />
            <Field
              name="Description"
              type="text"
              component={renderField}
              label="Description"
              validate={[required]}
            />
            <Field
              name="ShortDescription"
              type="text"
              component={renderField}
              label="Short Description"
              validate={[required]}
            />
            <Field
              name="UnitPrice"
              type="text"
              component={renderField}
              label="Unit Price"
              validate={[required]}
            />
            <Field
              name="Quantity"
              type="text"
              component={renderField}
              label="Quantity"
              validate={[required]}
            />
            <div className='col'>
              <label htmlFor="img">Image</label>
              <UploadF/>
            <div>
              <button type="submit" className="btn btn-default" disabled={submitting} style={{alignSelf:'strech'}}>UPDATE</button>  
            </div>     
          </div>
        </form>
      </div>
  </div>
        );
    }
}

const mapStateToProps=state=>{
  return{
    userId:state.auth.userId,
  }
}

export default connect(mapStateToProps,null)(reduxForm({
  form: 'editProduct',
})(EditProduct))
