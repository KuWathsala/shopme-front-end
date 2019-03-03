import React from 'react';
import './Blog.css';

const footer =() =>{
    return(
        <div className= "footer">
                <table>
                    <tr>
                        <th>Shop Hypergrand</th>
                        <th>Customer Serivices</th>
                        <th>Stay Connected</th>
                    </tr>
                    <tr>
                        <td>Shop mens</td>
                        <td>Shopping Guide</td>
                        <td>Get Newsletter</td>
                        
                        
                    </tr>
                    <tr>
                        <td>Shop Women</td>
                        <td>About us</td>                        
                        <td><input type="text" value="email@example.com"/></td>
                    </tr>
                    <tr>
                        <td>Shop Locations</td>
                        <td>FAQ</td>
                        
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                </table>
                    <div><p>©ShopMe  | CodEye Cooperation</p></div>
        </div>
    )
};

export default footer;