import React from 'react';
import { PropTypes } from 'prop-types';
import cn from 'classnames';
import { SYMBOLS } from '../helpers/game';
import FontAwesome from 'react-fontawesome';

const BoardSpace = ({ column, index, value, handleCellClick, isWinnerMark, getPlayerSymbol }) => {
	const icon = (value) ? SYMBOLS[getPlayerSymbol(value)] : null;

	const cellClasses = cn('board-cell', {
		'winner-board-cell': (isWinnerMark(column, index))
	});

	return (
		<li className={cellClasses}
		  onClick={() => handleCellClick(column, index)}
		>
			{(value !== null) ?
				<FontAwesome name={icon} /> : null
			}
		</li>
	);
};

BoardSpace.propTypes = {
  column: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  value: PropTypes.number,
  handleCellClick: PropTypes.func.isRequired,
  /**
   * A function to check if the board space is in the winner marks.
   */
  isWinnerMark: PropTypes.func.isRequired,
  getPlayerSymbol: PropTypes.func.isRequired
};

export default BoardSpace;