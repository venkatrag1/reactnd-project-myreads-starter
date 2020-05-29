import React from 'react';
import PropTypes from 'prop-types';

const BookShelfChanger = props => {
  const { currentValue, availableShelves, onChange } = props;
  //return JSX
  return (
    <div className="book-shelf-changer">
        <select onChange={onChange} value={currentValue}>
        <option value="move" disabled>Move to...</option>
        {availableShelves.map(shelf => (
            <option value={shelf.value}>{shelf.text}</option>
        ))}
        </select>
    </div>
  );
};

BookShelfChanger.propTypes = {
  currentValue: PropTypes.string.isRequired,
  availableShelves: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
};


export default BookShelfChanger;
