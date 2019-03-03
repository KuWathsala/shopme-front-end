import SwiftSlider from 'react-swift-slider'
import React, { Component } from 'react';
import './Blog.css';
import logo from '../../Assets/logo.png';

const img=[
    {'id':"1",'src':"../../Assets/logo.png"},
    {'id':'2','src':'../../Assets/logo2.png'},
    {'id':'2','src':'../../Assets/logo2.png'}
];

class Image extends Component{
    render(){
        return(
            <div className="slide">
                <SwiftSlider data={img} height={400}/>
            </div>
        );
    }
}

export default Image;