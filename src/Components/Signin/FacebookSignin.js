import React from 'react';
import FacebookLogin from 'react-facebook-login';
//import '../../Assets/fb.svg';
import '../SignIn/SignIn.css';

export default class FacebookSignin extends React.Component {
    displayName = FacebookSignin.name

    constructor(props) {
        super(props);

        this.state = {
            isSignin: false,
            name: '',
            email: '',
            picture: ''
        }
    }
    
    responseFacebook= response => {
        console.log(response);
        this.setState({
            isSignin: true,
            name: response.name,
            email: response.email
        });
    }
 
    render() {
        let fbContent;
        if(this.state.isSignin=false){
            fbContent=(
                <div style={{
                    width: '800px',
                    margin: 'auto',
                    background: '#f4f4f4',
                    padding:'20px'
                }}>
                    {/*<img src={this.state.picture} alt={this.state.anme} />
                    <h2>welcome {this.state.name}</h2>
                    Email:{this.state.address}*/}
                </div>
            );
        }else{
             fbContent=(  
                <FacebookLogin
                    appId="355986671675437"
                    autoLoad={true}
                    textButton="sign in with Facebook"
                    fields="name,email,picture,address"
                    size="small"
                    cssClass="loginBtn loginBtn--facebook"
                    callback={this.responseFacebook} 
                />
             );
        }
        return (
            <div>
                {fbContent}
            </div>
        );
    }
}