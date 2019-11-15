import React,{Component,Fragment} from 'react';
import axios from 'axios';
import InventoryColumnTitles from './IncentoryColumn'
import ShopProducts from './ShopProducts';
import {store} from '../../index';
import '../Signup/Signup.css';
import ShopViewHeader from './ShopViewHeader';
import Spinner from '../../Containers/Spinner/Spinner_2';

class OrderQueue extends Component{
    state={
        shopProduct:[],
        loading:false,
    };

    componentDidMount(){
        this.setState({loading:true});
        axios.get(`https://backend-webapi20191102020215.azurewebsites.net/api/products/getproductsbyshop/${store.getState().auth.userId}`)
            .then(response=>{
                this.setState({shopProduct:response.data,loading:false})
        })
        .catch(error=>{
            this.setState({loading:false});
        })
    }

    render(){
        const myProducts=this.state.shopProduct.map(product=>{
            return <ShopProducts value={product} id={product.id} name={product.name} description={product.description} 
                        price={product.unitPrice} quantity={product.quantity} img={product.image} discount={product.discount}
                />
             });
        if(this.state.loading)
             return <Spinner />  
        else
            return(
                <div>
                    <ShopViewHeader header={"my inventory"} />
                    <section>
                        <Fragment>
                            <InventoryColumnTitles /> 
                            {myProducts}                     
                        </Fragment>
                    </section>
                </div>
            );
    };
}
export default OrderQueue;