import React from 'react';
import {Link} from 'react-router-dom';
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
                            <li>
                                Follow us on
                            </li>   
                    </div>
                    <div className="col-4 col-sm-4 col-md-4"> 
                        <div><Link to='/'>About ShopMe</Link></div>
                        <div><Link to='/'>Become a Delivery Partner</Link></div>
                        <div><Link to='/'>Become a Shop Partner</Link></div>    
                    </div>
                    
                    <div className="col-4 col-sm-4 col-md-4">
                        <div><Link to='/'>See all cities</Link></div>
                        <div><Link to='/'>Pricing</Link></div>
                        <div><Link to='/'>Help</Link></div>
                        <div><Link to='/'>FAQs</Link></div>
                        <div><Link to='/'>Blog</Link></div> 
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