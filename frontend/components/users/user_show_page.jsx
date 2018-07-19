import React from 'react';
import {Link} from 'react-router-dom';
import Dropdown from 'react-dropdown';
import {connect} from 'react-redux';
import {getUser, updateUser} from "./../../actions/user_actions";

class UserShowPage extends React.Component{

  constructor(){
    super();
    this.state = {loaded: false};
  }

  componentDidMount(){
    const that = this;
    if(this.props.loaded !== true){
      this.props.getUser(this.props.match.params.username).then(()=>{
        that.setState({loaded: true});
      });
    }else{
      that.setState({loaded: true});
      this.props.getUser(this.props.match.params.username).then(()=>{
        that.setState({loaded: true});
      });
    }
  }

  shouldComponentUpdate(nextProps){
    //update later??
    return true;
  }

  render(){
    if(!this.state.loaded){
      return <div className="user-show-page">...Loading</div>;
    }
    const{users, currentUser, userId, errors} = this.props;

    if(this.props.match.params.username === currentUser.username){
      return(
        <div className="user-show-page">
          {currentUser.username} Welcome Back!
          <div className="user-show-info">

            <div className="user-split-right">

            </div>
          </div>
        </div>
      );
    }
    return(
      <div className="user-show-page">
        {users[userId].username}
        <div className="user-show-info">

          <div className="user-split-right">

          </div>
        </div>
      </div>
    );
  }
}

const mSP = (state, ownProps)=>{
  let loaded =false;
  const userId = ownProps.userId;
  if(state.ui.visitedUsers.userId){
    loaded = true;
  }
  return {
    currentUser: state.entities.users[state.session.currentUserId],
    users: state.entities.users,
    errors: state.errors.users,
    userId: userId,
    loaded: loaded
  };
};

const mDP = (dispatch, ownProps)=>{
  return {
    getUser: (username)=>dispatch(getUser(username))
  };
};

export default connect(mSP, mDP)(UserShowPage);
