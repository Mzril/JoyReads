import React from 'react';
import {Link, Route, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

class ContentHeader extends React.Component{

   constructor(){
     super();
     this.bigtext = this.bigtext.bind(this);
   }

   bigtext(){
     let bigtext;
     if(this.props.location.pathname === "/home"){
       bigtext = <Link to="/books" className="main-header-link">Featured Books</Link>;
     }
     else if(this.props.match.params.bookshelfId){
       const {bookshelfId} = this.props.match.params;
       bigtext = <Link to="/books" className="main-header-link">{this.props.bookshelves[bookshelfId].title}</Link>;
     } else if (this.props.user){
       bigtext = <Link to="/books" className="main-header-link">{this.props.user.username}'s books'</Link>;
     }else if(this.props.currentUser){
       bigtext = <Link to="/books" className="main-header-link">Behold Your Books (Good taste)</Link>;
     }
     else{
       bigtext = <Link to="/books" className="main-header-link">Recently Added</Link>;
     }
     return bigtext;
   }

  render(){
    return (
      <div className="content-header">
        {this.bigtext()}
        <div className="display-option">
          <button disabled>Classic</button>
          <button disabled>Modern</button>
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
    user: user,
    bookshelves: state.entities.bookshelves
  };
};

const mDP = (dispatch) => {
  return {
    logout: () => dispatch(logout())
  };
};


export default connect(mSP, mDP)(ContentHeader);
