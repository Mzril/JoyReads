import React from 'react';
import {Link, Route, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {toggleView} from './../../actions/ui_actions';

class ContentHeader extends React.Component{

   constructor(){
     super();
     this.bigtext = this.bigtext.bind(this);
     this.toggleOne = this.toggleOne.bind(this);
     this.toggleZero = this.toggleZero.bind(this);
   }

   toggleOne(){
     this.props.toggleView(1);
   }

   toggleZero(){
     this.props.toggleView(0);
   }

   bigtext(){
     const {bookshelfId} = this.props.match.params;
     let bigtext;
       if(this.props.location.pathname === "/home"){
         bigtext = <Link to="/books" className="main-header-link">Featured Books</Link>;
       }else if(this.props.location.pathname === "/books/searchresults"){
         bigtext = <Link to="/books" className="main-header-link">Search Results</Link>;
       }
       else if(bookshelfId && this.props.bookshelves[bookshelfId]){
         bigtext = <Link to="/books" className="main-header-link">{this.props.bookshelves[bookshelfId].title}</Link>;
       } else if (this.props.user){
         const content = `${this.props.user.username+ "'s books"}`;
         bigtext = <Link to={`/users/${this.props.match.params.userId}/bookshelves`} className="main-header-link">{content}</Link>;
       }else if(this.props.currentUser){
         bigtext = <Link to="/books" className="main-header-link">My Books</Link>;
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
          <button onClick={this.toggleZero}>Spaced</button>
          <button onClick={this.toggleOne}>Dense</button>
        </div>
      </div>
    );
  }
}

const mSP = (state, ownProps) => {
  let currentUser;
  const user = state.entities.users[ownProps.match.params.userId] || 0;
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
    logout: () => dispatch(logout()),
    toggleView: (style)=>dispatch({type: "TOGGLE_VIEW", style: style})
  };
};


export default connect(mSP, mDP)(ContentHeader);
