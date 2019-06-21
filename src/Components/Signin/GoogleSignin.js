import React from 'react';
import GoogleLogin from 'react-google-login';

export default class GoogleSignin extends React.Component {
    displayName = GoogleSignin.name

    constructor(props) {
        super(props);

        this.state = {
        }
    }
    responseGoogle= response => {
        console.log(response);
    }

    render() {
        let googleContent;
        if(this.state.isSignin){
            googleContent=null;
        }else{
             googleContent=(
                <GoogleLogin
                    appId="435928094714-4gnb2lavpv4e4j4bgc1r0hn9jr14pu4r.apps.googleusercontent.com"
                    onSuccess={this.responseGoogle}
                    onFailure={this.responseGoogle} 
                />
             );
        }
        return (
            <div>
                {googleContent}
            </div>
        );
    }
}