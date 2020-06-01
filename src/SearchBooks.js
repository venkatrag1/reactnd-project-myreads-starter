import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Book from './Book';

class SearchBooks extends Component {

   state = {
       query: 'Satire'
   }

  render() {
    console.log(`Matching books for ${this.state.query}`);
    this.props.getMatchingBooks(this.state.query);
    return (
      <div className="search-books">
        <div className="search-books-bar">
            <button className="close-search" onClick={() => this.setState({ query: '' })}>Close</button>
            <div className="search-books-input-wrapper">
            {/*
                NOTES: The search from BooksAPI is limited to a particular set of search terms.
                You can find these search terms here:
                https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input type="text" placeholder="Search by title or author"/>

            </div>
        </div>
        <div className="search-books-results">
            <ol className="books-grid"></ol>
        </div>
      </div>
    );
  }
}

SearchBooks.propTypes = {
  getMatchingBooks: PropTypes.func.isRequired,
  shelves: PropTypes.array.isRequired,
  onShelfChange: PropTypes.func.isRequired,
};

export default SearchBooks;
