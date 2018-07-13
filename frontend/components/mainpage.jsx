import React from 'react';
import Navbar from './navbar';
import Footer from './footer';
import {connect} from 'react-redux';
import {Link, Route, Switch} from 'react-router-dom';
import SiteContent from "./site_content";

const Mainpage = () => {
  return (
    <div className="main-page">
      <Navbar/>
      <SiteContent/>
      <Footer/>
    </div>
  );
};

export default Mainpage;
