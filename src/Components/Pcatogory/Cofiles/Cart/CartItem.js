import React from 'react';

export default function CartItem({item,value}) {
    console.log("item")
  const {id,image,name, price,count,total}=item;
  const{increment,decrement,removeItem} =value;  
        return (
        <div className="row my-2 text-capitalize text-center">
        <div className="col-10 mx-auto col-lg-2">
        <img
        src={image}
        style={{width:"6rem", height :"6rem"}}
        className="img-fluid"
        alt="product"
        /><br/><br/>
        </div>

<div className="col-10 mx-auto col-lg-2">
<span className="d-lg-none"></span>
{name} 

</div>

<div className="col-10 mx-auto col-lg-2">
<span className="d-lg-none">price : </span>
{price}
</div>

<div className="col-10 mx-auto col-lg-2 my-2 my-lg-0">
<div className="d-flex justify-content-center">
<div>
    <span className="btn btn-black mx-1" onClick={()=>decrement(id)}>-</span>
    <span className="btn btn-black mx-1">{count}</span>
    <span className="btn btn-black mx-1" onClick={()=>increment(id)}>+</span>
</div>
</div>
</div>
{/* */}

<div className="col-10 mx-auto col-lg-2">
<div className="cart-icon" onClick={()=>removeItem(id)}>
<span class="glyphicon glyphicon-trash" color="gold"></span>


</div>
</div>

<div className="col-10 mx-auto col-lg-2">
LKR {total}
</div>

        </div>
        );
    }


