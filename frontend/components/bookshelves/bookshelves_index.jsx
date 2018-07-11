import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {fetchBookshelves} from './../../actions/bookshelf_actions';

class BookshelvesIndex extends React.Component {

  componentDidMount(){
    if(this.props.user!=={}){
      this.props.fetchBookshelves(this.props.user);
    }
  }

  render () {
    let shelves = "";
    let bookshelfIds = this.props.user.bookshelf_ids;
    let bookshelves = this.props.bookshelves;
    if(bookshelfIds && bookshelves[bookshelfIds[0]]){
      shelves = bookshelfIds.map(id => <li key={id}>{bookshelves[id].title}</li>);
    }
    return (<div className="user-shelf-index">
              {shelves}
            </div>);
  }
}

const mSP = (state, ownProps)=>{
  let user;
  if(ownProps.user){
    user = ownProps.user;
  } else if(state.session.currentUserId){
    user = state.entities.users[state.session.currentUserId];
  } else {
    user = {};
  }
  return {
    user: user,
    bookshelves: state.entities.bookshelves
  };
};

const mDP = (dispatch, ownProps)=>{
  return {
    fetchBookshelves: (user)=> dispatch(fetchBookshelves(user))
  };
};


export default connect(mSP, mDP)(BookshelvesIndex);
