import React from 'react';
import Row from'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default class Signup extends React.Component {
    //displayName = Signup.name

    constructor(props) {
        super(props);

        this.state = {
            FirstName: '',
            LastName: '',
            email: '',
            password: '',
            confirmPassword: '',
            addressLine1: '',
            addressLine2: '',
            city: '',
            zipCode:''
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
/*
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
        //else {*/
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
        
        const { firstName } = this.state;
        const { lastName } = this.state;
        const { email } = this.state;
        const { password } = this.state;
        const { confirmPassword } = this.state;
        const { addressLine1 } = this.state;
        const { addressLine2 } = this.state;
        const { city } = this.state;
        const { zipCode } = this.state;

        return (
            <div className="sign">
                <div className="col-md-6 ol-md-offset-3">
                    <h3>Sign Up</h3>
                    <form className="pure-form" name="signUp" onSubmit={this.handleSubmit}>
                        
                    
                            
                                <div className="form-group">
                                    <label htmlFor="firstName" className="col-form-label">First Name</label>
                                    <input type="text" className="form-control" name="firstName" value={firstName} onChange={this.handleChange} />
                                
                                </div>
                        
                            
                                <div className="form-group">
                                    <label htmlFor="lastName" className="col-form-label">Last Name</label>
                                    <input type="text" className="form-control" name="lastName" value={lastName} onChange={this.handleChange} />
                                    
                                </div>
                            
                        
                        

                        <div className="form-group">
                            <label htmlFor="email" className="col-form-label">email</label>
                            <input type="email" className="form-control" name="email" value={email} onChange={this.handleChange} />
                        
                        </div>

                    
                            
                                <div className="form-group">
                                    <label htmlFor="password" className="col-form-label">password</label>
                                    <input type="password" className="form-control" name="password" value={password} onChange={this.handleChange} />

                                </div>
                            
                        
                                <div className="form-group">
                                    <label htmlFor="comfirmPassword" className="col-form-label">Confirm Password</label>
                                    <input type="password" className="form-control" name="confirmPassword" value={confirmPassword} onChange={this.handleChange} />

                                </div>
                            
                        

                        <br/>

                        
                            
                                <div className="form-group">
                                    <label htmlFor="addressLine1" className="col-form-label">address Line1</label>
                                    <input type="text" className="form-control" name="addressLine1" value={addressLine1} onChange={this.handleChange} />
                                </div>
                            
                        
                                <div className="form-group">
                                    <label htmlFor="addressLine2" className="col-form-label">address Line2</label>
                                    <input type="text" className="form-control" name="addressLine2" value={addressLine2} onChange={this.handleChange} />
                                </div>
                        
                            
                                <div className="form-group">
                                    <label htmlFor="city" className="col-form-label">City</label>
                                    <input type="text" className="form-control" name="city" value={city} onChange={this.handleChange} />

                                </div>
                            
                        
                                    <div className="form-group">
                                    <label htmlFor="zipCode" className="col-form-label">Zip Code</label>
                                    <input type="text" className="form-control" name="zipCode" value={zipCode} onChange={this.handleChange} />
                                </div>
                            
                        
                        <button variant="primary" type="submit" className="btn btn-primary">Submit</button>

    
                    </form>
                </div>
            </div>
        );
    }
}