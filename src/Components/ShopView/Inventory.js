import React,{Component,Fragment} from 'react';
import axios from 'axios';
import InventoryColumnTitles from './IncentoryColumn'
import ShopProducts from './ShopProducts';
import {store} from '../../index';

class OrderQueue extends Component{
    state={
        shopProduct:[]
        };

    componentDidMount(){
        axios.get(`https://backend-webapi20190825122524.azurewebsites.net/api/products/getproductsbyshop/${store.getState().auth.userId}`)
            .then(response=>{
                this.setState({shopProduct:response.data})
            });
    }

    render(){
        console.log(this.state.shopProduct);
        const myProducts=this.state.shopProduct.map(product=>{
           return <ShopProducts value={product} id={product.id} name={product.name} description={product.description} 
           price={product.unitPrice} quantity={product.quantity} img={product.image}
           />
             });        
        return(
            <div>
                <div className='row'  style={{flex:1,backgroundColor:'white',textAlign:'center',fontSize:'24px',marginBottom:'5px',marginLeft:10}}>
                        {/* <img src={Img} alt="product" className="card-img-top"  height="100px" width="200px" style={{marginLeft:30}}/> */}
                        <p style={{fontSize:60,color: '#26bf63',fontWeight:'600',}}>Shop</p>
                        <p style={{fontSize:60,color: '#5189c9',fontWeight:'600',}}>Me</p>
                        <p style={{alignSelf:'flex-end',color:'darkgreen',marginBottom:25}}>Seller's Portal</p>
                    </div>
                <section>
                    <Fragment>
                        <InventoryColumnTitles/> 
                        {myProducts}                     
                    </Fragment>
                </section>
                
            </div>
            
   
        );
    };
}
export default OrderQueue;