import React from 'react';
import {connect} from 'react-redux';
import ShelfDropDown from "./shelf_drop_down";
import ReviewBar from "./review_bar";
import {withRouter, Redirect, Link} from 'react-router-dom';
import {fetchBooksByShelf, fetchLimitedBooks, fetchBooksByQuery, fetchBooksByUser} from "./../../actions/book_actions";

class BookTable extends React.Component{

  constructor(props){
    super(props);
    this.state = {displayedBookIds: []};
    //I also have props from Route
  }

  componentDidMount(){
    debugger
    if(this.props.location.pathname === "/home"){
      if(!this.props.ui.visitedIndex || this.props.ui.updated){
        this.getFromHome.bind(this)();
      } else {
        this.setState({displayedBookIds: this.props.ui.indexBookIds });
      }
    }else if(this.props.location.pathname === "/books" && this.props.user){
      if(this.props.ui.updated || !this.props.ui.visitedUsers[this.props.user.id]){
        this.getFromUser.bind(this)();
      }else{
        let userBookIds = [];
        this.props.user.bookshelf_ids.forEach((shelfId)=>{
          userBookIds = userBookIds.concat(this.props.bookshelves[shelfId].book_ids);
        });
        this.setState({displayedBookIds: userBookIds});
      }
    }
  }

  componentWillUnmount(){

  }

  componentWillReceiveProps(){

  }

  getFromHome(){
    this.props.fetchLimitedBooks().then(response => {
    const ids = response.books.map(book=>book.id);
    this.setState({displayedBookIds: ids});});
  }

  getFromUser(){
    const id = this.props.match.params.userId || this.props.user.id;
    this.props.fetchBooksByUser(id).then(response => {
    const ids = response.books.map(book=>book.id);
    this.setState({displayedBookIds: ids});});
  }

  getFromShelf(){
    this.props.fetchBooksByShelf(this.props.match.params.bookshelfId).then(response => {
    const ids = response.books.map(book=>book.id);
    this.setState({displayedBookIds: ids});});
  }

  table(){
    const table = this.state.displayedBookIds.map((bookId, i) => {
      return (<div key={i} className="book-info-container">
                <Link to={`/books/${bookId}`}>
                <img className="book-image" src={this.props.books[bookId].photoUrl}/>
                </Link>
                <span className="book-title">
                  {this.props.books[bookId].title}
                </span>
                <div>
                  <ReviewBar starkey={`${bookId}`}/>
                </div>
                <div>
                  <ShelfDropDown bookId={bookId}/>
                </div>
              </div>);
    });
    return table;
  }

  render(){
    debugger
    //Fix the bookshelf render route and why it's not updateing when visiting a shelf
    if(this.props.user === null && this.props.location.pathname==="/books"){
      debugger
      return (
        <Redirect to="/" />
      );
    }
    if(this.state.displayedBookIds === undefined){
      return (
        <div className="booktable max">
        </div>
      );
    }else if(this.state.displayedBookIds.length === 0){
      return(<div className="booktable max">

      </div>);
    }
    return (
      <div className="booktable">
        {this.table.bind(this)()}
      </div>
    );
  }
}

const mSP = (state, ownProps)=>{
  let user;
  if(ownProps.user){
    user = ownProps.user;
  } else if(state.session.currentUserId){
    user = state.entities.users[state.session.currentUserId];
  } else {
    user = null;
  }
  return {
    user: user,
    bookshelves: state.entities.bookshelves,
    books: state.entities.books,
    errors: state.errors.books,
    ui: state.ui
  };
};

const mDP = (dispatch, ownProps)=>{
  return {
    fetchBooksByShelf: (id)=>dispatch(fetchBooksByShelf(id)),
    fetchBooksByQuery: (query)=>dispatch(fetchBooksByQuery(query)),
    fetchLimitedBooks: ()=>dispatch(fetchLimitedBooks()),
    fetchBooksByUser: (userId)=>dispatch(fetchBooksByUser(userId))
  };
};

export default connect(mSP, mDP)(BookTable);
