import SwiftSlider from 'react-swift-slider'
import React, { Component } from 'react';

const img=[
    {'id':"1",'src':"/image/img1.jpg"},
    {'id':'2','src':'/image/img2.jpg'},
    {'id':'3','src':'/image/img3.jpg'},
    {'id':'4','src':'/image/img4.png'},
    {'id':'5','src':'/image/img5.jpg'},
    {'id':'6','src':'/image/img6.jpg'}


];

class Image extends Component{
    render(){
        return(
            <div style={{height:'100%',width:'100%',paddingBottom:50,marginTop:'5%'}}>
                <SwiftSlider data={img} height={460}/>
            </div>
        );
    }
}

export default Image