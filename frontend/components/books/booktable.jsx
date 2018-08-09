import React from 'react';
import {connect} from 'react-redux';
import ShelfDropDown from "./shelf_drop_down";
import ReviewBar from "./review_bar";
import {withRouter, Redirect, Link} from 'react-router-dom';
import {fetchBooksByShelf, fetchLimitedBooks, fetchBooksByQuery, fetchBooksByUser} from "./../../actions/book_actions";
import {getUserById} from "./../../actions/user_actions";

class BookTable extends React.Component{

  constructor(props){
    super(props);
    this.state = {displayedBookIds: [], style: 0};
    this.table = this.table.bind(this);
  }

  componentDidMount(){
    let userId = this.props.match.params.userId;

    this.setState({style: this.props.ui.style});
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
        this.props.user.bookshelf_ids.forEach((shelfId)=>{
          userBookIds = userBookIds.concat(this.props.bookshelves[shelfId].book_ids);
        });
        userBookIds = Array.from(new Set(userBookIds));
        userBookIds = userBookIds.sort().reverse();
        this.setState({displayedBookIds: userBookIds});
      }
    }
    else if(userId){
      if(!this.props.ui.visitedUsers[userId]){
        this.getFromUser.bind(this)(this.props.match.params.userId);
      }else{
        this.setState({displayedBookIds: this.props.user.book_ids});
      }
    }
  }

  componentWillReceiveProps(nextProps){
    //Optimization: can you remove Set here?
    if(nextProps.ui.style !== this.props.ui.style){
      this.setState({style: nextProps.ui.style});
      return null;
    }
    if(nextProps.currentPath === "/books/searchresults" && nextProps.ui.searchBookIds.length > 0){
      this.setState({displayedBookIds: nextProps.ui.searchBookIds});
      return null;
    }
    if(nextProps.user){
      if(nextProps.currentPath === '/books'){
        let userBookIds = [];
        nextProps.user.bookshelf_ids.forEach((shelfId)=>{
          userBookIds = userBookIds.concat(nextProps.bookshelves[shelfId].book_ids);
        });
        userBookIds = Array.from(new Set(userBookIds));
        userBookIds = userBookIds.sort().reverse();
        this.setState({displayedBookIds: userBookIds});
        return null;
      }else if(nextProps.currentPath === "/home" && this.props.currentPath !== "/home"){
        if(!nextProps.ui.visitedIndex || nextProps.ui.updated){
          this.getFromHome.bind(this)();
          return null;
        }else{
          this.setState({displayedBookIds: nextProps.ui.indexBookIds});
          return null;
        }
      }else if(nextProps.match.params.bookshelfId){
        const shelfId = nextProps.match.params.bookshelfId;
        this.setState({displayedBookIds: nextProps.bookshelves[shelfId].book_ids});
        return null;
      }
    }

  }

  getFromHome(){
    this.props.fetchLimitedBooks().then(response => {
    const ids = response.books.map(book=>book.id);
    this.setState({displayedBookIds: ids});});
  }

  getFromUser(id){
    this.props.fetchUser(id).then(response => {
    const ids = response.books.map(book=>book.id);
    this.setState({displayedBookIds: ids});});
  }

  getFromShelf(){
    this.props.fetchBooksByShelf(this.props.match.params.bookshelfId).then(response => {
    const ids = response.books.map(book=>book.id);
    this.setState({displayedBookIds: ids});});
  }

  table(){
    //Optimization: See if you can't pass if reviews to Review bar component based on current user's reviews, same thing default for status for status.
    let table;
    let addedClass = "";
    if(this.state.style === 0){
      const that = this;
      table = this.state.displayedBookIds.map((bookId, that) => {

        return (<div key={bookId} className="book-info-container">
                  <Link to={`/books/${bookId}`}>
                  <img className="book-image" src={this.props.books[bookId].photoUrl}/>
                  </Link>
                  <span className="book-title">
                    {this.props.books[bookId].title}
                  </span>
                  <div>
                    <ReviewBar user={this.props.user} starkey={`${bookId}`}/>
                  </div>
                  <div>
                    <ShelfDropDown user={this.props.user} bookId={bookId}/>
                  </div>
                </div>);});
    }else if(this.state.style===1){
      table = [[],[],[],[],[]];
      this.state.displayedBookIds.forEach((bookId, i)=>{
        table[i % 5].push(<div key={bookId} className="book-info-container-mason">
                            <Link to={`/books/${bookId}`}>
                            <img className="book-image" src={this.props.books[bookId].photoUrl}/>
                            </Link>
                            <span className="book-title">
                              {this.props.books[bookId].title}
                            </span>
                            <div>
                              <ReviewBar user={this.props.user} starkey={`${bookId}`}/>
                            </div>
                            <div>
                              <ShelfDropDown user={this.props.user} bookId={bookId}/>
                            </div>
                          </div>);
      });
      table= table.map((el, i)=><div key={i} className="mason-row">{el}</div>);
    }
    return table;
  }

  render(){
    //Fix the bookshelf render route and why it's not updating when visiting a shelf
    if(this.props.user === null && this.props.currentPath==="/books"){
      return (
        <Redirect to="/" />
      );
    }
    if(this.props.errors.length > 0){
      return (
        <div className="booktable max error">
          {this.props.errors[0]}
        </div>
      );
    }else if(this.state.displayedBookIds.length===0 && this.props.location.pathname !=="/home"){
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
  if(ownProps.match.params.userId && state.entities.users[ownProps.match.params.userId]){
    user = state.entities.users[ownProps.match.params.userId];
  } else if(state.session.currentUserId){
    user = state.entities.users[state.session.currentUserId];
  } else {
    user = null;
  }
  return {
    user: user,
    bookshelves: state.entities.bookshelves,
    books: state.entities.books,
    currentUserId: state.session.currentUserId,
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
    fetchUser: (userId)=>dispatch(getUserById(userId))
  };
};

export default connect(mSP, mDP)(BookTable);
