import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {fetchBook} from "./../../actions/book_actions";
import ReviewBar from "./review_bar";
import ShelfDropDown from "./shelf_drop_down";

class BookShowPage extends React.Component{

  constructor(){
    super();
    this.state = {loaded: false};
  }

  componentDidMount(){
    const that = this;
    this.props.fetchBook(this.props.match.params.bookId).then(()=>{
      that.setState({loaded: true});
    });
  }

  shouldComponentUpdate(nextProps){
    return true;
  }

  render(){
    if(!this.state.loaded){
      return <div className="book-show-page">...Loading</div>;
    }
    let userOptions = "";
    if(this.props.currentUser){
      userOptions = (<div className="only-logged-in">
        <ReviewBar className="show-stars" biggerstars="true"/>
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
                <div className = "book-stats"> Review/Rating Details</div>
                <div className ="book-desc">{this.props.books[id].description.split('.').join('.\n')}</div>
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
          Reviews go here
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
    bookId: bookId
  };
};

const mDP = (dispatch, ownProps)=>{
  return {
    fetchBook: (id)=>dispatch(fetchBook(id))
  };
};

export default connect(mSP, mDP)(BookShowPage);
