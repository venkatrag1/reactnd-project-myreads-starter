import React, { Component } from 'react';
import PropTypes from 'prop-types';

class BookShelfChanger extends Component {

  handleShelfChange = event => {
    const { value } = event.target;
    this.props.onShelfChange(value);
  }

  render() {
    const { currentShelf, shelves} = this.props;
    //return JSX
    return (
      <div className="book-shelf-changer">
        <select onChange={this.handleShelfChange} value={currentShelf}>
        <option value="move" disabled>Move to...</option>
        {shelves.map(shelf => (
          <option key={shelf.name} value={shelf.name}>{shelf.displayText}</option>
        ))}
        </select>
      </div>
    );
  }
}

BookShelfChanger.propTypes = {
  currentShelf: PropTypes.string.isRequired,
  shelves: PropTypes.array.isRequired,
  onShelfChange: PropTypes.func.isRequired,
};


export default BookShelfChanger;
