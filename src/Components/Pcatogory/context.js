import React, { Component } from 'react';
import{storeShopes, detailShop} from '../Pcatogory/ShopData'; 
import axios from 'axios';

const ProductContext = React.createContext();
//Provider
//Consumer 
class ProductProvider extends Component {
    constructor(props){
        super(props);
        this.state={
            shopes:[],
            products:[],
            detailProduct: [],
            discription: [],
            cart: [],
            modalOpen:false,
            modalProduct: [],
            cartSubTotal:0,
            cartTotal:0,
        };
    };

    componentDidMount(){
        console.log("start")
    }

    setShops=(lat,lng)=>{
        axios.get(`https://backend-webapi20190825122524.azurewebsites.net/api/Sellers/${lat},${lng}`)
        .then(response=>{
            this.setState({shopes: response.data});
            console.log(this.state.shopes)
        })
        .catch()
    }

    getItem = sid =>{
        const shop = this.state.shopes.find(sitem => sitem.sid===sid);
        return shop;
    }

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
        const product = this.state.products.find(item => item.id===id);
        return product;
    }

    addToCart = (id, price, image, description) =>{
        const object={
            id: id,
            count: 0,
            total: 0.0,
            price: price,
            image: image, 
            description: description
        };
        this.setState({
            cart: [...this.state.cart, object]
        })
        console.log(object)
        console.log(this.state.cart)
    };

    openModal = id =>{
        const product = this.getItem(id);
        this.setState(()=>{
            return{modalProduct: product,modalOpen:true}
        })
    }

    closeModal = () =>{
        this.setState(()=>{
            return {modalOpen: false}
        });
    };

    increment =(id) =>{
        let tempCart=[...this.state.cart];
        const selectedProduct=tempCart.find(item=>item.id === id)

        const index =tempCart.indexOf(selectedProduct);
        const product =tempCart[index];

        //let price=unitPrice-unitPrice*disconnect/100

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

        if(product.count===0){
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
        let tempProducts= [...this.state.products];
        let tempCart= [...this.state.cart];

        tempCart= tempCart.filter(item=>item.id !==id);

        const index =tempProducts.indexOf(this.getItem(id));
        let removedProduct=tempProducts[index];
        removedProduct.inCart=false;
        removedProduct.count=0;
        removedProduct.total=0;

        this.setState(
            ()=>{
                return{
                    cart:[...tempCart],
                    products: [...tempProducts]
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
            //this.setProducts();
            this.addTotals();
        });
    };

    addTotals =() =>{
        let subTotal = 0;
        this.state.cart.map(item =>(subTotal +=item.total))
        const total = subTotal/*+tax */
        this.setState(()=>{
            return{
                cartSubTotal:subTotal,
                cartTotal:total
            }
        })

    }
 
    render() {
        return (
            <ProductContext.Provider value={{
                ...this.state,
                setShops: this.setShops,
                discriptionHandle: this.discriptionHandle,
                handleDetails: this.handleDetails,
                addToCart : this.addToCart,
                openModal: this.openModal,
                closeModal: this.closeModal,
                increment: this.increment,
                decrement: this.decrement,
                removeItem: this.removeItem,
                clearCart: this.clearCart

            }}>


                {this.props.children}
            </ProductContext.Provider>
        );
    }
}

const ProductConsumer=ProductContext.Consumer;
export {ProductProvider, ProductConsumer};
