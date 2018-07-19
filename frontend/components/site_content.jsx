// import BookshelvesIndex from "./bookshelves/bookshelves_index";
import BookTable from "./books/booktable.jsx";
// import ContentHeader from "./bookshelves/content_header";
import React from 'react';
import {connect} from 'react-redux';
import {Link, Route, Switch, Redirect, withRouter} from 'react-router-dom';
import ShelfRoute from './shelf_route.jsx';
import GoogleApi from "./books/google_api";
import UserShowPage from "./users/user_show_page";
import BookShowPage from "./books/book_show_page";

const SiteContent = (props) => {
  let addClass="";
  if(props.match.params.bookId){
    addClass= " darken";
  }
  return (
    <div id="site-content" className={"site-content"+ addClass}>
      <Switch>
        <Route exact path="/books" component={ShelfRoute}/>
        <Route exact path="/thekonamicode" component={GoogleApi}/>
        <Route exact path='/home' render={(props) => (
          <ShelfRoute {...props}/>
        )}/>
        <Route path='/users/:username/bookshelves' render={(props) => (
          <ShelfRoute {...props} />
        )}/>
        <Route path='/bookshelves/:bookshelfId' render={(props) => (
          <ShelfRoute {...props}  />
        )}/>
        <Route path='/books/:bookId' render={(props) => (
          <BookShowPage {...props}  />
        )}/>
        <Route path='/users/:username' render={(props) => (
          <UserShowPage {...props}  />
        )}/>
        <Route path="/bookshelves" component={ShelfRoute}/>
        <Redirect to='/home'/>
      </Switch>
    </div>
  );
};



export default SiteContent;
