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
      navbuttons = (<div className="nav-buttons">
                      <Link to={`/users/${this.props.currentUser.id}`} >{this.props.currentUser.username}</Link>
                      <a onClick={this.handleClick}>Log Out</a>
                    </div>);
    }
    return (
      <div className="nav-bar">
        <div className="nav-bar-main">
          <div style={{display: `flex`}}>
            <Link to="/home" style={{ textDecoration: 'none' }}><span className="nav-logo joy">joy</span>
            <span className="nav-logo reads">Reads</span></Link>
            <div className="nav-buttons" >
              <Link to="/home">Home</Link>
              <Link to="/books">My Books</Link>
            </div>
          </div>
          <input className="nav-search-bar" disabled type="search" placeholder="Search books"/>
          {navbuttons}
        </div>
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
