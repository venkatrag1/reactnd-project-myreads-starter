import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import BookShelf from "./BookShelf";

/**
 * @description Represents the "/" page. Loops over list of shelves and renders
 *              the BookShelf component with the corresponding list of books
 *              by filtering props.books on the shelf attribute. Add a link to
 *              Search page at the end/
 * @constructor
 */
const ListBooks = props => {
  const { books, shelves, onShelfChange } = props;
  // Books with shelf = none will always be empty in the list returned by get
  const displayedShelves = shelves.filter(shelf => shelf.name !== "none");
  //return JSX
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
            {displayedShelves.map(shelf => (
              <BookShelf
                key={shelf.name}
                books={books.filter(book => book.shelf === shelf.name)}
                shelfTitle={shelf.displayText}
                shelves={shelves}
                onShelfChange={onShelfChange}
              />
            ))}
        </div>
      </div>
      <div className="open-search">
        <Link
         to="/search">Add a book</Link>
      </div>
    </div>
  );
};


ListBooks.propTypes = {
  books: PropTypes.array.isRequired,
  shelves: PropTypes.array.isRequired,
  onShelfChange: PropTypes.func.isRequired,
};


export default ListBooks;
