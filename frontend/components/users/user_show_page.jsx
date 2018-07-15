import BookTable from "./../books/booktable.jsx";
import React from 'react';
import {Link} from 'react-router-dom';

class UserShowPage extends React.Component{

  constructor(props){
    super(props);
  }

  render(){
    return(
      <div className="user-show-page">
        UserShow
      </div>
    );
  }
}

export default UserShowPage;
