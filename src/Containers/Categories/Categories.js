import React from 'react';
import Select from 'react-select';
import  '../../bootstrap-4.0.0-dist/css/bootstrap.min.css';

const items=[
    {label: "Household",value:"household"},
    {label: "Electronics",value:"electronics"},
    {label: "Dairy Products",value:"dairy"},
    {label: "Meat Products",value:"meat"},
];

const categories =() =>{
    return(
       <div className="form-control" width="200px" opacity="1">
        <Select options={items}> Select Category</Select>
      
       </div>)
};


export default categories;