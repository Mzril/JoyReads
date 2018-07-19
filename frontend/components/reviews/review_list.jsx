import React from 'react';
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router-dom';
import ShowRating from './../books/show_rating';

class ReviewList extends React.Component{

  constructor(){
    super();

  }


   bookReviews(){
     const {reviews, users, book} = this.props;
     return book.review_ids.map((id)=>{
       const user = users[reviews[id].user_id];
       const reviewRating = reviews[id].rating;
       const userlink = "/users/" + user.username;
       if( user.id !== this.props.currentUserId){
         return (<div style={{display: "flex"}} key={id}>
                    <Link className="userlink" to={userlink}>{user.username}</Link>
                    <ShowRating reviewRating={reviewRating} starkey={book.id}/>
                </div>);
       }
     });
   }

  render(){
    return (
      <div>
        <div>Review Body Form</div>
        {this.bookReviews.bind(this)()}
      </div>
    );
  }
}

const mSP = (state, ownProps)=>{
  return{
    users: state.entities.users,
    reviews: state.entities.reviews,
    currentUserId: state.session.currentUserId
  };
};

const mDP = (dispatch, ownProps)=>{
  return{

  };
};

export default connect(mSP, mDP)(ReviewList);
