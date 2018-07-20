import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {fetchBook} from "./../../actions/book_actions";
import ReviewBarShow from "./review_bar_show";
import ShelfDropDown from "./shelf_drop_down";
import ShowRating from "./show_rating";
import ReviewList from "./../reviews/review_list.jsx";
import BookStats from "./book_stats";

class BookShowPage extends React.Component{

  constructor(){
    super();
    this.state = {loaded: false};
  }

  componentDidMount(){
    const that = this;
    if(this.props.loaded !== true){
      this.props.fetchBook(this.props.match.params.bookId).then(()=>{
        that.setState({loaded: true});
      });
    }else{
      that.setState({loaded: true});
      this.props.fetchBook(this.props.match.params.bookId).then(()=>{
        that.setState({loaded: true});
      });
    }
  }

  shouldComponentUpdate(nextProps){
    //update later??
    return true;
  }

  render(){
    if(!this.state.loaded){
      return <div className="book-show-page">...Loading</div>;
    }
    let userOptions = "";
    if(this.props.currentUser){
      userOptions = (<div className="only-logged-in">
        <ReviewBarShow starkey={this.props.match.params.bookId} className="show-stars" biggerstars="true"/>
        <ShelfDropDown bookId={this.props.bookId} biggerdropdown="true"/>
      </div>);
    }
    const id = this.props.match.params.bookId;
    let desc = "";
    let left = "";
    if(this.props.books[id]){
      desc = (<div className="book-right-aside">
                <div className ="book-show-title">{this.props.books[id].title}</div>
                <div className ="book-show-author">by {this.props.books[id].author}</div>
                <div className ="review-stats">
                  <ShowRating reviewRating={Math.round(this.props.books[id].avg_score)}/>
                  <BookStats reviewIds={this.props.books[id].review_ids} reviews={this.props.books[id].review_ids}/>
                </div>
                <div className ="book-desc">{this.props.books[id].description}</div>
                <div className ="book-desc">ISBN_13: {this.props.books[id].isbn_13}</div>
              </div>);
      left = (<div className="split-left">
                <img className="book-show-image" src={this.props.books[id].photoUrl}/>
                {userOptions}
              </div>);
    }
    return(
      <div className="book-show-page">
        <div className="book-show-info">
          {left}
          <div className="split-right">
            {desc}
          </div>
        </div>
        <div className="book-reviews-container">
          <ReviewList book={this.props.books[this.props.bookId]} />
        </div>
      </div>
    );
  }
}

const mSP = (state, ownProps)=>{
  const bookId = ownProps.match.params.bookId;
  return {
    currentUser: state.entities.users[state.session.currentUserId],
    books: state.entities.books,
    errors: state.errors.books,
    bookId: bookId,
    loaded: state.ui.visitedBooks.bookId
  };
};

const mDP = (dispatch, ownProps)=>{
  return {
    fetchBook: (id)=>dispatch(fetchBook(id))
  };
};

export default connect(mSP, mDP)(BookShowPage);
