import React from 'react';
import {connect} from 'react-redux';
import {deleteReview, handleReview} from "./../../actions/review&status_actions";


class ReviewBar extends React.Component{

  constructor(){
    super();
    this.state = {currentvalue: 0};
    this.handleSubmit= this.handleSubmit.bind(this);
  }

   componentDidMount(){
     const {displayedUser, reviews, books} = this.props;
     if(displayedUser.bookInfo){
       const bookExists = displayedUser.bookInfo[parseInt(this.props.starkey)];
       if(bookExists){
         const lookup = displayedUser.bookInfo[parseInt(this.props.starkey)].reviewId;
         if(lookup !== undefined){
           this.setState({currentvalue: reviews[lookup].rating});
         }
       }
     }else if(displayedUser.id !==null){
       this.setState({currentvalue: this.props.reviewRating});
     }
   }

   componentWillReceiveProps(nextProps){
     const {displayedUser} = nextProps;
     if(displayedUser.bookInfo){
       const bookExists = displayedUser.bookInfo[parseInt(this.props.starkey)];
       if(!bookExists){
        this.setState({currentvalue: 0});
       }
     }
   }

  handleSubmit(e){
    const rating = parseInt(e.target.value);
    this.setState({currentvalue: rating});
    const data = {user_id: this.props.displayedUser.id, book_id: this.props.starkey, rating: rating};
    this.props.handleReview(data);
  }

  render(){
    if(this.props.displayedUser.id !== null){
      let addedclass= "";
      if(this.props.biggerstars){
        addedclass = "biggerstars";
      }
      return (<div>
                <form>
                  <input disabled={this.props.disabled} onChange={this.handleSubmit} checked={this.state.currentvalue === 5} className={`star star-5 ${addedclass}`} id={`star-5-${this.props.starkey}`} value='5' type="radio" name="star"/>
                  <label className={`star star-5 ${addedclass}`} htmlFor={`star-5-${this.props.starkey}`}></label>
                  <input disabled={this.props.disabled} onChange={this.handleSubmit} checked={this.state.currentvalue === 4} className={`star star-4 ${addedclass}`} id={`star-4-${this.props.starkey}`} value='4' type="radio" name="star"/>
                  <label className={`star star-4 ${addedclass}`} htmlFor={`star-4-${this.props.starkey}`}></label>
                  <input disabled={this.props.disabled} onChange={this.handleSubmit} checked={this.state.currentvalue === 3} className={`star star-3 ${addedclass}`} id={`star-3-${this.props.starkey}`} value='3' type="radio" name="star"/>
                  <label className={`star star-3 ${addedclass}`} htmlFor={`star-3-${this.props.starkey}`}></label>
                  <input disabled={this.props.disabled} onChange={this.handleSubmit} checked={this.state.currentvalue === 2} className={`star star-2 ${addedclass}`} id={`star-2-${this.props.starkey}`} value='2'type="radio" name="star"/>
                  <label className={`star star-2 ${addedclass}`} htmlFor={`star-2-${this.props.starkey}`}></label>
                  <input disabled={this.props.disabled} onChange={this.handleSubmit} checked={this.state.currentvalue === 1} className={`star star-1 ${addedclass}`} id={`star-1-${this.props.starkey}`} value='1'type="radio" name="star"/>
                  <label className={`star star-1 ${addedclass}`} htmlFor={`star-1-${this.props.starkey}`}></label>
                </form>
              </div>);
    }else {
      return (<div></div>);
    }
  }
}

const mSP = (state, ownProps)=>{
  let user;
  if(ownProps.user){
    user = ownProps.user;
  }else if(state.entities.users[state.session.currentUserId] !== null && state.entities.users[state.session.currentUserId] !== undefined){
    user = state.entities.users[state.session.currentUserId];
  }else{
    user = {id: null};
  }
  const disabled = (user.id !== state.session.currentUserId);
  return {
    displayedUser: user,
    books: state.entities.books,
    reviews: state.entities.reviews,
    disabled: disabled
  };
};

const mDP = (dispatch, ownProps)=>{
  return {
    handleReview: (data)=>dispatch(handleReview(data)),
    deleteReview: (data)=>dispatch(deleteReview(data)),
  };
};

export default connect(mSP, mDP)(ReviewBar);
