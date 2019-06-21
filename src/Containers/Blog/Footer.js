import React from 'react';
import './Blog.css';
import playstore from '../../Assets/playstore.png';
import applestore from '../../Assets/applestore.png';

const footer =() =>{
    return(
        <div className= "footer">
               <h1 style={{textAlign:"left", color:'white'}}><b>Shop Me</b></h1>
               <hr style={{paddingBlockEnd:"0px"}}/><hr/>
               <div className="row">
                    <div className="col-4 col-sm-4 col-md-4">
                        <ul>
                            <li>
                                Follow us on
                            </li>
                        </ul>
                    </div>
                    <div className="col-4 col-sm-4 col-md-4">
                        <ul>
                            <li>About ShopMe</li>
                            <li>Become a Delivery Partner</li>
                            <li>Become a Restaurant Partner</li>
                        </ul>
                    </div>
                    
                    <div className="col-4 col-sm-4 col-md-4">
                        <ul>
                            <li>See all cities</li>
                            <li>Pricing</li>
                            <li>Help</li>
                            <li>FAQs</li>
                            <li>Blog</li>
                        </ul>
                    </div>
                </div>
                    <hr/>
                    <div className="row" >
                        <div className="col" style={{paddingLeft:"40%",paddingInlineEnd:'10px'}}>
                            <a href="/"><img onClick="/" src={applestore} style={{width:"15%",borderRadius:"5px"} }></img></a>
                            <a href="/"><img onClick="/"src={playstore} style={{width:"15%"}}></img> </a>
                        </div>
                    </div> 
                    
                    <hr/> 
                
                    <div className="col" style={{paddingLeft:"40%"}}>©ShopMe  | CodEye Cooperation</div>
                    </div>
    )
};

export default footer;