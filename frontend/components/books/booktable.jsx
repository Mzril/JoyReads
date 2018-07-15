import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {fetchBooksByShelf, fetchLimitedBooks, fetchBooksByQuery, fetchBooksByUser} from "./../../actions/book_actions";

class BookTable extends React.Component{

  constructor(props){
    super(props);
    this.state = {displayedBookIds: []};
    this.locals = {visitedhome: false , updated: false, visitedindex: false};
  }

  componentDidMount(){
    if(this.props.user === null || this.props.location.pathname === "/home"){
      this.locals.visitedhome = true;
      this.props.fetchLimitedBooks().then(response => {
        const ids = response.books.map(book=>book.id);
        this.setState({displayedBookIds: ids});});
    }else if(this.props.user){
      this.locals.visitedindex = true;
      let displayedBookIds=[];
      this.props.user.bookshelf_ids.forEach(shelfId => {
        displayedBookIds.concat(this.props.bookshelves[shelfId].book_ids);
      });
      this.setState({displayedBookIds: displayedBookIds});
    }
  }

  componentWillUnmount(){
    this.locals = {visitedhome: false , updated: false, visitedindex: false};
  }

  shouldComponentUpdate(nextProps){
    if(nextProps.user !== this.props.user){
      this.locals = {visitedhome: false , updated: false, visitedindex: false};
    }
    if((this.props.user !== nextProps.user) && nextProps.user === null){
      this.initialize.bind(this)();
    } else if(!this.locals.visitedhome && nextProps.location.pathname==="/home" &&  nextProps.user){
      this.initialize.bind(this)();
    } else if(this.props.location.pathname !== nextProps.location.pathname && nextProps.location.pathname == '/books'){
        if(this.locals.visitedindex === false){
          this.locals.visitedindex= true;
          nextProps.fetchBooksByUser(nextProps.user).then(response => {
            const ids = response.books.map(book=>book.id);
            this.setState({displayedBookIds: ids});});
        } else{
          let displayedBookIds=[];
          nextProps.user.bookshelf_ids.forEach(shelfId => {
            displayedBookIds.concat(nextProps.bookshelves[shelfId].book_ids);
          });
        }
    }else if(this.props.location.pathname !== nextProps.location.pathname && nextProps.match.params.bookshelfId ){
      if(this.locals.visitedindex === false){
        this.props.fetchBooksByShelf(nextProps.match.params.bookshelfId).
          then(response => {
            const ids = response.books.map(book=>book.id);
            this.setState({displayedBookIds: ids});});
      }else{
        this.setState({displayedBookIds: nextProps.bookshelves[nextProps.match.params.bookshelfId].book_ids});
      }
    }
    return true;
  }

  initialize(){
    if(this.locals.visitedhome){
      return false;
    }
    this.locals.visitedhome = true;
    this.props.fetchLimitedBooks().then(response => {
    const ids = response.books.map(book=>book.id);
    this.setState({displayedBookIds: ids});});
  }

  table(){
    const table = this.state.displayedBookIds.map((bookId, i) => {
      return (<div key={i} className="book-info-container">
                <img className="book-image" src={this.props.books[bookId].photoUrl}/>
                <span className="book-title">
                  {this.props.books[bookId].title}
                </span>
                <div>
                  Review Container
                </div>
                <div>
                  Status Container
                </div>
              </div>);
    });
    return table;
  }

  render(){
    // if(this.props.errors.length > 0){
    //   return (
    //     <div className="booktable max">
    //       Something Went Wrong
    //     </div>
    //   );
    // }
    if(this.state.displayedBookIds.length === 0){
      return (
        <div className="booktable max">
          You have no books here yet.
        </div>
      );
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
