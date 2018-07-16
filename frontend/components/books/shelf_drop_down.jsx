import {connect} from 'react-redux';
import React from 'react';
import {createShelving} from "./../../actions/bookshelf_actions";

class ShelfDropDown extends React.Component{

  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit;
  }

  render(){
      if(this.props.currentUser !== null || this.props.currentUser !== undefined){
        const userShelves = this.props.currentUser.bookshelf_ids;
        return (<div>
                  <div>
                    DropdownHere
                  </div>
                </div>);
      } else {
        return (<div>
                  <div></div>
                </div>);
      }
  }
}

const mSP = (state, ownProps)=>{
  return {
    currentUser: state.entities.users[state.session.currentUserId],
    bookshelves: state.entities.bookshelves
  };
};

const mDP = (dispatch, ownProps)=>{
  return {
    createShelving: (data)=>dispatch(createShelving(data))
  };
};

export default connect(mSP, mDP)(ShelfDropDown);
