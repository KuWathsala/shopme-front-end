import React,{Component} from 'react';
import axios from 'axios';
import {withRouter,Redirect} from'react-router-dom';

// state={
//     pro:[]
// }



class ShopProducts extends Component{

editProduct=()=>{
    this.props.history.push({pathname:'/updateProduct',id: this.props.id}); 
};

deleteProduct=()=>{
    console.log('Delete')
    axios.delete(`https://backend-webapi20191102020215.azurewebsites.net/api/products/${this.props.id}`)
    .then(response=>{
        console.log(response)
    });
};

render(){
        console.log(this.props.img);
        return (
            <div style={{alignContent: 'center'}}>
                <table class="table table-bordered " style={{fontFamily: 'Calibri Light', fontSize: 16, fontWeight: 'normal'}} >
                    <thead>
                        <tr>
                            <th class="col-xs-2 col-lg-2 center-block">
                                <img src={this.props.img} alt="product" style={{height: "80px", width: "160px"}} />
                            </th>
                            <th class="col-xs-1 col-lg-1 center-block">
                                <text className="center-block" >{this.props.id}</text>
                            </th>
                            <th class="col-xs-2 col-lg-2 center-block">
                                {this.props.name}
                            </th>
                            <th class="col-xs-2 col-lg-2 center-block">
                                {this.props.description}
                            </th>
                            <th scope="col-xs-1 col-lg-1 center-block">
                                {this.props.price}
                            </th>
                            <th class="col-xs-1 col-lg-1 center-block">
                                <text class="pull-right" >{this.props.quantity}</text>
                            </th>

                            <th class="col-xs-2 col-lg-2 ">
                                <button type="button" className="btn btn-success center-block" style={{color: 'white',width: 80, borderRadius: 0, backgroundColor: 'green'}} onClick={this.editProduct} >
                                    edit
                                </button>
                                <text style={{color:'red', marginTop: -5}} onClick={this.deleteProduct}>
                                    <span class="glyphicon glyphicon-trash pull-right " />
                                </text>
                            </th>

                        </tr>
                    </thead>
                </table>
            </div>
        );    
    }  
}
export default withRouter(ShopProducts);