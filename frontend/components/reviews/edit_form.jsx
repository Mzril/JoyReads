import React from "react";
import {connect} from "react-redux";
import {handleReview, removeReview} from './../../actions/review&status_actions';

class EditForm extends React.Component{
  constructor(){
    super();
    this.state = {new_rating: null, body: "", opened: false};
    this.toggleForm=this.toggleForm.bind(this);
    this.delete = this.delete.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.updateReview = this.updateReview.bind(this);
  }

  updateReview(e){
    e.preventDefault();
    this.handleReview({body: this.state.body, user_id: this.props.currentUserId});
  }

  toggleForm(){
    this.setState({opened: !this.state.opened});
  }

  delete(){
    this.props.removeReview({book_id: this.props.reviews[this.props.reviewId].book_id, user_id: this.props.reviews[this.props.reviewId].user_id });
  }

  handleChange(e){
    this.setState({body: e.currentTarget.value});
  }

  render(){
    if(!this.state.opened){
      return (<div className="review-bar">
                <div onClick={this.toggleForm} className="shelves form-opener">Edit Your review</div>
                <i onClick={this.delete} className="fa fa-trash-o"></i>
             </div>);
    }else{
      return(
        <div className="form-open">
          <div className="review-bar">
              <div onClick={this.toggleForm} className="form-opener">Edit Your review</div>
              <i onClick={this.delete} className="fa fa-trash-o"></i>
          </div>
          <form onSubmit={this.updateReview.bind(this)}>
            <input className="review-input-form" placeholder="Write your review..." value={this.props.reviews[this.props.reviewId].body} onChange={this.handleChange}/>
            <input type="submit"/>
          </form>
        </div>
      );
    }
  }
}

const mSP = (state, ownProps) => {
  return {
    currentUserId: state.session.currentUserId,
    reviews: state.entities.reviews,
    reviewId: ownProps.reviewId
  };
};

const mDP = (dispatch, ownProps) => {
  return {
    handleReview: (data)=>dispatch(handleReview(data)),
    removeReview: (data)=>dispatch(removeReview(data))
  };
};

export default connect(mSP, mDP)(EditForm);
