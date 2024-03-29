import {connect} from 'react-redux';
import React from 'react';
import {createShelving, deleteShelving} from "./../../actions/bookshelf_actions";
import {createStatus, updateStatus, removeStatus} from "./../../actions/review&status_actions";
import Dropdown from "react-dropdown";

class ShelfDropDown extends React.Component{

  constructor(props){
    // Switch currentUser for generic User when implementing other user's bookshelves
    super(props);
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

  statusclick(e,value){
    const inStatus = this.props.currentUser.bookInfo[this.props.bookId];
    if(inStatus){
      if(this.props.statuses[inStatus.statusId].value != value){
        this.props.updateStatus({id: inStatus.statusId, value: value});
      }
    }else{
      this.props.createStatus({bookshelf_id: this.props.currentUser.bookshelf_ids[value], book_id: this.props.bookId, value: value, user_id: this.props.currentUser.id});
    }
  }

  stop(e){
    e.stopPropagation();
  }

  statusUpdate(i){
    return (e)=>this.statusclick(e,i);
  }

  execute(bookshelfId){
    return (e)=>this.click(e,bookshelfId);
  }

  remove(bookshelfId){
    return (e)=>this.deleteClick(e,bookshelfId);
  }

  destroyAllClick(e){
    this.props.removeStatus(this.props.statuses[this.props.currentUser.bookInfo[this.props.bookId].statusId].id);
    e.stopPropagation();
  }

  whichbutton(bookshelfId, addedclass){
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
        label: <div className={"take-all-space delete"+ addedclass} onClick={this.stop} onMouseDown={this.destroyAllClick.bind(this)} onTouchEnd={this.stop}>
                    REMOVE
                 </div>};
        const bookshelves=this.props.bookshelves;
        const {bookshelf_ids} = this.props.currentUser;
        const userShelves = bookshelf_ids.map((id,i) => {
          const that = this;
          if(i<3){
            return {value: i,
             label: <div className={"take-all-space"+ addedclass} onClick={this.stop} onMouseDown={this.statusUpdate(i)} onTouchEnd={this.stop}>
                      {bookshelves[id].title}
                    </div>};
          }else{
            return {value: id,
             label: <div className={"take-all-space"+ addedclass} onClick={this.stop} onMouseDown={this.stop} onTouchEnd={this.stop}>{this.whichbutton(id, addedclass)}<div className="align-this">{bookshelves[id].title}</div></div>};
          }
        });

        const inStatus = this.props.currentUser.bookInfo[this.props.bookId];
        if(inStatus){
          let newPlaceholder;
          const value = this.props.statuses[inStatus.statusId].value;
          userShelves.push(deleteFromAll);
          if(value === 0){
            newPlaceholder = <div className={"dropdown-derp"+ addedclass}>Read</div>;
          }else if(value === 1){
            newPlaceholder = <div className={"dropdown-derp"+ addedclass}>Currently Reading</div>;
          }else if (value === 2){
            newPlaceholder = <div className={"dropdown-derp"+ addedclass}>Want to Read</div>;
          }
          return (<div><Dropdown disabled={this.props.disabled} placeholder={newPlaceholder} className={addedclass} controlClassName={addedclass} menuClassName={addedclass} options={userShelves}/></div>);
        }else{
          return (<div><Dropdown disabled={this.props.disabled} placeholder="Add to Shelf" className={addedclass} controlClassName={addedclass} menuClassName={addedclass} options={userShelves}/></div>);
        }
      } else {
        return (<div><div></div></div>);
      }
  }
}

const mSP = (state, ownProps)=>{
  let disabled = false;
  let user;
  if(ownProps.user){
    if(ownProps.user.id !== state.session.currentUserId){
      disabled = true;
      user = ownProps.user;
    }else if(ownProps.user.id === state.session.currentUserId){
      user = state.entities.users[state.session.currentUserId];
    }
  }
  return {
    currentUser: user,
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
    createStatus: (data)=>dispatch(createStatus(data)),
    updateStatus: (data)=>dispatch(updateStatus(data)),
    removeStatus: (id)=>dispatch(removeStatus(id))
  };
};

export default connect(mSP, mDP)(ShelfDropDown);
