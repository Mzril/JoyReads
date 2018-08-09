import React from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {fetchBooksByQuery} from './../actions/book_actions';

class BookSearch extends React.Component {

  constructor(props){
    super(props);
    this.handleSearch=this.handleSearch.bind(this);
    this.updateQuery=this.updateQuery.bind(this);
    this.state = {query: ""};
  }

  handleSearch(){
    this.props.fetchBooksByQuery(this.state.query);
    this.props.history.push("/books/searchresults");
  }

  updateQuery(e){
    this.setState({query: e.currentTarget.value});
  }

  render(){
    return(
      <span className="booksearch">
        <input onChange={this.updateQuery} className="nav-search-bar" type="search" placeholder="Search books"/>
        <i onClick={this.handleSearch} className="fa fa-search" aria-hidden="true"></i>
      </span>
    );
  }
}

const mSP = (state) => {
  return{

  };
};

const mDP = (dispatch) => {
  return {
    fetchBooksByQuery: (query)=>(dispatch(fetchBooksByQuery(query)))
  };
};


export default connect(mSP, mDP)(withRouter(BookSearch));
