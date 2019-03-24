import React from 'react';
import './Blog.css';
import logo from '../../Assets/logo.png';
import Categories from '../Categories/Categories'; 

const secondtab =() =>{
    return(
    <div className="b">
        <div><img src={logo}/></div>
        
        <div><input type="text"/></div>     
         
        <div><input type="button" name="search" value="Search"/></div>
        <div className="category"><Categories/></div>      
    </div>
    )
};
export default secondtab;