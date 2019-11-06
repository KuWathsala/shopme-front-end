import React, { Component } from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import {Link} from "react-router-dom";

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
            isCreateOrder: false,
            sellerId: 0,
            payhereButton: null
        };
    };

    handleDetails =id =>{
        console.log("handleDetails "+id)
        this.setState({sellerId: id})
        axios.get(`https://backend-webapi20191102020215.azurewebsites.net/api/products/GetProductsByShop/${id}`)
        .then(response=>{
            console.log(response)
            this.setState({detailProduct: response.data});
            console.log(this.state.detailProduct)
        })
        .catch()
    };

    discriptionHandle=id=>{
        console.log("productDetails")
        axios.get(`https://backend-webapi20191102020215.azurewebsites.net/api/products/${id}`)
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
            count: 1,
            total: price,
            price: price,
            image: image, 
            name: name,
        };

        let tempTotal=this.state.cartTotal;
        this.setState({cartTotal: tempTotal+ price})

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
        
        //if(object.count===0)
          //  this.increment(object.id);
            
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

        

        //if(product.count===0 || product.count<0){
          //  this.removeItem(id)
        //}
        if(product.count!=1){
            product.count=product.count-1;
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
            return{cart:[], isCreateOrder: false, payhereButton: null};
        },()=>{
           
            this.addTotals();
        });
    };

    createOrder=()=> {
        this.setState({isCreateOrder: false})
        console.log("this.props")
        //create order
        let itemList= [];

        for(let i = 0; i < this.state.cart.length; i++){
            let item= {
                productId: this.state.cart[i].id,
                Quantity:  this.state.cart[i].count,
            } 
            itemList=[...itemList, item];
        }

        const order= {
            customerId: parseInt(localStorage.getItem('userId')),
            customerLatitude: this.props.location.latValue,
            customerLongitude: this.props.location.latValue,
            sellerId: this.state.sellerId,
            status: "to be confirmed",
            items: itemList
        }

        console.log("order")
        console.log(order)

        axios.post('https://backend-webapi20191102020215.azurewebsites.net/api/orders/createNewOrder', order) //https://backend-webapi20190825122524.azurewebsites.net/api/orders/createNewOrder${order}
        .then(response=>{
            let orderId=response.data.id;
            console.log(response.data.sellerId, response.data.id)
            this.setState({isCreateOrder: true, })

            axios.get(`https://backend-webapi20191102020215.azurewebsites.net/api/sellers/${response.data.sellerId}`) //https://backend-webapi20190825122524.azurewebsites.net/api/orders/createNewOrder${order}
            .then(response=>{
                console.log("merchantId  "+response.data.accountNo)
                this.setState({
                    payhereButton: <form method="post" action="https://sandbox.payhere.lk/pay/checkout?return_url=https://localhost:3000&cancel_url=https://localhost:3000&items=xxxx&currency=LKR&&first_name=xxxx&last_name=xxxx&email=xxxx&phone=xxxx&address=xxxx&city=xxxx&country=SriLanka&notify_url=https://backend-webapi20191102020215.azurewebsites.net/api/orders/update-payment"> 
                            <input name="submit" type="image" src="https://www.payhere.lk/downloads/images/pay_with_payhere.png"
                                style={{width:"150px"}} value="Buy Now" // onClick={this.try2}
                            />
                            <input type="hidden" name="merchant_id" value={response.data.accountNo}/>
                            <input type="text" name="order_id" value={orderId}  />
                            <input type="text" name="amount" value={this.state.cartTotal}/>
                        </form>
                });
            }) 
            .catch (error=>{
                console.log(error);
            })
        }) 
        .catch (error=>{
            console.log(error);
            this.setState({isCreateOrder: false})
            alert("orderCreate is failed")
        })
    }


    test=()=>{
        //request.open('POST',  `https://sandbox.payhere.lk/pay/checkout?merchant_id=1213071&return_url=https://localhost:3000&cancel_url=https://localhost:3000&order_id=64&items=xxxx&currency=LKR&amount=114&first_name=wathsala&last_name=danthasinghe&email=wathdanthasinghe@gmail.com&phone=0716325124&address=Galle&city=Galle&country=SriLanka&notify_url=https://backend-webapi20191102020215.azurewebsites.net/api/orders/update-payment`, true);
        console.log("test...............") 
    }

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
                removeItem: this.removeItem,
                test: this.test,
                createOrder: this.createOrder
            }}>


                {this.props.children}
            </ProductContext.Provider>
        );
    }
}

const mapStateToProps=state=>{
    return {
      location: state.location
    };
  }
  
connect(mapStateToProps,{})(ProductProvider);


const ProductConsumer=ProductContext.Consumer;
export {ProductProvider, ProductConsumer};


