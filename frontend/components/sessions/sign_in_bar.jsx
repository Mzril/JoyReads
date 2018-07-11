import React from 'react';
import {connect} from 'react-redux';
import {login} from './../../actions/session_actions';

class SignInBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
    this.updateEmail = this.updateEmail.bind(this);
  }

  updatePassword(e){
    this.setState({password: e.currentTarget.value});
  }

  updateEmail(e){
    this.setState({email: e.currentTarget.value});
  }
  handleSubmit(e) {
    e.preventDefault();
    const user = Object.assign( {}, this.state);
    this.props.signin(user);
  }
  render() {
    return (
      <div className="signup-mainbar">
        <div className="signup-mainbar-component">
          <span className="nav-logo joy">Joy</span>
          <span className="nav-logo reads">Reads</span>
        </div>
        <div className="signup-mainbar-component">
          <form onSubmit={this.handleSubmit} className="signup-form" >
            <input className="signup-form-input" type="text" onChange={this.updateEmail} placeholder="Email Address" value={this.state.email}/>
            <input className="signup-form-input" type="password" onChange={this.updatePassword} placeholder="Password" value={this.state.password}/>
            <input className="sign-in-button" type="submit" value="Sign In"/>
          </form>
        </div>
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
    signin: (user) => dispatch(login(user))
  };
};

export default connect(mSP, mDP)(SignInBar);
