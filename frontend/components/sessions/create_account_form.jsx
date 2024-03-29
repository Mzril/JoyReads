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
      username: "",
      currentErrors: [],
      clicked: false
    };

    this.changed = true;
    this.errorform = this.errorform.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
    this.updateEmail = this.updateEmail.bind(this);
    this.updateUsername = this.updateUsername.bind(this);
    this.demologin=this.demologin.bind(this);
  }

  updateUsername(e){
    this.changed = true;
    this.setState({username: e.currentTarget.value});
  }

  updateEmail(e){
    this.changed = true;
    this.setState({email: e.currentTarget.value});
  }

  updatePassword(e){
    this.changed = true;
    this.setState({password: e.currentTarget.value});
  }

  handleSubmit(e) {
    if(this.changed){
      e.preventDefault();
      const user = Object.assign( {}, this.state);
      this.props.signUp(user).then(()=>{},()=>this.setState({clicked:false}));
    }
  }

  handleClear(){
    this.changed = false;
    this.setState({clicked: true});
  }

  errorform(){
    const errors = this.props.errors;
    let input1 = <input className="create-form-input" type="text" onChange={this.updateUsername} placeholder="Name" value={this.state.username}/>;
    let input2 = <input className="create-form-input" type="text" onChange={this.updateEmail} placeholder="Email Address" value={this.state.email}/>;
    let input3 = <input className="create-form-input" type="password" onChange={this.updatePassword} placeholder="Password" value={this.state.password}/>;
    if(errors.includes("Password is too short (minimum is 6 characters)")){
      input3 = <input className="create-form-input error-option" type="text" onClick={this.handleClear} placeholder="Password" value="* Password is too short (min is 6 chars) *"/>;
    }
    if(errors.includes("Email can't be blank")){
      input2 = <input className="create-form-input error-option" type="text" onClick={this.handleClear} placeholder="Email Address" value="* Email can't be blank *"/>;
    }
    if(errors.includes("Email has already been taken")){
      input2 = <input className="create-form-input error-option" type="text" onClick={this.handleClear} placeholder="Email Address" value="* Email has already been taken *"/>;
    }
    if(errors.includes("Username can't be blank")){
      input1 = <input className="create-form-input error-option" type="text" onClick={this.handleClear} placeholder="Name" value="* Username can't be blank *"/>;
    }
    if(errors.includes("Username has already been taken")){
      input1 = <input className="create-form-input error-option" type="text" onClick={this.handleClear} placeholder="Name" value="* Username has already been taken *"/>;
    }
    return (<form onSubmit={this.handleSubmit} className="session-bar-form" >
              <h2 className="thin-text">New here? Create a free account!</h2>
              {input1}
                {input2}
                  {input3}
              <div className= "bottom-buttons">
                <input className="session-button" type="submit" value="Sign up"/>
                <span onClick={this.demologin} className="session-button demo">Demo</span>
              </div>
            </form>
          );
  }

  demologin() {
    this.props.login();
  }

  render() {
    if(this.props.currentUser!==null){
      return <Redirect to="/books"/>;
    }else{
      let form;
      if(this.props.errors.length > 0 && !this.state.clicked){
        form = this.errorform();
      }else{
        form = (<form onSubmit={this.handleSubmit} className="session-bar-form" >
                  <h2 className="thin-text">New here? Create a free account!</h2>
                  <input className="create-form-input" type="text" onChange={this.updateUsername} placeholder="Name" value={this.state.username}/>
                  <input className="create-form-input" type="text" onChange={this.updateEmail} placeholder="Email Address" value={this.state.email}/>
                  <input className="create-form-input" type="password" onChange={this.updatePassword} placeholder="Password" value={this.state.password}/>
                  <div className= "bottom-buttons">
                    <input className="session-button" type="submit" value="Sign up"/>
                    <span onClick={this.demologin} className="session-button demo">Demo</span>
                  </div>
                </form>);
      }
      return(
          <div className="create-account-form">
            <img className="slogan" src={window.sloganURL}/>
            {form}
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
  let formErrors = state.errors.session;
  formErrors = formErrors.filter((error)=>{return error !=="Invalid Email/Password";});
  return {
    currentUser : currentUser,
    errors: formErrors
  };
};


const mDP = (dispatch) => {
  return {
    signUp: (user) => dispatch(signup(user)),
    login: ()=> dispatch(login({email: "morty@gmail.com", password: "password1"}))
  };
};

export default connect(mSP, mDP)(CreateAccountForm);
