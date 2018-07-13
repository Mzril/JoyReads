import React from 'react';
import {Link, Route} from 'react-router-dom';
import {connect} from 'react-redux';


class ContentHeader extends React.Component{

  render(){
    let bigtext;
    if(this.props.currentUser){
      bigtext = <Link to="/books" className="main-header-link">Behold Your Books (Good taste)</Link>;
    } else{
      bigtext = <Link to="/books" className="main-header-link">Featured Books Below!</Link>;
    }
    return (
      <div className="content-header">
        {bigtext}
      </div>
    );
  }
}

const mSP = (state, ownProps) => {
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


export default connect(mSP, mDP)(ContentHeader);
