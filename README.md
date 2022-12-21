# Joyreads

[Live Site](https://mysite-u60m.onrender.com/#/)

Joyreads is a single-page web application for reviewing and organizing books. Inspired by Goodreads, Joyreads aims to improve the user experience with minimal loading and immediate responsiveness made possible by new technologies.

## Basic Features
  * Books
    * Books 
    * 
  * Bookshelves
    * Bookshelves allow users to organize their books as well as allow them to be seen by other users.
    * Users can create, delete, or rename their shelves at anytime.
    * Users can also switch quickly between the bookshelves they are viewing with very minimal load times.
  * Reviews
    * Aggregated review scores are shown when viewing a single book.
    * Users can leave review scores through the review bar, and leave comments about their review when viewing a single book.
  * Read Statuses
    * Each book added to a user's shelves will have a status. If a status is not given when adding a book to a shelf or leaving a review, this will default to "Read"
    * Each status ("Read", "Currently Reading", "Want to Read") is linked to an exclusive bookshelf, one which cannot be deleted and where a single book may be present in only one of those bookshelves at a time.
    
## Technologies Used
 * Backend
   * Database: PostgreSQL 
   * Routing, Controllers, and Model: Ruby on Rails
   * AWS Storage
 * Frontend
   * React/Redux
   * jQuery 
   * HTML5/CSS3

## Additional Feature Showcase

Below are some additional features along with their code snippits and some gifs. 

### Google Books API

![](https://github.com/Mzril/JoyReads/blob/master/gifs/adminconsole.gif)

### Book Search

![](https://github.com/Mzril/JoyReads/blob/master/gifs/booksearching.gif)

### Viewing Other Users' collections

![](https://github.com/Mzril/JoyReads/blob/master/gifs/otherusers.gif)

### Layout Options

![](https://github.com/Mzril/JoyReads/blob/master/gifs/flexlayout.gif)

## Future Work

### Review Wheel (In progress!)

![](https://github.com/Mzril/JoyReads/blob/master/gifs/reviewwheel.gif)

### The ability to recommend books to other users (will show up as a bookshelf under my books)
