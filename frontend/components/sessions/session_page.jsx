import React from 'react';
import SignInBar from './sign_in_bar';
import CreateAccountForm from "./create_account_form";

class SessionPage extends React.Component{

  render(){
    return (
      <div className="home-login">
        <div className="sign-in-header">
          <SignInBar/>
          <CreateAccountForm/>
        </div>
      </div>
    );
  }
}


export default SessionPage;
