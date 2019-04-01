import React from 'react';
import './Blog.css';
import logo from '../../Assets/logo.png';
import Categories from '../Categories/Categories'; 
//import {Row} from 'react-bootstrap';

const secondtab =() =>{
    return(
    <div className="b">
        <nav>
                <div className='row'>
                <div className='col'><img src={logo}/></div>    
                <div className='col col-md-8'><input type="text" placeholder="Enter Your Address"className='form-control'/></div> 
                <div className='col btn-square btn btn-primary'><input type="button" name="search" value="Lets FInd"/></div>

                </div>
        </nav>
          
    </div>
    )
};
export default secondtab;