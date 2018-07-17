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
    this.table = this.table.bind(this);
  }

  componentDidMount(){
    if(this.props.currentPath === "/home"){
      if(!this.props.ui.visitedIndex || this.props.ui.updated){
        this.getFromHome.bind(this)();
      } else {
        this.setState({displayedBookIds: this.props.ui.indexBookIds });
      }
    }else if(this.props.currentPath === "/books" && this.props.user){
      if(this.props.ui.updated || !this.props.ui.visitedUsers[this.props.user.id]){
        this.getFromUser.bind(this)();
      }else{
        let userBookIds = [];
        let userbookIds = Array.from(new Set(this.state.displayedBookIds));
        userbookIds = userbookIds.sort().reverse();
        this.props.user.bookshelf_ids.forEach((shelfId)=>{
          userBookIds = userBookIds.concat(this.props.bookshelves[shelfId].book_ids);
        });
        this.setState({displayedBookIds: userBookIds});
      }
    }
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.user){
      if(nextProps.currentPath === '/books'){
        let userBookIds = [];
        nextProps.user.bookshelf_ids.forEach((shelfId)=>{
          userBookIds = userBookIds.concat(nextProps.bookshelves[shelfId].book_ids);
        });
        let userbookIds = Array.from(new Set(this.state.displayedBookIds));
        userbookIds = userbookIds.sort().reverse();
        this.setState({displayedBookIds: userBookIds});
      }else if(nextProps.currentPath === "/home" && this.props.currentPath !== "/home"){
        if(!nextProps.ui.visitedIndex || nextProps.ui.updated){
          this.getFromHome.bind(this)();
        }else{

          this.setState({displayedBookIds: nextProps.ui.indexBookIds });
        }
      }else if(nextProps.match.params.bookshelfId){
        const shelfId = nextProps.match.params.bookshelfId;
        this.setState({displayedBookIds: nextProps.bookshelves[shelfId].book_ids});
      }
    }
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
    //Find out why you need to put the unique function here and not anywhere else
    // let userbookIds = Array.from(new Set(this.state.displayedBookIds));
    // userbookIds = userbookIds.sort().reverse();
    const table = this.state.displayedBookIds.map((bookId) => {
      return (<div key={bookId} className="book-info-container">
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
    //Fix the bookshelf render route and why it's not updating when visiting a shelf
    if(this.props.user === null && this.props.currentPath==="/books"){
      return (
        <Redirect to="/" />
      );
    }
    if(this.state.displayedBookIds.length===0 && this.props.location.pathname !=="/home"){
      return (
        <div className="booktable max">
          No Books here yet...go add some!
        </div>
      );
    }else if(this.state.displayedBookIds.length === 0){
      return(<div className="booktable max">

      </div>);
    }
    return (
      <div className="booktable">
        {this.table()}
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
    ui: state.ui,
    currentPath: ownProps.location.pathname
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
