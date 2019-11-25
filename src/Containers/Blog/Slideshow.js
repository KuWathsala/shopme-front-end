import SwiftSlider from 'react-swift-slider'
import React, { Component } from 'react';

const img=[
    {'id':"1",'src':"/image/img1.jpg"},
    {'id':'2','src':'/image/background.jpg'},
    {'id':'3','src':'/image/img2.jpg'},
    // {'id':'4','src':'/image/colombo.jpg'},
    {'id':'5','src':'/image/img3.jpg'},

];

class Image extends Component{
    render(){
        return(
            <div style={{height:'100%',width:'100%',paddingBottom:50,marginTop:'4%', opacity: 1}}>
                <SwiftSlider data={img} height={450}/>
            </div>
        );
    }
}

export default Image