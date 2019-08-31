import React, { Component } from 'react';
import axios from 'axios';

const timeStamp = Date.now()/1000;
class UploadF extends Component {
 

    state={
        selectedFile: null
    }

    fileSelectedHandler = event =>{
        console.log('filess');
        console.log(this.state.selectedFile)
        this.setState({
            selectedFile: event.target.files[0]
        })
        console.log(this.state.selectedFile)
    }

    fileUploadHandler =(event)=>{
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
            console.log(res);
        });
    }
    
    render() {
        return (
            <div>
                <input 
                //style={{display:'none'}}
                type="file" 
                onChange={this.fileUploadHandler}
                // ref={fileInput=>this.fileInput=fileInput}/>
                // <button onClick={()=>this.fileInput.click()}>Pick File</button>
                // <button onClick={this.fileUploadHandler}>upload</button>
                />
            </div>
        );
    }
}

export default UploadF;