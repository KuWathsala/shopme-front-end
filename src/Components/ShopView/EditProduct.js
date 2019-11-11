import React, { Component } from 'react';
import "./UForm.css";
import UploadF from './UploadF';
import axios from 'axios';
import { Field, reduxForm } from 'redux-form';
import {connect} from 'react-redux';
import {store} from '../../index';
import ShopViewHeader from './ShopViewHeader';

const renderField2 = ({ input,label,type,value1, meta: { touched, error, warning }}) => (
  <div class="row-xs-4 ">
    <label htmlFor={label} class="inputsm" style={{fontFamily: 'Calibri Light', fontSize: 18, fontWeight: 'bold', marginTop: 15}} >{label}</label>
    <input class="form-control"  {...input}   type={type}  placeholder={label} value={value1}
      style={{borderBottomWidth: 2, borderColor: 'white', height: 40, borderBottomColor: 'green', borderRadius: 0 }}
    />
    {touched && ((error && <span style={{color:'red',backgroundColor:'white',fontWeight:'bold'}}>{error}</span>) ||(warning && <span>{warning}</span>))}
  </div>
)

const required=value=> value ? undefined:'required';
const isValidPrice=value=> value && !/^[1-9]+(\.[0-9]{1,2})?$/.test(value)  ? 'invalid price':undefined;
const isInteger=value=> value && !/^[1-9]*$/.test(value)   ? 'invalid quantity':undefined;
const isDigit=value=> value && !/^[0-9]$/.test(value)   ? 'invalid':undefined;

class EditProduct extends Component {
  constructor(props){
    super(props);
    this.state ={
      categories:[],
      ProductDetails:[],
      categoryName:''
    };
  }
       

 
  componentDidMount=()=>{
    console.log(this.props)
    axios.get(`https://backend-webapi20191102020215.azurewebsites.net/api/products/${this.props.location.id}`)
    .then(response=>{
      console.log("response.data")
      this.setState({ProductDetails:response.data});
    })
    .catch(err=>{
      console.log(err)
    })

    axios.get(`https://backend-webapi20191102020215.azurewebsites.net/api/categories`)
    .then(response=>{
      this.setState({categories:response.data});

      for(let i=0; i = response.data.length; i++){
        console.log(this.state.ProductDetails)
        if(response.data.categories[i].id === this.state.ProductDetails.categoryId){
          this.setState({categoryName: this.state.response.data.categoryName })
          break;
        }
      }

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
    axios.post('https://backend-webapi20191102020215.azurewebsites.net/api/',data)
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
    axios.update('https://backend-webapi20191102020215.azurewebsites.net/api/products',productData)
    .then(res=>{
        console.log(res);
    });
  }

render() {
  const {handleSubmit, pristine, reset, submitting}=this.props;
  console.log(this.state.categories);
      
  return (
    <div>
      <ShopViewHeader header={'edit product'} />
        <div className=" form-group">
          {/*<img source={require('../../Assets/online_store.jpg')} />*/}
          <form onSubmit={handleSubmit(this.submit)}>
            <div class="form-row" style={{marginTop: 20, marginLeft: 20}} >
            <Field name="CategoryId" component="select" style={{alignSelf:'center',borderBottomWidth: 2, borderColor: 'white', borderBottomColor:'green', marginLeft:'relative',height:37,width:"100%"}} label="category" 
                validate={[required]}value1={this.state.categoryName}
              >
                    <option value=''>{this.state.categoryName}</option>
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
                value1={this.state.ProductDetails.name}
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
                validate={[required, isValidPrice]}
              />
              <Field
                name="Discount"
                type="text"
                component={renderField2}
                label="Discount"
                value1={this.state.ProductDetails.discount}
                validate={[required, isDigit]}
              />
              <Field
                name="Quantity"
                type="text"
                component={renderField2}
                label="Quantity"
                value1={this.state.ProductDetails.quantity}
                validate={[required, isInteger]}
              />
              <div className='col'>
                <label htmlFor="img">Image</label>
                <UploadF />
              <div>
              <button type="submit" className="btn btn-success btn-lg-4 btn-block center-block" disabled={submitting} style={{color: 'white', borderRadius: 0, backgroundColor: 'green', marginTop: 10}}>SAVE CHANGES</button>  
            </div>  
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
