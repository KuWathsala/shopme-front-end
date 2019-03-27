import SwiftSlider from 'react-swift-slider'
import React, { Component } from 'react';
import './Blog.css';

const img=[
    {'id':"1",'src':"/image/img1.jpg"},
    {'id':'2','src':'/image/img2.jpg'},
    {'id':'3','src':'/image/img3.jpg'},
    {'id':'4','src':'/image/img4.png'},
    {'id':'5','src':'/image/img5.jpg'}

];

class Image extends Component{
    render(){
        return(
            <div className="slide">
                <SwiftSlider data={img}/>
            </div>
        );
    }
}

export default Image