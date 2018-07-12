import React from 'react';
import Navbar from './navbar';
import Footer from './footer';
// import {connect} from 'react-redux';
import {Link, Route} from 'react-router-dom';
import BookshelvesIndex from "./bookshelves/bookshelves_index";
import BookTable from "./books/booktable.jsx";
import ContentHeader from "./bookshelves/content_header";

const Mainpage = () => {
  return (
    <div className="main-page">
      <Navbar/>
      <div className="site-content">
        <ContentHeader/>
        <div className="index-table">
          <div className="whole-aside">
            <BookshelvesIndex/>
          </div>
          <BookTable/>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Mainpage;
