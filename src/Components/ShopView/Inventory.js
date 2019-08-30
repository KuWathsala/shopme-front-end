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