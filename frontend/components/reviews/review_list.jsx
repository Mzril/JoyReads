import React from 'react';
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-redux';

class ReviewList extends React.Component{

  constructor(){
    super();

  }

   shouldComponentUpdate(nextProps){
     
   }

   bookReviews(){
     const {reviews, users, book} = this.props;
     return book.review_ids.map((id)=>{
       return (<div key={id}>
                  <div>{users[reviews[id].user_id].username}</div>
                  <div>Rated this book a {reviews[id].rating}</div>
              </div>);
     });
   }

  render(){
    return (
      <div>
        Review List
        <div>Review Body Form</div>
        {this.bookReviews.bind(this)()}
      </div>
    );
  }
}

const mSP = (state, ownProps)=>{
  return{
    users: state.entities.users,
    reviews: state.entities.reviews
  };
};

const mDP = (dispatch, ownProps)=>{
  return{

  };
};

export default connect(mSP, mDP)(ReviewList);
