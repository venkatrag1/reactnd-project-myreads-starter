import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Book from './Book';

class SearchBooks extends Component {

  state = {
    query: '',
    matchingBooks: []
  }

  componentDidMount() {
    console.log(this.state.matchingBooks);
  }

  handleInputChange = (event) => {
    event.preventDefault();
    const query = event.target.value.trim();
    (query === '' || query === undefined) ? this.setState({query: '', matchingBooks: []}) : (
      this.props.search(query).then(searchResults => {
        searchResults.error ? console.log(searchResults.error) : this.setState({
          query: query,
          matchingBooks: searchResults.map(matchingBook => {
            const bookInShelf = this.props.books.find(
              book => book.id === matchingBook.id
            );
            matchingBook.shelf = (bookInShelf === undefined) ? 'none' : bookInShelf.shelf;
            return matchingBook;
          })
        });
      })
    );
  }

  render() {
    console.log(this.state.matchingBooks);
    const { shelves, onShelfChange } = this.props;
    const { query , matchingBooks } = this.state;
    return (
      <div className="search-books">
        <div className="search-books-bar">
            <Link to="/" className="close-search">Close</Link>
            <div className="search-books-input-wrapper">
            {/*
                NOTES: The search from BooksAPI is limited to a particular set of search terms.
                You can find these search terms here:
                https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input type="text" value={query} placeholder="Search by title or author" onChange={this.handleInputChange}/>
            </div>
        </div>
        <div className="search-books-results">
            <ol className="books-grid">
              {matchingBooks.map(book => (
                <Book key={book.id} book={book} shelves={shelves} onShelfChange={onShelfChange} />
              ))}
            </ol>
        </div>
      </div>
    );
  }
}

SearchBooks.propTypes = {
  books: PropTypes.array.isRequired,
  shelves: PropTypes.array.isRequired,
  onShelfChange: PropTypes.func.isRequired,
  search: PropTypes.func.isRequired
};

export default SearchBooks;
