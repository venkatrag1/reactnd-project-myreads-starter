import React from 'react';
import PropTypes from 'prop-types';
import Book from './Book';

const BookShelf = props => {
  const { books, shelfTitle, shelves, onShelfChange } = props;
  //return JSX
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{shelfTitle}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map(book => (
            <Book key={book.id} book={book} shelves={shelves} onShelfChange={onShelfChange} />
          ))}
        </ol>
      </div>
    </div>
  );
};

BookShelf.propTypes = {
  books: PropTypes.array.isRequired,
  shelfTitle: PropTypes.string.isRequired,
  shelves: PropTypes.array.isRequired,
  onShelfChange: PropTypes.func.isRequired,
};

export default BookShelf;
