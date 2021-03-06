import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import debounce from "lodash.debounce";
import Book from "./Book";

/**
 * @description Represents the Search Page.
 * @constructor
 */
class SearchBooks extends Component {
  /**
   * Tracks the list of books matching entry in input field, with the correct
   * shelf value added to the search result by comparing against books in shelf.
   */
  state = {
    matchingBooks: []
  }

  /**
   * For empty query, empty the matching books directly without incurring API
   * call. Otherwise, resolve the search promise and check for errors such as
   * "empty query". Then check the list of books returned by search against
   * books in shelf. Set the shelf attribute if the book already exists in shelf
   * or else set shelf to None. Set the matchingBooks state after adding the
   * shelf attribute to all books.
   */
  updateMatchingBooks = (query) => {
    query = query.trim();
    (query === "" || query === undefined) ? this.setState({matchingBooks: []}) : (
      this.props.search(query).then(searchResults => {
        searchResults.error ? console.log(searchResults.error) : this.setState({
          matchingBooks: searchResults.map(matchingBook => {
            const bookInShelf = this.props.books.find(
              book => book.id === matchingBook.id
            );
            matchingBook.shelf = (bookInShelf === undefined) ? "none" : bookInShelf.shelf;
            return matchingBook;
          })
        });
      })
    );
  }

/** Debounce the API calls by 250ms to prevent too many API calls when fast
 * backspacing etc.
 */
  handleInputChange = debounce(this.updateMatchingBooks, 250);

  render() {
    const { shelves, onShelfChange } = this.props;
    const { matchingBooks } = this.state;
    return (
      <div className="search-books">
        <div className="search-books-bar">
            <Link to="/" className="close-search">Close</Link>
            <div className="search-books-input-wrapper">
            {/*
                NOTES: The search from BooksAPI is limited to a particular set of search terms.
                You can find these search terms here:
                https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                However, remember that the BooksAPI.search method DOES search by title or author. So, don"t worry if
                you don"t find a specific author or title. Every search is limited by search terms.
            */}
            <input type="text" placeholder="Search by title or author"
            onChange={(event) => this.handleInputChange(event.target.value)}/>
            </div>
        </div>
        <div className="search-books-results">
            <ol className="books-grid">
              {matchingBooks.map(book => (
                <Book key={book.id} book={book} shelves={shelves}
                 onShelfChange={onShelfChange} />
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
