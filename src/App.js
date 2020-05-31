import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ListBooks from './ListBooks'


class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({ books });
    })
  }

  updateShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(res => {
      this.setState((currentState) => {
        book.shelf = shelf;
        const bookToUpdate = currentState.books.find(
            currentBook => currentBook.id === book.id);
        (bookToUpdate === undefined && currentState.books.push(book)) || (bookToUpdate.shelf = book.shelf);
        return currentState;
      });
    }
    )
  }

  render() {
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

    return (
      <div className="app">
      <ListBooks books={this.state.books} shelves={shelves} onShelfChange={this.updateShelf}/>
      </div>
    )
  }
}

export default BooksApp
