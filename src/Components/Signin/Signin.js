import React from 'react';
import './signin.css';

export default class Signin extends React.Component {
    //displayName = Signin.name

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();
        const data = new FormData(e.target);

        // PUT request for Edit employee.
        //if (this.state.empData.employeeId) {2
        //    fetch('api/Employee/Edit', {
        //        method: 'PUT',
        //        body: data,

        //    }).then((response) => response.json())
        //        .then((responseJson) => {
        //            this.props.history.push("/fetchemployee");
        //        })
        //}

        // POST request for Add employee.
        //else {
            fetch('api/addProduct/create', {
                method: 'POST',
                body: data,

            }).then((response) => response.json())
                .then((responseJson) => {
                    this.props.history.push("/fetchAddProduct");
            
                })
    }

    
    // This will handle Cancel button click event.
    handleCancel(e) {
        e.preventDefault();
        this.props.history.push("/fetch");
    }

    render() {
        const { email } = this.state;
        const { password } = this.state;

        return (
            <div className="sign">
            <div className="col-md-15 ol-md-offset-3">
                <h3>Sign in</h3>
                <form className="pure-form" name="signUp" onSubmit={this.handleSubmit}>

                    <div className="form-group">
                        <label htmlFor="email" className="col-form-label">email</label>
                        <input type="email" className="form-control" name="email" value={email} onChange={this.handleChange} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password" className="col-form-label">password</label>
                        <input type="password" className="form-control" name="password" value={password} onChange={this.handleChange} />
                    </div>

                    <button variant="primary" type="submit" className="btn btn-primary">Sign in</button>
                </form>
            </div>
        </div>
        );
    }
}