import React from 'react';
import Navbar from './navbar';
// import {connect} from 'react-redux';
import {Link, Route} from 'react-router-dom';
import BookshelvesIndex from "./bookshelves/bookshelves_index";

const Mainpage = () => {
  return (
    <div className="main-page">
      <Navbar/>
      <BookshelvesIndex/>
    </div>
  );
};

export default Mainpage;
