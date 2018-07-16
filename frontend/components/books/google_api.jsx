import React from 'react';
import {Redirect, withRouter} from 'react-router-dom';
import {connect} from "react-redux";
import {createApiBooks} from "./../../actions/book_actions";
import * as BookAPIUtil from "./../../util/book_api_util";

class GoogleApi extends React.Component{

  constructor(props){
    super(props);
    this.state = {data: [], query: ""};
  }

  handleChange(e){
    this.setState({query: e.currentTarget.value});
  }

  handleSubmit(e){
    e.preventDefault();
    BookAPIUtil.fetchFromApi(this.state.query).then((response)=> {
      this.setState({data: response.items});
    });
  }

  handleDispatch(){
    this.props.createApiBooks(this.state.data);
  }

  handleOne(e){
    const idx = e.currentTarget.getAttribute("derp");
    this.props.createApiBooks([this.state.data[idx]]).then((response)=>(this.props.history.push(`/books/${response.books[0].id}`)));
  }
  render(){
    if(this.props.currentUser !==undefined && this.props.currentUser.username === "Admin" ){
      const results = [];
      for (var i = 0; i < this.state.data.length; i++) {
        const book = this.state.data[i];
        if(!book.volumeInfo.imageLinks){
          continue;
        } else{
          results.push(<div key={i}><li >{`${book.volumeInfo.title}`}</li>
              <img className="book-image" src={`${book.volumeInfo.imageLinks.thumbnail}`}/>
              <button derp={i} onClick={this.handleOne.bind(this)}>Add This to DB</button>
            </div>);
        }
      }
      return (
        <div className="api">
          <div className="api-search">
            Secret Seed Console!
            <input id="google-search" type="search"  onChange={this.handleChange.bind(this)} placeholder="Load Books"/>
            <button onClick={this.handleSubmit.bind(this)} type="submit">Search!</button>
            <button onClick={this.handleDispatch.bind(this)}>Add to all DB</button>
          </div>
          <div className= "api-results">
            Is the book you want in here? Click Add to DB if so!
            <div className = "api-result">
              {results}
            </div>
          </div>
        </div>
      );
    } else {
      return <Redirect to="/"/>;
    }
  }
}

const mSP = (state, ownProps) =>{
  return {
    currentUser: state.entities.users[state.session.currentUserId],
  };
};

const mDP = (dispatch, ownProps)=>{
  return {
    createApiBooks: (data) => dispatch(createApiBooks(data))
  };
};


export default connect(mSP, mDP)(withRouter(GoogleApi));
