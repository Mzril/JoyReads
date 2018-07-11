import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';


class Bookshelf extends React.Component {
  

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

export default connect(mSP, mDP)(Bookshelf);
