import React from 'react';
import Select from 'react-select';
import './Categories.css';
import  '../../bootstrap-4.0.0-dist/css/bootstrap.min.css';

const items=[
    {label: "Household",value:"household"},
    {label: "Electronics",value:"electronics"},
];

const categories =() =>{
    return(
       <div className="catagory">
        <Select options={items}/> 
      
       </div>)
};


export default categories;