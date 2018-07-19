import React from 'react';
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router-dom';
import ShowRating from './../books/show_rating';
import EditForm from "./edit_form";
import PostForm from "./post_form";

class ReviewList extends React.Component{

  constructor(){
    super();

  }

   bookReviews(){
     const {reviews, users, book} = this.props;
     let myReviewId = 0;
     const otherUsersReviews = [];
     book.review_ids.forEach((id)=>{
       const user = users[reviews[id].user_id];
       const reviewRating = reviews[id].rating;
       const reviewBody = reviews[id].body;
       const userlink = "/users/" + user.username;
       if( user.id !== this.props.currentUserId){
         //Don't forget this.props.location.state handling laster to optimize and preload if within array of visited Users
         otherUsersReviews.push(<div key={id} className="whole-user-review">
                                   <div style={{display: "flex"}}>
                                       <Link className="userlink" to={{pathname: userlink, state: user.id}}>{user.username}</Link>
                                       <ShowRating reviewRating={reviewRating} starkey={book.id}/>
                                   </div>
                                   <div className='review-body'>{reviewBody}</div>
                                </div>
                              );
       }else{
         myReviewId = id;
       }});
       let reviewForm=[];
       if(myReviewId){
         reviewForm.push(<EditForm key={myReviewId} reviewId={myReviewId}/>);
       }else if(this.props.currentUserId){
         reviewForm.push(<PostForm key={0}/>);
       }
       return reviewForm.concat(otherUsersReviews);
   }

  render(){
    return (
      <div>
        <div className="review-container-header">User Reviews</div>
        <div className="review-contents">
          {this.bookReviews.bind(this)()}
        </div>
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
