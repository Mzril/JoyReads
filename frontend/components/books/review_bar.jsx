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
    const time = e.target.value;
  }

  render(){
    return (<div onClick={this.handleSubmit.bind(this)}>
              <form>
                <input className="star star-5" id={`star-5-${this.props.starkey}`} value='5' type="radio" name="star"/>
                <label className="star star-5" htmlFor={`star-5-${this.props.starkey}`}></label>
                <input className="star star-4" id={`star-4-${this.props.starkey}`} value='4' type="radio" name="star"/>
                <label className="star star-4" htmlFor={`star-4-${this.props.starkey}`}></label>
                <input className="star star-3" id={`star-3-${this.props.starkey}`} value='3' type="radio" name="star"/>
                <label className="star star-3" htmlFor={`star-3-${this.props.starkey}`}></label>
                <input className="star star-2" id={`star-2-${this.props.starkey}`} value='2'type="radio" name="star"/>
                <label className="star star-2" htmlFor={`star-2-${this.props.starkey}`}></label>
                <input className="star star-1" id={`star-1-${this.props.starkey}`} value='1'type="radio" name="star"/>
                <label className="star star-1" htmlFor={`star-1-${this.props.starkey}`}></label>
              </form>
            </div>);
  }
}


const mSP = (state, ownProps)=>{
  return {
    currentUser: state.entities.users[state.session.currentUserId],
    books: state.entities.books,
    errors: state.errors.books
  };
};

const mDP = (dispatch, ownProps)=>{
  return {
    fetchBook: (id)=>dispatch(fetchBook(id))
  };
};

export default connect(mSP, mDP)(ReviewBar);
