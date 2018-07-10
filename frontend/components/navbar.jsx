import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {logout} from './../actions/session_actions';

class Navbar extends React.Component {

  constructor(props){
    super(props);
    this.handleClick=this.handleClick.bind(this);
  }

  handleClick(){
    this.props.logout();
  }

  render() {
    let navbuttons;
    if(!this.props.currentUser) {
      navbuttons = (<div className="nav-buttons">
                    <Link to="/">Sign Up</Link>
                    <Link to="/">Log In</Link>
                    </div>);
    } else {
      navbuttons = (<div>
                      <p>{this.props.currentUser.username}</p>
                      <button onClick={this.handleClick}>Log Out</button>
                    </div>);
    }
    return (
      <div className="nav-bar">
        <span className="nav-logo">Joyreads</span>
        <input type="text" placeholder="Search books"/>
        {navbuttons}
      </div>
    );
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
    logout: () => dispatch(logout())
  };
};


export default connect(mSP, mDP)(Navbar);
