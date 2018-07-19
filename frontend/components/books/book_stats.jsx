import React from "react";
import {connect} from "react-redux";
import {PieChart} from 'react-easy-chart';

class BookStats extends React.Component{

  constructor(){
    super();
    this.state={hidden: true};
  }

  handleClick1(){
    this.setState({hidden: false});
  }

  handleClick2(){
    this.setState({hidden: true});
  }

  reviewCounts(reviewIds){
    const set = {1: 0, 2: 0, 3: 0, 4: 0, 5: 0};
    reviewIds.forEach(i=>{
      set[this.props.reviews[i].rating] += 1;
    });
    return set;
  }

  render(){
    if(this.state.hidden){
      return <div className="chart-container"><span>{this.props.reviewIds.length} Reviews</span><span style={{color: '#4f82b9'}} onClick={this.handleClick1.bind(this)}>Details</span></div>;
    } else{
      const counts = this.reviewCounts.call(this,this.props.reviewIds);
      return (
        <div className="chart-container">
          <span>{this.props.reviewIds.length} Reviews</span>
          <span style={{color: '#4f82b9'}} onClick={this.handleClick2.bind(this)}>Details</span>
          <div className='chart'>
            <div className ="legend">
              <div>5 <i style={{color:'#1e8'}} className="fa fa-star five"></i> {counts[5]} reviews</div>
              <div>4 <i style={{color:'#6cf8fc'}} className="fa fa-star four"></i> {counts[4]} reviews</div>
              <div>3 <i style={{color:'#FD4'}} className="fa fa-star three"></i> {counts[3]} reviews</div>
              <div>2 <i style={{color:'#e88d00'}} className="fa fa-star two"></i> {counts[2]} reviews</div>
              <div>1 <i style={{color: '#F62'}} className="fa fa-star one"></i> {counts[1]} reviews</div>
            </div>
            <PieChart
              size={190}
              innerHoleSize={30}
              data={[
                { key: "5", value: counts[5], color: '#1e8' },
                { key: "4", value: counts[4], color: '#6cf8fc' },
                { key: "3", value: counts[3], color: '#FD4' },
                { key: "2", value: counts[2], color: "#e88d00" },
                { key: "1", value: counts[1], color: '#F62' }
              ]}
            />
          </div>
        </div>
      );
    }
  }
}

const mSP = (state, ownProps)=>{
  return {
    reviews: state.entities.reviews

  };
};

export default connect(mSP, null)(BookStats);
