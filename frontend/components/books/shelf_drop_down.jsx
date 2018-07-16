import {connect} from 'react-redux';
import React from 'react';



class ShelfDropDown extends React.Component{

  render(){
      return (<div>
                <div>Add To Shelf</div>
              </div>);
  }
}

const mSP = (state, ownProps)=>{
  return {
    // userShelves: state.entities.users[state.session.currentUserId].bookshelf_ids,
    // bookshelves: state.entities.bookshelves
  };
};

const mDP = (dispatch, ownProps)=>{
  return {
    fetchBook: (id)=>dispatch(fetchBook(id))
  };
};

export default connect(mSP, mDP)(ShelfDropDown);
