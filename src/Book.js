import React, { Component } from "react";
import PropTypes from "prop-types";
import BookShelfChanger from "./BookShelfChanger";

/**
 * @description Component representing a single Book.
 * @constructor
 */
class Book extends Component {

 /**
 * Any change to BookShelfChanger option will invoke this, which inturn
 * will propage the book object that is being the changed and the new shelf value
 * all the way to the top App component.
 */
  handleShelfChange = shelf => {
    this.props.onShelfChange(this.props.book, shelf);
  };

  render() {
    const { book, shelves } = this.props;
    if (book.imageLinks === undefined) {
      console.log(book);
    }
    // Checking for missing imageLinks to handle books like "My First Life"
    return (
      <li>
      <div className="book">
          <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 192,
          backgroundImage: `url(${book.imageLinks && book.imageLinks.thumbnail})`
          }}></div>
          <BookShelfChanger currentShelf={book.shelf} shelves={shelves}
            onShelfChange={this.handleShelfChange} />
          </div>
          <div className="book-title">{book.title}</div>
          <div className="book-authors">{book.authors}</div>
      </div>
      </li>
    );
  }
}

Book.propTypes = {
  book: PropTypes.object.isRequired,
  shelves: PropTypes.array.isRequired,
  onShelfChange: PropTypes.func.isRequired,
};

export default Book;
