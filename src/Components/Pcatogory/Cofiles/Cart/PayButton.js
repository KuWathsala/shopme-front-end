import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
//import PayForm from './PayForm';
import PayForm from '../Cart/PayForm';
class PhButton extends Component {
    componentDidMount(){
        //console.log("total "+this.props.total)
    }
    try2=()=>{
        this.props.history.push('/PayForm');
    }

    render() {
        return (
        <div>
            <form >
                <input name="submit" type="image" src="https://www.payhere.lk/downloads/images/pay_with_payhere.png"
                style={{width:"150px"}} value="Buy Now"  onClick={this.try2}/>
            </form>
        </div>
        );
    }
}
export default withRouter(PhButton);

