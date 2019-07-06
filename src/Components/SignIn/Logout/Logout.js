import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import * as actions from '../../../Stores/Actions/Index';

class Logout extends Component{
    componentDidMount(){
        this.props.OnLogout();
    }

    render(){
        return <Redirect to="/"/>;
    }
}
const mapDispatchToProps=dispatch=>{
    return{
        OnLogout:()=>dispatch(actions.logout())
    };
};

export default connect(null,mapDispatchToProps)(Logout);