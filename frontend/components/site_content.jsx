// import BookshelvesIndex from "./bookshelves/bookshelves_index";
// import BookTable from "./books/booktable.jsx";
// import ContentHeader from "./bookshelves/content_header";
import React from 'react';
import {connect} from 'react-redux';
import {Link, Route, Switch} from 'react-router-dom';
import ShelfRoute from './shelf_route.jsx';
import GoogleApi from "./books/google_api";

const SiteContent = (props) => {
  return (
    <div className="site-content">
      <Switch>
        <Route exact path="/books" component={ShelfRoute}/>
        <Route exact path="/thekonamicode" component={GoogleApi}/>
        <Route exact path='/home' render={(props) => (
          <ShelfRoute {...props}/>
        )}/>
        <Route path='/users/:userId/bookshelves' render={(props) => (
          <ShelfRoute {...props} user="hi"/>
        )}/>
        <Route path='/bookshelves/:bookshelfId' render={(props) => (
          <ShelfRoute {...props}  />
        )}/>
        <Route path="/books/:id">
          <div>
            I am a BookShowPage
          </div>
        </Route>
        <Route path="/users/:id">
          <div>
            I am a UserShowPage
          </div>
        </Route>
        <Route path="/bookshelves" component={ShelfRoute}/>
      </Switch>
    </div>
  );
};



export default SiteContent;
