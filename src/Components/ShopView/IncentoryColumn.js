import React, { Component } from 'react';


class InventoryColumn extends Component {
    render() {
        return (
            <div style={{alignContent: 'center'}}>
                <table class="table table-bordered " style={{fontFamily: 'Calibri Light', fontSize: 17,fontWeight: 'normal', backgroundColor: 'green', color: 'white', }} >
                    <thead>
                        <tr>
                        <th class="col-xs-2 col-lg-2 center-block">image</th>
                        <th class="col-xs-1 col-lg-1 center-block">product id</th>
                        <th class="col-xs-2 col-lg-2 center-block">Product name</th>
                        <th class="col-xs-2 col-lg-2 center-block">description</th>
                        <th scope="col-xs-1 col-lg-1 center-block">unit price LKR</th>
                        <th class="col-xs-1 col-lg-1 center-block">quantity</th>
                        <th class="col-xs-2 col-lg-2 center-block">actions</th>
                        </tr>
                    </thead>
                </table>
            </div>
        );
    }
}

export default InventoryColumn;