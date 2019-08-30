import React,{Component} from 'react';
import axios from 'axios';
import {withRouter} from'react-router-dom';

// state={
//     pro:[]
// }



class ShopProducts extends Component{

editProduct=()=>{
    this.props.history.push('/updateProduct'); 
};

deleteProduct=()=>{
    console.log('Delete')
    axios.delete(`https://backend-webapi20190825122524.azurewebsites.net/api/products/getproductsbyshop/${this.props.id}`)
    .then(response=>{
        console.log(response);
    });
};

render(){
    // const OrderI=this.props.Items.map(item=>{
    //     return <Product product={item.product} quantity={item.quantity}/>
    // });
        console.log(this.props.img);
        return (
        <div className="container-fluid text-center d-none d-lg-block">
            <div className="row">
            <div className="col-12 col-md-2 col-lg-2 col-sm-2">
                <p className="text-uppercase">
                <img src={this.props.img} alt="product" className="card-img-top"  height="60px" width="80px"/>
                
                </p> 
                </div>

                <div className="col-12 col-md-1 col-lg-1 col-sm-1">
                <p className="text-uppercase">
                    {this.props.id}
                </p> 
                </div>

                <div className="col-12 col-md-2 col-lg-2 col-sm-2">
                <p className="text-uppercase">
                    {this.props.name}
                </p>
                </div>

                <div className="col-12 col-md-3 col-lg-3 col-sm-3">
                <p className="text-uppercase">
                    {this.props.description}
                </p>
                </div>

                <div className="col-12 col-md-1 col-lg-1 col-sm-1">
                <p className="text-uppercase">
                    {this.props.price}
                </p>
                </div>

                <div className="col-12 col-md-1 col-lg-1 col-sm-1">
                <p className="text-uppercase">
                    {this.props.quantity}
                </p>
                </div>

            <div className="col-12 col-md-2 col-lg-2 col-sm-2">
                <div className="d-flex justify-content-center" style={{alignSelf:'center',paddingLeft:'35%'}}> 
                    <div className='row'>
                        <button type="button" className="btn btn-success" onClick={this.editProduct} >Edit</button>
                        <p style={{marginLeft:15,marginTop:5, color:'red'}} onClick={this.deleteProduct}><span class="glyphicon glyphicon-trash"></span></p>
                    </div>
                </div>
            </div>
            </div>
            <hr/>
        </div>
        );    
    }  
}
export default withRouter(ShopProducts);


