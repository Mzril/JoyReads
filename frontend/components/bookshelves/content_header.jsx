import React from 'react';
import {Link, Route, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

class ContentHeader extends React.Component{

  render(){
    let bigtext;
    if(this.props.location.pathname === "/home"){
      bigtext = <Link to="/books" className="main-header-link">Featured Books</Link>;
    } else if (this.props.user){
      bigtext = <Link to="/books" className="main-header-link">{this.props.user.username}'s books'</Link>;
    }else if(this.props.currentUser){
      bigtext = <Link to="/books" className="main-header-link">Behold Your Books (Good taste)</Link>;
    }
    else{
      bigtext = <Link to="/books" className="main-header-link">Recently Added</Link>;
    }
    return (
      <div className="content-header">
        {bigtext}
        <div className="display-option">
          <button>Classic</button>
          <button>Modern</button>
        </div>
      </div>
    );
  }
}

const mSP = (state, ownProps) => {
  let currentUser;
  const user = ownProps.user || 0;
  if(state.session.currentUserId!==null){
    currentUser = state.entities.users[state.session.currentUserId];
  }else {
    currentUser = null;
  }
  return {
    currentUser : currentUser,
    user: user
  };
};

const mDP = (dispatch) => {
  return {
    logout: () => dispatch(logout())
  };
};


export default connect(mSP, mDP)(ContentHeader);
