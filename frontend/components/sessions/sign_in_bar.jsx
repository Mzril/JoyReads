import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
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
    let loginError = "";
    if(this.props.errors.indexOf("Invalid Email/Password") !== -1 ){
      loginError = "*Invalid Email/Password*";
    }
    return (
      <div className="signup-mainbar">
        <div className="signup-mainbar-component">
          <Link to="/" style={{ textDecoration: 'none' }}><span className="sign-in-text joy">joy</span>
          <span className="sign-in-text reads">Reads</span></Link>
        </div>
        <div className="signup-mainbar-component">
          <div className="session-errors login">{loginError}</div>
          <div className="form-errors-container">
            <form onSubmit={this.handleSubmit} className="signup-form" >
              <input className="signup-form-input" type="text" onChange={this.updateEmail} placeholder="Email Address" value={this.state.email}/>
              <input className="signup-form-input" type="password" onChange={this.updatePassword} placeholder="Password" value={this.state.password}/>
              <input className="sign-in-button" type="submit" value="Sign In"/>
            </form>
          </div>
        </div>
      </div>
    );
  }
}


const mSP = (state) => {
  return {
    errors: state.errors.session
  };
};

const mDP = (dispatch) => {
  return {
    signin: (user) => dispatch(login(user))
  };
};

export default connect(mSP, mDP)(SignInBar);
