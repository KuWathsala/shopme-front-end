import React, { Component } from 'react';

import axios from 'axios';
const ProductContext = React.createContext();

class ProductProvider extends Component {
  
    constructor(props){
        super(props);
        this.state={
            products:[],
            detailProduct: [],
            discription:[],
            cart:[],
            cartSubTotal:0,
            cartTotal:0,
        };
    };

    handleDetails =id =>{
        console.log("handleDetails "+id)
        axios.get(`https://backend-webapi20190825122524.azurewebsites.net/api/products/GetProductsByShop/${id}`)
        .then(response=>{
            console.log(response)
            this.setState({detailProduct: response.data});
            console.log(this.state.detailProduct)
        })
        .catch()
    };

    discriptionHandle=id=>{
        console.log("productDetails")
        axios.get(`https://backend-webapi20190825122524.azurewebsites.net/api/products/${id}`)
        .then(response=>{
            console.log(response.data)
            this.setState({discription: response.data});
            console.log(this.state.discription)
        })
        .catch()
    }

    getItem = id =>{
        const product = this.state.discription.find(item => item.id===id);
        return product;
       }


    

    addToCart = (id, price,image,name,total) =>{
        const object={
            id: id,
            count: 0,
            total: total,
            price: price,
            image: image, 
            name: name,
        };
        let inCart=false;
        for(let i=0; i<this.state.cart.length; i++){
            if(this.state.cart[i].id === object.id){
                inCart=true;
                break;
            }
        }
        if(inCart)
            alert("already in the cart")
        else{
            this.setState({
                cart: [...this.state.cart, object]
            })
        }
            
        console.log(object)
        console.log(this.state.cart)
    };

    addTotals =() =>{
        let subTotal = 0;
        this.state.cart.map(item =>(subTotal +=item.total))
        const total = subTotal
        this.setState(()=>{
            return{
                cartSubTotal:subTotal,
                cartTotal:total
            }
        })

    }

    increment =(id) =>{
        let tempCart=[...this.state.cart];
        const selectedProduct=tempCart.find(item=>item.id===id)

        const index =tempCart.indexOf(selectedProduct);
        const product =tempCart[index];

       product.count=product.count+1; 
        product.total =product.count*product.price;

        this.setState(
            ()=>{return {cart:[...tempCart]}},
            ()=>{this.addTotals()}
        );
    };

    decrement =(id) =>{
        let tempCart=[...this.state.cart];
        const selectedProduct=tempCart.find(item=>item.id === id)

        const index =tempCart.indexOf(selectedProduct);
        const product =tempCart[index];

        product.count=product.count-1;

        if(product.count===0 || product.count<0){
            this.removeItem(id)
        }
        else{
            product.total=product.count*product.price;

            this.setState(
                ()=>{return{cart:[...tempCart]}},
                ()=>{this.addTotals()}
            );
        }
    };

    removeItem =id =>{
       
        let index=this.state.cart.findIndex(obj => obj.id === id);
        console.log(index)
        this.state.cart.splice(index, 1);
        console.log(this.state.cart)
       
        
        this.setState(
            ()=>{
                return{
                      cart: this.state.cart.filter(i => i !== index)
                    };
                },
                ()=>{
                    this.addTotals();
            }
        );
        
    };

    
    clearCart =() =>{
        this.setState(()=> {
            return{cart:[]};
        },()=>{
           
            this.addTotals();
        });
    };

    render() {
        return (
            <ProductContext.Provider value={{
                ...this.state,
                handleDetails: this.handleDetails,
                discriptionHandle:this.discriptionHandle,
                addToCart:this.addToCart,
                clearCart:this.clearCart,
                increment: this.increment,
                decrement: this.decrement,
                removeItem: this.removeItem
            }}>


                {this.props.children}
            </ProductContext.Provider>
        );
    }
}


    const ProductConsumer=ProductContext.Consumer;
    export {ProductProvider, ProductConsumer};