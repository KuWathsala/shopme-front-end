import React, { Component } from 'react';


class Help extends Component{
    render(){
        return(
            <div>
            <div className="tit1" style={{background:'lightgray', height:60}}>
                      <h1>Support</h1>
                  
                    
                  
                 </div>
           <div className = "Help" style = {{backgroundColor:"lightgray" , opacity:'0.5',margin:'10px',
           marginLeft:'20px',color:"blue", fontSize:'20px'

           }}> 
               
               <div className="hlp" style={{color:"black", fontFamily:''}}>           
                    <b><u>for seller  </u></b>          
               </div>

               <p>      person who need to be a seller in our shop me system, They should have a payhere account.
                    you can use that link for create an account :
                                 
                                     <a href = 'https://www.payhere.lk'>https://www.payhere.lk' </a> 
                   <li>
                       <ul>
                           <li> create the payhere account </li>
                           <li>go to  the setting</li>
                           <li>copy the Merchant ID </li>
                           <li>that Merchant ID should be added as the account number, when your ShopMe Registration</li>
                       </ul>
                   </li>
                    </p>
                   
                    </div>
                   
               </div>
               /**visa-4916217501611292 */
        );
    
    }
   
 }
 export default Help;