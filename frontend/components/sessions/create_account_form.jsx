import React from 'react';
import {connect} from 'react-redux';
import {signup} from './../../actions/session_actions';

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
    this.props.signin(user);
  }
  render() {
    return (
      <div className="create-account-form">
        <p className="bft">Meet your next favorite book.</p>
        <form onSubmit={this.handleSubmit} className="session-bar-form" >
          <input className="create-form-input" type="text" onChange={this.updateUsername} placeholder="Name" value={this.state.username}/>
          <input className="create-form-input" type="text" onChange={this.updateEmail} placeholder="Email Address" value={this.state.email}/>
          <input className="create-form-input" type="password" onChange={this.updatePassword} placeholder="Password" value={this.state.password}/>
          <input className="sign-up-button" type="submit" value="Sign up"/>
        </form>
      </div>
    );
  }
}

const mSP = (state) => {
  return {

  };
};

const mDP = (dispatch) => {
  return {
    signUp: (user) => dispatch(signup(user))
  };
};

export default connect(mSP, mDP)(CreateAccountForm);
