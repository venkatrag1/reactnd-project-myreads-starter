import React from "react";
import { Route } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import ListBooks from "./ListBooks";
import SearchBooks from "./SearchBooks";
import "./App.css";

/**
 * @description Main app component that routes to ListBooks and SearchBooks and
 *              handles common data state and BooksAPI calls.
 * @constructor
 */
class BooksApp extends React.Component {
  /**
   * Tracks the list of books currently in one of shelves, and trigger render on
   * additions or change in attribute, particularly the shelf value.
   */
  state = {
    books: []
  }

  /**
   * Initial call to get list of books on shelf using BooksAPI.
   */
  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({ books });
    });
  }

  /**
   * Method to allow inverse flow to allow a book to update backend using API
   * and update App state. Triggered when a new book is added (find returns
   * undefined on current list) or existing book (find locates the book in shelf
   * that has the same ID as the passed book) is moved to a different shelf.
   */
  updateShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(res => {
      this.setState((currentState) => {
        book.shelf = shelf;
        const bookToUpdate = currentState.books.find(
            currentBook => currentBook.id === book.id);
        bookToUpdate === undefined ? currentState.books.push(book) : (
          bookToUpdate.shelf = book.shelf);
        return currentState;
      });
    }
    )
  }

  render() {
    /**
     * Order the shelves and define display name for rendering by children on
     * both routes.
     */
    const shelves = [
      {
        name: "currentlyReading",
        displayText: "Currently Reading"
      },
      {
        name: "wantToRead",
        displayText: "Want To Read"
      },
      {
        name: "read",
        displayText: "Read"
      },
      {
        name: "none",
        displayText: "None"
      }
    ];

    // Pass search from here to limit direct API calls to only this component
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <ListBooks books={this.state.books} shelves={shelves}
            onShelfChange={this.updateShelf} />
        )} />
        <Route path="/search" render={() => (
          <SearchBooks books={this.state.books} shelves={shelves}
            onShelfChange={this.updateShelf}
            search={query => BooksAPI.search(query)}/>
        )} />
      </div>
    )
  }
}

export default BooksApp;
