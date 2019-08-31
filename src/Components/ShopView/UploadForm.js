import React, { Component } from 'react';
import "./UForm.css";
import axios from 'axios';
import { Field, reduxForm } from 'redux-form';
import {connect} from 'react-redux';
import {store} from '../../index';
import Spinner from '../../Containers/Spinner/Spinner';

const renderField = ({ input,label,type,meta: { touched, error, warning }}) => (
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

let Imgurl='';

const required=value=> value ? undefined:'Required';

const submit=(values)=> {
  let productData={
    ...values,
    Image:Imgurl,
    SellerId:store.getState().auth.userId,
  }
  console.log(productData);
  axios.post('https://backend-webapi20190825122524.azurewebsites.net/api/products/create',productData)
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
      isloading:false,
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

fileUploadHandler =(event)=>{
  this.setState({isloading:true})
  console.log(this.state.selectedFile)
  console.log('uploadingggggggg')
  const files=event.target.files
  const formData = new FormData();
  // formData.append("api_key",'195645557212827');
  formData.append("file", files[0]);
  // formData.append("public_id", "product_image");
  // formData.append("timestamp", timeStamp);
  formData.append("upload_preset", 'm0uhbhzz');
  // setLoading(true);
  //fd.append('image', this.state.selectedFile,this.state.selectedFile.name);
  axios.post('https://api.cloudinary.com/v1_1/dubnsitvx/image/upload',formData,{
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
    <div className="wrapper">
      <div className="wrapForm">
        <h1>Add Products</h1>
        <form onSubmit={handleSubmit(submit)}>
            <Field name="CategoryId" component="select" style={{alignSelf:'center',marginLeft:'relative',height:37,width:"100%"}}>
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
              {this.state.isloading ? <Spinner/> :
              <input 
                style={{backgroundColor:'white',marginBottom:15,width:400}}
                name="Image"
                type="file"
                onChange={this.fileUploadHandler}
                value={this.state.image}
                // ref={fileInput=>this.fileInput=fileInput}/>
                // <button onClick={()=>this.fileInput.click()}>Pick File</button>
                // <button onClick={this.fileUploadHandler}>upload</button>
                />      }
            <div>
              <button type="submit" className="btn btn-default" disabled={submitting} style={{alignSelf:'strech',marginLeft:'45%'}}>SUBMIT</button>  
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
