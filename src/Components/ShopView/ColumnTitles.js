import React, { Component } from 'react';


class CartColumns extends Component {
    render() {
        return (
            <div style={{alignContent: 'center'}}>
            <table class="table table-bordered " style={{fontFamily: 'Calibri Light', fontSize: 17,fontWeight: 'normal', backgroundColor: 'green', color: 'white', }} >
                <thead>
                    <tr>
                    <th class="col-xs-1 center-block">order id</th>
                    <th class="col-xs-1 center-block">date/time</th>
                    <th scope="col_3 center-block">ordered items</th>
                    <th class="col-xs-1 center-block">price LKR</th>
                    <th class="col-xs-2 center-block">confirm order</th>
                    </tr>
                </thead>
            </table>
            </div>
        );
    }
}

export default CartColumns;