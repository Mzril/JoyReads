import {connect} from 'react-redux';
import React from 'react';
import {createShelving, deleteShelving} from "./../../actions/bookshelf_actions";
import Dropdown from "react-dropdown";

class ShelfDropDown extends React.Component{

  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit;
    this.click=this.click.bind(this);
    this.statusclick=this.statusclick.bind(this);
    this.stop = this.stop.bind(this);
    this.whichbutton=this.whichbutton.bind(this);
    this.deleteClick=this.deleteClick.bind(this);
    this.execute=this.execute.bind(this);
  }

  click(e, bookshelfId){
    console.log('add');
    this.props.createShelving({book_id: this.props.bookId, bookshelf_id: bookshelfId });
    e.stopPropagation();
  }

  deleteClick(e, bookshelfId){
    console.log('del');
    this.props.deleteShelving({book_id: this.props.bookId, bookshelf_id: bookshelfId });
    e.stopPropagation();
  }

  statusclick(e){
    console.log("status");
  }

  stop(e){
    e.stopPropagation();
  }

  execute(bookshelfId){
    return (e)=>this.click(e,bookshelfId);
  }

  remove(bookshelfId){
    return (e)=>this.deleteClick(e,bookshelfId);
  }

  whichbutton(bookshelfId){
    //where are we getting the book ID from?
    // how to we prevent callbacks from occuring here?
    const bookId = parseInt(this.props.bookId);
    if(this.props.bookshelves[bookshelfId].book_ids.includes(bookId)){
      return <button onMouseDown={this.remove(bookshelfId)} className= "dropdown-hack">-</button>;
    }
    return <button onMouseDown={this.execute(bookshelfId)} className="dropdown-hack">+</button>;
  }

  render(){
      if(this.props.currentUser !== null && this.props.currentUser !== undefined){
        const bookshelves=this.props.bookshelves;
        const {bookshelf_ids} = this.props.currentUser;
        const userShelves = bookshelf_ids.map((id,i) => {
          const that = this;
          if(i<3){
            return {value: id,
             label: <div className="take-all-space" onClick={this.stop} onMouseDown={this.statusclick} onTouchEnd={this.stop}>
                       {' '}{bookshelves[id].title}
                  </div>};
          }else{
            return {value: id,
             label: <div className="take-all-space" onClick={this.stop} onMouseDown={this.stop} onTouchEnd={this.stop}>{this.whichbutton(id)}{bookshelves[id].title}</div>};
          }
        });
        let addedclass= "";
        if(this.props.biggerdropdown){
          addedclass = "biggerdropdown";
        }
        return (<div>
                  <Dropdown placeholder="Add to Shelf" className={addedclass} controlClassName={addedclass} menuClassName={addedclass} options={userShelves}/>
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
    createShelving: (data)=>dispatch(createShelving(data)),
    deleteShelving: (data)=>dispatch(deleteShelving(data))
  };
};

export default connect(mSP, mDP)(ShelfDropDown);
