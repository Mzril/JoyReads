import React from "react";

class ShowRating extends React.Component{

  constructor(props){
    super(props);
    this.state = {currentvalue: 0};
  }

   componentDidMount(){
     this.setState({currentvalue: this.props.reviewRating});
   }

  render(){
      return (<div className="displayedReview">
                <form>
                  <input disabled={true} checked={this.state.currentvalue === 5} className={`star star-5`} id={`star-5--`} value='5' type="radio" name="star"/>
                  <label className={`star star-5`} htmlFor={`star-5--`}></label>
                  <input disabled={true} checked={this.state.currentvalue === 4} className={`star star-4`} id={`star-4--`} value='4' type="radio" name="star"/>
                  <label className={`star star-4 `} htmlFor={`star-4--`}></label>
                  <input disabled={true} checked={this.state.currentvalue === 3} className={`star star-3`} id={`star-3--`} value='3' type="radio" name="star"/>
                  <label className={`star star-3 `} htmlFor={`star-3--`}></label>
                  <input disabled={true} checked={this.state.currentvalue === 2} className={`star star-2`} id={`star-2--`} value='2'type="radio" name="star"/>
                  <label className={`star star-2 `} htmlFor={`star-2--`}></label>
                  <input disabled={true} checked={this.state.currentvalue === 1} className={`star star-1`} id={`star-1--`} value='1'type="radio" name="star"/>
                  <label className={`star star-1 `} htmlFor={`star-1--`}></label>
                </form>
              </div>);
  }

}

export default ShowRating;
