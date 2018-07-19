import React from 'react';
import {Link} from 'react-router-dom';
import Dropdown from 'react-dropdown';
import {connect} from 'react-redux';
import {getUserById, getUserByUsername, updateUser} from "./../../actions/user_actions";

class UserShowPage extends React.Component{

  constructor(props){
    super(props);
    this.state = {loaded: false, viewingUserId: null};
  }
  componentDidMount(){
    const that = this;
    if(this.props.loaded !== true){
      this.props.getUserByUsername(this.props.match.params.username).then((response)=>{
        that.setState({loaded: true, viewingUserId: response.user.id});
      });
    }else{
      that.setState({loaded: true});
      this.props.getUserByUsername(this.props.match.params.username).then((response)=>{
        that.setState({loaded: true, viewingUserId: response.user.id});
      });
    }
  }

  // shouldComponentUpdate(nextProps){
  //   const{users, currentUser, userId, errors} = nextProps;
  //   if(currentUser || users){
  //     return true;
  //   }
  //   return false;
  // }

  render(){
    const{users, currentUser, userId, errors} = this.props;
    if(currentUser.id === this.state.viewingUserId){
      return(
        <div className="user-show-page">
          {currentUser.username} Welcome Back!
          <div className="user-show-info">

            <div className="user-split-right">

            </div>
          </div>
        </div>
      );
    }else if(this.state.viewingUserId){
      return(
        <div className="user-show-page">
           {`${users[this.state.viewingUserId].username}'s Profile`}
          <div className="user-show-info">
              // users[this.state.viewingUserId].bookshelf_ids.map
            <div className="user-split-right">

            </div>
          </div>
        </div>
      );
    }else if(this.props.errors.length > 0){
      return <div>404 Not Found, Are you sure you have the correct Username?</div>;
    }
    return <div className="user-show-page">...Loading</div>;
  }
}

const mSP = (state, ownProps)=>{
  let loaded =false;
  const userId = ownProps.userId;
  if(state.ui.visitedUsers.userId){
    loaded = true;
  }
  return {
    currentUser: state.entities.users[state.session.currentUserId] || {},
    users: state.entities.users,
    errors: state.errors.users,
    userId: userId,
    loaded: loaded
  };
};

const mDP = (dispatch, ownProps)=>{
  return {
    getUserByUsername: (username)=>dispatch(getUserByUsername(username)),
    getUserById: (id)=>dispatch(getUserByName(id))
  };
};

export default connect(mSP, mDP)(UserShowPage);
