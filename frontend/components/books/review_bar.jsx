import React from 'react';
import {connect} from 'react-redux';


class ReviewBar extends React.Component{

  constructor(){
    super();
    this.state = {isChecked: true};
  }

  change(e){
    const derp = e.currentTarget.value;
  }

  handleSubmit(e){
    const value = e.target.value;
    if(value !== null && value !== undefined){

    }
  }

  render(){
    if(this.props.currentUser !== null && this.props.currentUser !== undefined){
      let addedclass= "";
      if(this.props.biggerstars){
        addedclass = "biggerstars";
      }
      return (<div>
                <form>
                  <input className={`star star-5 ${addedclass}`} id={`star-5-${this.props.starkey}`} value='5' type="radio" name="star"/>
                  <label className={`star star-5 ${addedclass}`} htmlFor={`star-5-${this.props.starkey}`}></label>
                  <input className={`star star-4 ${addedclass}`} id={`star-4-${this.props.starkey}`} value='4' type="radio" name="star"/>
                  <label className={`star star-4 ${addedclass}`} htmlFor={`star-4-${this.props.starkey}`}></label>
                  <input className={`star star-3 ${addedclass}`} id={`star-3-${this.props.starkey}`} value='3' type="radio" name="star"/>
                  <label className={`star star-3 ${addedclass}`} htmlFor={`star-3-${this.props.starkey}`}></label>
                  <input className={`star star-2 ${addedclass}`} id={`star-2-${this.props.starkey}`} value='2'type="radio" name="star"/>
                  <label className={`star star-2 ${addedclass}`} htmlFor={`star-2-${this.props.starkey}`}></label>
                  <input className={`star star-1 ${addedclass}`} id={`star-1-${this.props.starkey}`} value='1'type="radio" name="star"/>
                  <label className={`star star-1 ${addedclass}`} htmlFor={`star-1-${this.props.starkey}`}></label>
                </form>
              </div>);
    }else {
      return (<div></div>);
    }
  }
}

const mSP = (state, ownProps)=>{
  let currentUser=null;
  if(state.entities.users[state.session.currentUserId] !== null | state.entities.users[state.session.currentUserId] !== undefined){
    currentUser = state.entities.users[state.session.currentUserId];
  }
  return {
    currentUser: currentUser,
    reviews: state.entities.reviews
  };
};

const mDP = (dispatch, ownProps)=>{
  return {
    createReview: (data)=>dispatch(fetchBook(data)),
    updateReview: (data)=>dispatch(fetchBook(data))
  };
};

export default connect(mSP, mDP)(ReviewBar);
