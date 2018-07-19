import React from "react";
import {connect} from "react-redux";
import {handleReview, deleteReview} from './../../actions/review&status_actions';

class EditForm extends React.Component{
  constructor(){
    super();
    this.state = {new_rating: null, body: "", opened: false};
    this.toggleForm=this.toggleForm.bind(this);
    this.delete = this.delete.bind(this);
  }

  toggleForm(){
    this.setState({opened: !this.state.opened});
  }

  delete(){
    this.props.deleteReview({book_id: this.props.reviews[this.props.reviewId].book_id, user_id: this.props.reviews[this.props.reviewId].user_id });
  }

  render(){
    if(!this.state.opened){
      return (<div className="review-bar">
                <div onClick={this.toggleForm} className="form-opener">Edit Your review</div>
                <button className="review-delete" onClick={this.delete}>Delete <i className="fa fa-trash-o"></i></button>
             </div>);
    }else{
      return(
        <div className="form-open">
          <div className="review-bar">
              <div onClick={this.toggleForm} className="form-opener">Edit Your review</div>
              <button className="review-delete" onClick={this.delete}>Delete!<i className="fa fa-trash-o"></i></button>
          </div>
          <form>
            <textarea placeholder="Write your review...">{this.props.reviews[this.props.reviewId].body}</textarea>
          </form>
        </div>
      );
    }
  }
}

const mSP = (state, ownProps) => {
  return {
    currentUser: state.entities.currentUser,
    reviews: state.entities.reviews,
    reviewId: ownProps.reviewId
  };
};

const mDP = (dispatch, ownProps) => {
  return {
    handleReview: (data)=>dispatch(handleReview(data)),
    deleteReview: (data)=>dispatch(deleteReview(data))
  };
};

export default connect(mSP, mDP)(EditForm);
