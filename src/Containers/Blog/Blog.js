import React, { Component } from 'react';
import './Blog.css';
import Image from '../Blog/Image';
import Footer from './Footer';
import Firstnav from './firstnav';
import Secondtab from './secondtab';
import Thirdtab from './thirdtab';


class Blog extends Component{
   
    
    render(){
       
        return (
            <div className="container">
                <Firstnav/>
                <Secondtab/>
                <Thirdtab/>
            
                <div className="categories">
                    <p>categoriesR</p>
                </div>
            
                <div className="popular">
                    <Image/>
                </div>
                <div className="container">
                    <Footer/>
                </div>
                
            </div>
        );
}
}
export default Blog;