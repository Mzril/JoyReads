import React from "react";
import {connect} from "react-redux";
import {removeReview, updateReview} from './../../actions/review&status_actions';
import Textarea from 'react-textarea-autosize';

class EditForm extends React.Component{
  constructor(){
    super();
    this.state = {new_rating: null, body: "", opened: false};
    this.toggleForm=this.toggleForm.bind(this);
    this.delete = this.delete.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.updateReview = this.updateReview.bind(this);
  }

  componentDidMount(){
    if(this.props.reviews[this.props.reviewId].body !== null){
      this.setState({body: this.props.reviews[this.props.reviewId].body});
    }
  }

  updateReview(e){
    e.preventDefault();
    this.props.updateReview({id: this.props.reviewId, body: this.state.body, reviewId: this.props.reviewId});
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
                <div onClick={this.toggleForm} className="shelves form-opener">Add/Edit Description</div>
                <i onClick={this.delete} className="fa fa-trash-o"></i>
             </div>);
    }else{
      return(
        <div className="form-open">
          <div className="review-bar">
              <div onClick={this.toggleForm} className="form-opener shelves">Add/Edit Description</div>
              <i onClick={this.delete} className="fa fa-trash-o"></i>
          </div>
          <form className="form-holder" onSubmit={this.updateReview.bind(this)}>
            <Textarea className="review-input-form" placeholder="Write your review..." value={this.state.body} onChange={this.handleChange}/>
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
    updateReview: (data)=>dispatch(updateReview(data)),
    removeReview: (data)=>dispatch(removeReview(data))
  };
};

export default connect(mSP, mDP)(EditForm);
