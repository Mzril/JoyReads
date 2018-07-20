import {connect} from 'react-redux';
import React from 'react';
import {createShelving, deleteShelving} from "./../../actions/bookshelf_actions";
import {handleStatus, removeStatus} from "./../../actions/review&status_actions";
import Dropdown from "react-dropdown";

class ShelfDropDown extends React.Component{

  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit;
    this.click=this.click.bind(this);
    this.statusclick=this.statusclick.bind(this);
    this.statusUpdate = this.statusUpdate.bind(this);
    this.stop = this.stop.bind(this);
    this.whichbutton=this.whichbutton.bind(this);
    this.deleteClick=this.deleteClick.bind(this);
    this.execute=this.execute.bind(this);
  }

  click(e, bookshelfId){
    this.props.createShelving({book_id: this.props.bookId, bookshelf_id: bookshelfId });
    e.stopPropagation();
  }

  deleteClick(e, bookshelfId){
    this.props.deleteShelving({book_id: this.props.bookId, bookshelf_id: bookshelfId });
    e.stopPropagation();
  }

  statusclick(e, bookshelfId){
    console.log('status');
    this.props.handleStatus({book_id: this.props.bookId, bookshelf_id: bookshelfId, user_id: this.props.currentUser.id});
  }

  stop(e){
    e.stopPropagation();
  }

  statusUpdate(bookshelfId){
    return (e)=>this.statusclick(e,bookshelfId);
  }

  execute(bookshelfId){
    return (e)=>this.click(e,bookshelfId);
  }

  remove(bookshelfId){
    return (e)=>this.deleteClick(e,bookshelfId);
  }

  destroyAllClick(e){
    // this.props.removeStatus({book_id: this.props.bookId, user_id: this.props.currentUser.id});
    e.stopPropagation();
  }

  whichbutton(bookshelfId, addedclass){
    //where are we getting the book ID from?
    // how to we prevent callbacks from occuring here?
    const bookId = parseInt(this.props.bookId);
    if(this.props.bookshelves[bookshelfId].book_ids.includes(bookId)){
      return <i onMouseDown={this.remove(bookshelfId)} className= {"fa fa-minus-circle dropdown-hack minus" +addedclass}></i>;
    }
    return <i onMouseDown={this.execute(bookshelfId)} className={"fa fa-plus-circle dropdown-hack plus" + addedclass}></i>;
  }

  render(){
      if(this.props.currentUser !== null && this.props.currentUser !== undefined){
        let addedclass= "";
        if(this.props.biggerdropdown){
          addedclass = " biggerdropdown";
        }
        const deleteFromAll = {value: -1,
        label: <div className={"take-all-space"+ addedclass} onClick={this.stop} onMouseDown={this.destroyAllClick.bind(this)} onTouchEnd={this.stop}>
                    Remove
                 </div>};
        const bookshelves=this.props.bookshelves;
        const {bookshelf_ids} = this.props.currentUser;
        const userShelves = bookshelf_ids.map((id,i) => {
          const that = this;
          if(i<3){
            return {value: id,
             label: <div className={"take-all-space"+ addedclass} onClick={this.stop} onMouseDown={this.statusUpdate(id)} onTouchEnd={this.stop}>
                      {bookshelves[id].title}
                    </div>};
          }else{
            return {value: id,
             label: <div className={"take-all-space"+ addedclass} onClick={this.stop} onMouseDown={this.stop} onTouchEnd={this.stop}>{this.whichbutton(id, addedclass)}<div className="align-this">{bookshelves[id].title}</div></div>};
          }
        });
        return (<div><Dropdown disabled={this.props.disabled} placeholder="Add to Shelf" className={addedclass} controlClassName={addedclass} menuClassName={addedclass} options={userShelves}/></div>);
      } else {
        return (<div><div></div></div>);
      }
  }
}

const mSP = (state, ownProps)=>{
  let disabled = false;
  let user = {id: null};
  if(ownProps.user){
    disabled = true;
    user = ownProps.user;
  }
  return {
    currentUser: state.entities.users[state.session.currentUserId],
    bookshelves: state.entities.bookshelves,
    statuses: state.entities.statuses,
    disabled: disabled,
    user: user
  };
};

const mDP = (dispatch, ownProps)=>{
  return {
    createShelving: (data)=>dispatch(createShelving(data)),
    deleteShelving: (data)=>dispatch(deleteShelving(data)),
    handleStatus: (data)=>dispatch(handleStatus(data)),
    removeStatus: (data)=>dispatch(removeStatus(data))
  };
};

export default connect(mSP, mDP)(ShelfDropDown);
