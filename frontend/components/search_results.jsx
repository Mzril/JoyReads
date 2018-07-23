import BookshelvesIndex from "./bookshelves/bookshelves_index";
import BookTable from "./books/booktable.jsx";
import ContentHeader from "./bookshelves/content_header";
import React from 'react';

const SearchResults = (props)=> {
  return (    <div className="shelf-router">
                <div className="control-width">
                  <ContentHeader {...props}/>
                  <div className="index-table">
                    <div className="whole-aside">
                    </div>
                    <div className="right-aside">
                      <BookTable {...props}/>
                      <div className="right-below">
                      </div>
                    </div>
                  </div>
                </div>
              </div>);
};

export default SearchResults;
