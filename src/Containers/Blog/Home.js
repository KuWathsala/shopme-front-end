import React from 'react';
import './Blog.css';
import Secondtab from './secondtab';
import Slideshow from '../Blog/Slideshow';



const home =() =>{
    return(
    <div>
            <Secondtab/>
           {/*<Thirdtab/>*/} 
            <Slideshow/>
    </div>
    )
};


export default home;