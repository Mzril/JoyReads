import React from 'react';
import {connect} from 'react-redux';
import ShelfDropDown from "./shelf_drop_down";
import ReviewBar from "./review_bar";
import {withRouter, Redirect, Link} from 'react-router-dom';
import {fetchBooksByShelf, fetchLimitedBooks, fetchBooksByQuery, fetchBooksByUser} from "./../../actions/book_actions";

class BookTable extends React.Component{

  constructor(props){
    super(props);
    this.state = {displayedBookIds: [], homeIds: []};
    this.locals = {visitedhome: false , updated: false, visitedindex: false, is_mounted: false};
  }

  componentDidMount(){
    this.locals.is_mounted = true;
    if(this.props.user === null || this.props.location.pathname === "/home"){
      this.locals.visitedhome = true;
      this.props.fetchLimitedBooks().then(response => {
        const ids = response.books.map(book=>book.id);
        this.setState({displayedBookIds: ids, homeIds: ids});});
    }else if(this.props.user && this.props.location.pathname === "/books"){
      this.getFromUser.bind(this)();
    }else if(this.props.match.params){
      if(this.props.match.params.id){
        this.getFromUser.bind(this)();
      }else if(this.props.match.params.bookshelfId){
        this.getFromShelf.bind(this)();
      }
    }
  }

  componentWillUnmount(){
    this.locals = {visitedhome: false , updated: false, visitedindex: false};
    this.locals.is_mounted = false;
  }

  // shouldComponentUpdate(nextProps){
  //   if(nextProps.user !==null && nextProps.user !== this.props.user){
  //     // Reset, if the user you're viewing is different from the last user, and you did snot log out.
  //     this.locals = {visitedhome: false , updated: false, visitedindex: false};
  //     return true;
  //   }
  //   let {visitedhome, visitedindex, updated} = this.locals;
  //   //If you're on home screen, and you didn't visit/fetch. Else, just setState and move on
  //   if(visitedhome===false && nextProps.location.pathname === "/home"){
  //     this.getFromHome.bind(this)();
  //     return true;
  //   } else if (visitedhome === true && this.props.location.pathname !== nextProps.location.pathname && nextProps.location.pathname === "/home"){
  //     this.setState({displayedBookIds: this.state.homeIds});
  //     return true;
  //   } else if(nextProps.user === null && nextProps.location.pathname === "/books"){
  //     return true;
  //   } else if (visitedindex === false && nextProps.location.pathname === "/books"){
  //     // if the next/current_path is index/not visited, fetch accordingly
  //     this.getFromUser.bind(this)();
  //     return true;
  //   }else if(visitedindex === true && this.props.location.pathname !== nextProps.location.pathname && nextProps.location.pathname === "/books"){
  //     //if a user has visited "/books" and is now again on "/books"
  //     let displayedBookIds=[];
  //     this.props.user.bookshelf_ids.forEach(shelfId => {
  //       displayedBookIds.concat(this.props.bookshelves[shelfId].book_ids);
  //     });
  //     this.setState({displayedBookIds: displayedBookIds});
  //     return true;
  //   }
  //   return true;
  // }

  getFromHome(){
    this.locals.visitedhome = true;
    this.props.fetchLimitedBooks().then(response => {
    const ids = response.books.map(book=>book.id);
    this.setState({displayedBookIds: ids, homeIds: ids});});
  }

  getFromUser(){
    const id = this.props.match.params.userId || this.props.user.id;
    this.locals.visitedindex = true;
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
    //Fix the bookshelf render route and why it's not updateing when visiting a shelf
  
    if(this.props.user === null && this.props.location.pathname==="/books"){
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
    errors: state.errors.books
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
