import React from 'react';
import './Blog.css';
import Secondtab from './secondtab';
import Thirdtab from './thirdtab';
import Footer from './Footer';
import Slideshow from '../Blog/Slideshow';


const home =() =>{
    return(
    <div className="container">
            <Secondtab/>
           {/*<Thirdtab/>*/} 
            <Slideshow/>
            <div className="categories">
                 <p>categoriesR</p>
            </div>
            
            <div className="popular">
                 
             </div>
    </div>
    )
};

export default home;