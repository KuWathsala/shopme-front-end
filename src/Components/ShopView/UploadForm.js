import React, { Component } from 'react';
import "./UForm.css";
import axios from 'axios';
import { Field, reduxForm } from 'redux-form';
import {connect} from 'react-redux';
import {store} from '../../index';
import Spinner from '../../Containers/Spinner/Spinner';
import ShopViewHeader from './ShopViewHeader';

const renderField = ({ input,label,type,meta: { touched, error, warning }}) => (
  <div class="row-xs-4 ">
    <label htmlFor={label} class="inputsm" style={{fontFamily: 'Calibri Light', fontSize: 18, fontWeight: 'bold', marginTop: 15}} >{label}</label>
    <input class="form-control"  {...input}   type={type}  placeholder={label}
      style={{borderBottomWidth: 2, borderColor: 'white', height: 40, borderBottomColor: 'green', borderRadius: 0 }}
    />
    {touched && ((error && <span style={{color:'red',backgroundColor:'white',fontWeight:'bold'}}>{error}</span>) ||(warning && <span>{warning}</span>))}
  </div>
)

let Imgurl='';

const required=value=> value ? undefined:'required';
const isValidPrice=value=> value && !/^[1-9]+(\.[0-9]{1,2})?$/.test(value)  ? 'invalid price':undefined;
const isInteger=value=> value && !/^[1-9]*$/.test(value)   ? 'invalid quantity':undefined;
const isDigit=value=> value && !/^[0-9]$/.test(value)   ? 'invalid':undefined;


const submit=(values)=> {
  let productData={
    ...values,
    Image:Imgurl,
    SellerId:store.getState().auth.userId,
  }
  console.log(productData);
  axios.post('https://backend-webapi20191102020215.azurewebsites.net/api/products/create',productData)
  .then(res=>{
      console.log(res);
  });
}


class UploadForm extends Component {
  constructor(props){
    super(props);
    this.state ={
      img:'',
      categories:[],
      isloading: false,
    };
  }
 
componentDidMount=()=>{
  axios.get('https://backend-webapi20191102020215.azurewebsites.net/api/categories')
    .then(response=>{
      console.log(response)
      this.setState({categories:response.data});
    })
    .catch(err=>{
      console.log(err)
    })
}

fileUploadHandler =(event)=>{
  this.setState({isloading:true})
  console.log(this.state.selectedFile)
  console.log('uploadingggggggg')
  const files=event.target.files
  const formData = new FormData();
  formData.append("file", files[0]);
  formData.append("upload_preset", 'm0uhbhzz');axios.post('https://api.cloudinary.com/v1_1/dubnsitvx/image/upload',formData,{
      onUploadProgress: ProgressEvent=>{
          console.log('Upload Progress:'+Math.round(ProgressEvent.loaded / ProgressEvent.total*100 )+'%')
      }
  })
  .then(res=>{
      console.log(res.data.url)
      Imgurl=res.data.url;
      this.setState({isloading:false})})
  .catch(err=>{
    console.log(err)
  });
}

render() {
  const {handleSubmit,submitting}=this.props;        
  return (
    <div>
      <ShopViewHeader header={'add new product'} />
        <div className=" form-group">
          {/*<img source={require('../../Assets/online_store.jpg')} />*/}
          <form onSubmit={handleSubmit(submit)}>
            <div class="form-row" style={{marginTop: 20, marginLeft: 20}} >
              
              <Field name="CategoryId" component="select" style={{alignSelf:'center',borderBottomWidth: 2, borderColor: 'white', borderBottomColor:'green', marginLeft:'relative',height:37,width:"100%"}} label="category" 
                validate={[required]}
                name="Category"
              >
                  <option value=""></option>
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
                validate={[required, isValidPrice]}
              />
              <Field
                name="Quantity"
                type="text"
                component={renderField}
                label="Quantity"
                validate={[required, isInteger]}
              />
              <Field
                name="Discount"
                type="text"
                component={renderField}
                label="Discount"
                validate={[required, isDigit]}
              />
              <div className='col'>
                <label htmlFor="img">Image</label>
                {this.state.isloading ? <Spinner/> :
                <input 
                  style={{backgroundColor:'white',marginBottom:15,width:400, borderColor:'white', borderBottomColor: 'green'}}
                  name="Image"
                  type="file"
                  onChange={this.fileUploadHandler}
                  value={this.state.image}
                  />  }
              <div> 
              <button type="submit" className="btn btn-success btn-lg-4 btn-block center-block" disabled={submitting} style={{color: 'white', borderRadius: 0, backgroundColor: 'green', borderBottomWidth: 2}}>SUBMIT</button>  
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
  form: 'addProduct',
})(UploadForm))
