import React from 'react';
import { PropTypes } from 'prop-types';
import BoardCell from './BoardCell';

const Board = ({ grid, handleCellClick, isWinnerMark, getPlayerSymbol }) => (
  <ul className='grid'>
    {grid.map((rows, rowColumn) =>
      rows.map((row, rowIndex) => (
        <BoardCell key={`row-${rowIndex}-${rowColumn}`}
                   column={rowColumn}
				   value={row}
				   index={rowIndex}
				   handleCellClick={handleCellClick}
				   isWinnerMark={isWinnerMark}
				   getPlayerSymbol={getPlayerSymbol}
        />
      )),
    )}
  </ul>
);

Board.propTypes = {
  grid: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.number,
    ).isRequired,
  ).isRequired,
  handleCellClick: PropTypes.func.isRequired,
  /**
   * A function to check if the board space is in the winner marks.
   */
  isWinnerMark: PropTypes.func.isRequired,
  getPlayerSymbol: PropTypes.func.isRequired
};

export default Board;