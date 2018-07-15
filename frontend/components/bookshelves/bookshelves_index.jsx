import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import Bookshelf from "./bookshelf";
import {fetchBookshelves, createBookshelf, updateBookshelf, deleteBookshelf} from './../../actions/bookshelf_actions';

class BookshelvesIndex extends React.Component {

  constructor(props){
    super(props);
    this.state = {editing: false, creating: false, text:""};
    this.handleDelete=this.handleDelete.bind(this);
    this.handleCreate=this.handleCreate.bind(this);
    this.handleUpdate=this.handleUpdate.bind(this);
    this.openForm = this.openForm.bind(this);
    this.formButton=this.formButton.bind(this);
    this.updateInput = this.updateInput.bind(this);
  }

  openForm(field, id = true){
    const that = this;
    return () => {
      if(field==="editing"){
        that.setState({[field]: id, text: that.props.bookshelves[id].title, creating: false});
      } else {
        that.setState({[field]: id, text: "", editing: false});
      }
    };
  }

  updateInput(e){
    this.setState({text: e.currentTarget.value});
  }

  handleDelete(e){
    this.props.deleteBookshelf(parseInt(e.currentTarget.getAttribute("value"))).then(() => this.setState({creating: false, editing: false}));
  }

  handleCreate(e){
    this.props.createBookshelf({title: this.state.text}).then(() => this.setState({creating: false, editing: false}));
  }

  handleUpdate(e){
    this.props.updateBookshelf({id: this.state.editing, title: this.state.text}).then(()=>this.setState({editing: false, creating: false}));
  }

  formButton(id){
    const errors = this.props.errors.map((error,i) => <div key={i} className="error-li">* {error} *</div>);
    if(this.state.creating){
      return (<div className="shelf-form">
                  <label>Add a Shelf:
                    <input onChange={this.updateInput} className="shelf-form-input" value={this.state.text}/>
                  </label>
                  <span onClick={this.handleCreate} className="shelf-button-form">add</span>
                <div className="shelf-errors">
                  {errors}
                </div>
              </div>);
    }else if(this.state.editing){
      return (<div className="shelf-form">
                  <label>Rename Shelf:
                  <input onChange={this.updateInput} className="shelf-form-input" value={this.state.text}/>
                  </label>
                  <span onClick={this.handleUpdate} className="shelf-button-form update">update</span>
                <div className="shelf-errors">
                  {errors}
                </div>
              </div>);
    }else{
      return <div className="shelf-form"><span onClick={this.openForm("creating")} className="add-shelf-button">Add Shelf</span></div>;
    }
  }

  shelves(bookshelfIds, bookshelves){
    const total_number = 0;
    const bookshelfids = bookshelfIds.slice();
    let exclusive = bookshelfids.splice(0,3).map(id => <Link to={`/bookshelves/${id}`} className="shelves" key={id}>{bookshelves[id].title} ({bookshelves[id].book_ids.length})</Link>);
    let shelves = bookshelfids.map(id => {
      return (<div key={id} className="bookshelf-item">
                <Link to={`/bookshelves/${id}`} className="shelves" key={id}>{bookshelves[id].title} (0)</Link>
                <span className="index-icons">
                  <i onClick={this.openForm("editing", id)} className="fa fa-pencil-square"></i>
                  <i value={id} onClick={this.handleDelete} className="fa fa-eraser"></i>
                </span>
              </div>);
            });

    return   (<div className="users-shelf-container">
              <div className="shelves tag">Bookshelves</div>
              <div>
                <Link to="/books" className="shelves all">All ({total_number})</Link>
              </div>
              <div className="exclusive-shelves">
                <div className="holders">
                  {exclusive}
                </div>
              </div>
              <div className="non-exclusive-shelves">
                {shelves}
              </div>
              {this.formButton()}
            </div>);
  }

  render () {
    let bookshelfIds = this.props.user.bookshelf_ids;
    let bookshelves = this.props.bookshelves;
    if(this.props.location.pathname =="/home"){
      return <div className="users-shelf-container" style={{display: "none"}} ></div>;
    }
    if(bookshelfIds && bookshelves[bookshelfIds[0]]){
      return this.shelves(bookshelfIds, bookshelves);
    } else {
      return <div className="users-shelf-container" style={{display: "none"}} ></div>;
    }
  }
}

const mSP = (state, ownProps)=>{
  let user;
  if(ownProps.match.params.userId){
    user = ownProps.match.params.userId;
  } else if(state.session.currentUserId){
    user = state.entities.users[state.session.currentUserId];
  } else {
    user = {};
  }
  return {
    user: user,
    bookshelves: state.entities.bookshelves,
    errors: state.errors.bookshelves
  };
};

const mDP = (dispatch, ownProps)=>{
  return {
    fetchBookshelves: (user)=> dispatch(fetchBookshelves(user)),
    createBookshelf: (bookshelf)=> dispatch(createBookshelf(bookshelf)),
    updateBookshelf: (bookshelf)=> dispatch(updateBookshelf(bookshelf)),
    deleteBookshelf: (id)=> dispatch(deleteBookshelf(id))
  };
};


export default connect(mSP, mDP)(BookshelvesIndex);
