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
     let otherUsersReviews = [[],[]];
     let offset = 0;
     book.review_ids.forEach((id, i)=>{
       const user = users[reviews[id].user_id];
       const reviewRating = reviews[id].rating;
       const reviewBody = reviews[id].body;
       // const userlink = "/users/" + user.username;
       const userlink=`/users/${user.id}/bookshelves`;
       if( user.id !== this.props.currentUserId){
         //Don't forget this.props.location.state handling later to optimize and preload if within array of visited Users
         otherUsersReviews[(i+offset) % 2].push(<div key={id} className="whole-user-review">
                                                 <div className="user-review-header">
                                                      <ShowRating reviewRating={reviewRating} starkey={book.id}/>

                                                      <Link className="userlink" to={{pathname: userlink, state: user.id}}>{user.username}</Link>
                                                 </div>
                                                 <div className='review-body'>
                                                   {reviewBody}
                                                 </div>
                                                </div>
                                              );
       }else{
         myReviewId = id;
         offset = -1;
       }});
       let reviewForm;
       if(myReviewId){
         reviewForm = <EditForm key={myReviewId} reviewId={myReviewId}/>;
       }else if(this.props.currentUserId){
         reviewForm = <PostForm key={0} />;
       }
       otherUsersReviews = otherUsersReviews.map((el, i)=><div key={i} className="mason-row review-mason">{el}</div>);
       return (<div className='r1'>
                 {reviewForm}
                 <div className="review-holder">
                    {otherUsersReviews}
                 </div>
              </div>);
   }

  render(){
    return (
      <div className="review-container">
        <div className="review-container-header">Community Reviews</div>
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
