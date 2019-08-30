import React, { Component } from 'react';


class InventoryColumn extends Component {
    render() {
        return (
            <div className="container-fluid text-center d-none d-lg-block">
                <div className="row">
                
                <div className="col-12 col-md-2 col-lg-2 col-sm-2">
                <p className="text-uppercase" style={{backgroundColor:'gold'}}>
                    Image
                </p> 
                <hr/>
                </div>

                <div className="col-12 col-md-1 col-lg-1 col-sm-1" >
                <p className="text-uppercase" style={{backgroundColor:'gold'}}>
                    Product Id
                </p> 
                <hr/>
                </div>

                <div className="col-12 col-md-2 col-lg-2 col-sm-2">
                <p className="text-uppercase" style={{backgroundColor:'gold'}}>
                    Product Name
                </p>
                <hr/>
                </div>

                <div className="col-12 col-md-3 col-lg-3 col-sm-3">
                <p className="text-uppercase" style={{backgroundColor:'gold'}}>
                    Description
                </p>
                <hr/>
                </div>

                <div className="col-12 col-md-1 col-lg-1 col-sm-1">
                <p className="text-uppercase" style={{backgroundColor:'gold'}}>
                    Unit Price
                </p>
                <hr/>
                </div>

                <div className="col-12 col-md-1 col-lg-1 col-sm-1">
                <p className="text-uppercase" style={{backgroundColor:'gold'}}>
                    Quantity
                </p>
                <hr/>
                </div>

                <div className="col-12 col-md-2 col-lg-2 col-sm-2">
                <p className="text-uppercase" style={{backgroundColor:'gold'}}>
                    Actions
                </p>
                <hr/>
                </div>
            </div>
            </div>
        );
    }
}

export default InventoryColumn;