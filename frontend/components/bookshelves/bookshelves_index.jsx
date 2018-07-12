import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {fetchBookshelves} from './../../actions/bookshelf_actions';

class BookshelvesIndex extends React.Component {

  render () {
    let shelves = "";
    let bookshelfIds = this.props.user.bookshelf_ids;
    let bookshelves = this.props.bookshelves;
    if(bookshelfIds && bookshelves[bookshelfIds[0]]){
      shelves = bookshelfIds.map(id => <div className="shelves" key={id}>{bookshelves[id].title}</div>);
    }
    return (<div className="users-shelf-container">
              <div className="shelves tag">Bookshelves</div>
              <div className="shelves all">All</div>
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
