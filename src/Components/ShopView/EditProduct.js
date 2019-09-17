import React, { Component } from 'react';
import "./UForm.css";
import UploadF from './UploadF';
import axios from 'axios';
import { Field, reduxForm } from 'redux-form';
import {connect} from 'react-redux';
import {store} from '../../index';


// let categories=[{label:'',value:null}];

const renderField2 = ({ input,label,type,value1,meta: { touched, error, warning }}) => (
  <div className="title">
  <label htmlFor={label}>{label}</label>
      <input
        {...input} 
        type={type}
        placeholder={label}
        />
         {touched && ((error && <span style={{color:'red',backgroundColor:'white',fontWeight:'bold'}}>{error}</span>) ||(warning && <span>{warning}</span>))}
  </div>
)
const required=value=> value ? undefined:'Required';

class EditProduct extends Component {
  constructor(props){
    super(props);
    this.state ={
      categories:[],
      ProductDetails:[],
  };
  }
       

 
componentDidMount=()=>{
  console.log(this.props.location.id)
  axios.get(`https://backend-webapi20190825122524.azurewebsites.net/api/products/${this.props.location.id}`)
    .then(response=>{
      console.log(response.data)
      this.setState({ProductDetails:response.data});
    })
    .catch(err=>{
      console.log(err)
    })

    axios.get(`https://backend-webapi20190825122524.azurewebsites.net/api/categories`)
    .then(response=>{
      this.setState({categories:response.data});
    })
    .catch(err=>{
      console.log(err)
    })
    console.log(this.state.ProductDetails.name)
    this.props.initialize({Name:this.state.ProductDetails.name});

}

  fileUploadHandle=()=>{
    console.log(this.state);
    const data={}
    axios.post('https://backend-webapi20190825122524.azurewebsites.net/api/',data)
        .then(res=>{
            console.log(res);
        });
  }

  submit=(values)=> {
    console.log(values)
    let productData={
      ...values,
      Image:this.props.ProductDetails.image,
      SellerId:store.getState().auth.userId,
    }
    console.log(productData);
    axios.update('https://backend-webapi20190825122524.azurewebsites.net/api/products',productData)
    .then(res=>{
        console.log(res);
    });
  }

render() {
  const {handleSubmit, pristine, reset, submitting}=this.props;
  console.log(this.state.categories);
        
  return (
    <div>
      <div className='row'  style={{flex:1,backgroundColor:'white',textAlign:'center',fontSize:'24px',marginBottom:'5px',marginLeft:10}}>
                        {/* <img src={Img} alt="product" className="card-img-top"  height="100px" width="200px" style={{marginLeft:30}}/> */}
                        <p style={{fontSize:60,color: '#26bf63',fontWeight:'600',}}>Shop</p>
                        <p style={{fontSize:60,color: '#5189c9',fontWeight:'600',}}>Me</p>
                        <p style={{alignSelf:'flex-end',color:'darkgreen',marginBottom:25}}>Seller's Portal</p>
                    </div>
    
    <div className="wrapper">
      <div className="wrapForm">
        <h1>Update Product</h1>
        <form onSubmit={handleSubmit(this.submit)}>
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
              component={renderField2}
              label="Product Name"
              //value1={this.state.ProductDetails.name}
              value1='jaajja'
              validate={[required]}
            />
            <Field
              name="Description"
              type="text"
              component={renderField2}
              label="Description"
              value1={this.state.ProductDetails.description}
              validate={[required]}
            />
            <Field
              name="ShortDescription"
              type="text"
              component={renderField2}
              label="Short Description"
              value1={this.state.ProductDetails.shortDescription}
              validate={[required]}
            />
            <Field
              name="UnitPrice"
              type="text"
              component={renderField2}
              label="Unit Price"
              value1={this.state.ProductDetails.unitPrice}
              validate={[required]}
            />
            <Field
              name="Quantity"
              type="text"
              component={renderField2}
              label="Quantity"
              value1={this.state.ProductDetails.quantity}
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
