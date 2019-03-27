import React from 'react';
import './Blog.css';
import logo from '../../Assets/logo.png';
import Categories from '../Categories/Categories'; 

const secondtab =() =>{
    return(
    <div className="b">
        <nav>
            <ul>
                <div className='form-control'>
                    <li><div><img src={logo}/></div></li>      
                    <li><div><input type="text" className='form-control'/></div> </li>
                    <li><div><input type="button" name="search" value="Search"/></div></li>
                   
                </div>
                <div className="category" ><Categories/></div>
            </ul>
        </nav>
          
    </div>
    )
};
export default secondtab;