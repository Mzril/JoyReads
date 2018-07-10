import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

class Navbar extends React.Component {

  render() {
    let navbuttons;
    if(!this.props.currentUser) {
      navbuttons = (<div className="nav-buttons">
                    <Link to="/">Sign Up</Link>
                    <Link to="/">Log In</Link>
                    </div>);
    } else {
      navbuttons = <button>{this.props.currentUser.username}</button>;
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
    currentUser = state.users[state.session.currentUserId];
  }else {
    currentUser = null;
  }
  return {
    currentUser : currentUser
  };
};

// const mDP = (state) => {
//   return {
//     user:
//   };
// };


export default connect(mSP)(Navbar);
