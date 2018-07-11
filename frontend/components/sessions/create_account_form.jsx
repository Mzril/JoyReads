import React from 'react';
import {connect} from 'react-redux';
import {signup, login} from './../../actions/session_actions';
import { Redirect } from 'react-router-dom';

class CreateAccountForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      username: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
    this.updateEmail = this.updateEmail.bind(this);
    this.updateUsername = this.updateUsername.bind(this);
    this.demologin=this.demologin.bind(this);
  }

  updateUsername(e){
    this.setState({username: e.currentTarget.value});
  }

  updateEmail(e){
    this.setState({email: e.currentTarget.value});
  }

  updatePassword(e){
    this.setState({password: e.currentTarget.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = Object.assign( {}, this.state);
    this.props.signUp(user);
  }

  demologin() {
    this.props.login();
  }

  render() {
    if(this.props.currentUser!==null){
      return <Redirect to="/books"/>;
    }else{
      return(
        <div className="create-account-form">
          <img className="slogan" src="/assets/slogan.png"/>
          <form onSubmit={this.handleSubmit} className="session-bar-form" >
            <h2 className="thin-text">New here? Create a free account!</h2>
            <input className="create-form-input" type="text" onChange={this.updateUsername} placeholder="Name" value={this.state.username}/>
            <input className="create-form-input" type="text" onChange={this.updateEmail} placeholder="Email Address" value={this.state.email}/>
            <input className="create-form-input" type="password" onChange={this.updatePassword} placeholder="Password" value={this.state.password}/>
            <div className= "bottom-buttons">
              <input className="session-button" type="submit" value="Sign up"/>
              <span onClick={this.demologin} className="session-button">Demo</span>
            </div>
          </form>
        </div>
      );
    }
  }
}

const mSP = (state) => {
  let currentUser;
  if(state.session.currentUserId!==null){
    currentUser = state.entities.users[state.session.currentUserId];
  }else {
    currentUser = null;
  }
  return {
    currentUser : currentUser
  };
};


const mDP = (dispatch) => {
  return {
    signUp: (user) => dispatch(signup(user)),
    login: ()=> dispatch(login({email: "wnbs36@gmail.com", password: "password1"}))
  };
};

export default connect(mSP, mDP)(CreateAccountForm);
