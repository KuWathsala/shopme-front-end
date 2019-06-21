import React, { Component } from 'react';
import axios from 'axios';

class Items extends Component{
    state={
        itemName:'',
        quantity:'',
        price:''    
    }

    postDatahandeler(){
        const post={
            itemName:this.state.itemName,
            quantity:this.state.quantity,
            price:this.state.price
        };
        axios.post('https://localhost:44337/api/',post)
    .then(response=>{
        console.log(response);
    });
 }
    
    render(){
        return(
            <div>
                <nav>
                    <div className="row">
                        <div className="col">
                            <select defaultValue="Select Catagory">
                                <option>Household</option>
                                <option>Grocery</option>
                            </select>

                            <div className="form-wrapper">
                            <form>
                                <input type="text" label="item name" name="itemname"/>
                                <input type="text" label="item name" name="quantity"/>
                                <input type="text" label="item name" name="price"/>
                                <input type="submit" name="quantity" onClick={this.postDatahandeler}/>
                            </form>
                            </div>
                        
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}
export default Items;