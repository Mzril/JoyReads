import BookshelvesIndex from "./bookshelves/bookshelves_index";
import BookTable from "./books/booktable.jsx";
import ContentHeader from "./bookshelves/content_header";
import React from 'react';
import {connect} from 'react-redux';
import {Link, Route, Switch} from 'react-router-dom';

const SiteContent = (props) => {
  // <Switch>
  //   <Route></Route>
  // </Switch>
  return (
    <div className="site-content">
      <ContentHeader/>
      <div className="index-table">
        <div className="whole-aside">
          <BookshelvesIndex/>
        </div>
        <BookTable/>
      </div>
    </div>
  );
};



export default SiteContent;
