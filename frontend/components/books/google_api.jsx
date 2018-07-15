import React from 'react';
import {Redirect} from 'react-router-dom';
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
    this.props.createApiBooks([this.state.data[idx]]);
  }

  render(){

    if(this.props.currentUser !==undefined && this.props.currentUser.username === "Admin" ){
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
              {this.state.data.map((book,i) =>
                <div key={i}><li >{`${book.volumeInfo.title}`}</li>
                  <img className="book-image" src={`${book.volumeInfo.imageLinks.thumbnail}`}/>
                  <button derp={i} onClick={this.handleOne.bind(this)}>Add This to DB</button>
                </div>)
              }
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


export default connect(mSP, mDP)(GoogleApi);
