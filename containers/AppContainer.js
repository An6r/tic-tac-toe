import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as gameActions from '../actions/game';

import Board from '../components/Board';
import Modal from '../components/Modal';
import Button from '../components/Button';

export class AppContainer extends Component {
	constructor(props) {
		super(props);
				
		this.isWinnerMark = this.isWinnerMark.bind(this);		
		this.handleCellClick = this.handleCellClick.bind(this);		
		this.getPlayerSymbol = this.getPlayerSymbol.bind(this);		
	}
	
	isWinnerMark(column, index) {
		const { winnerMarks } = this.props;

		if (!winnerMarks || !winnerMarks[column]) {
			return false;
		}

		return winnerMarks[column].indexOf(index) !== -1;
	}
	
	handleCellClick(column, row) {
		const {
			boardGrid,
			winnerPlayer,
			actions: {
				newSignOnBoard
			}
		} = this.props;

		if (boardGrid[column][row] || winnerPlayer) {
			return null;
		}

		return newSignOnBoard(column, row);
	}
	
	getPlayerSymbol(player) {
		return this.props.playersSymbols[player] || null;
	}
	
	render() {
		const {
			boardGrid,
			currentPlayer,
			winnerMarks,
			winnerPlayer,
			isTie,
			marksCount,
			actions: {
				restartGame
			}
		} = this.props;
		
		return (
			<div className='wrapper'>
				<h1 className='main-title'>Tic-Tac-Toe!</h1>
				
				<Board grid={boardGrid}
					   winnerMarks={winnerMarks}
                       handleCellClick={this.handleCellClick}
					   isWinnerMark={this.isWinnerMark}
					   getPlayerSymbol={this.getPlayerSymbol}
				/>
				
				<div className='current-player'>
					Current player: {currentPlayer}
				</div>
				
				{marksCount > 0 && (
					<div className='actions-wrapper'>
						<Button icon='refresh'
						        onClick={() => restartGame()}
						        label='Restart'
						/>
					</div>
				)}
				
				
				<Modal show={isTie || !!winnerPlayer}
					   onClose={() => restartGame()}>
					{isTie && (<h1 className='title'>It is a tie!</h1>)}

					{winnerPlayer && (
						<h1 className='title'>Player {winnerPlayer} wins!</h1>
					)}

					<div className='actions-wrapper'>
						<Button name='restart'
								icon='play'
								onClick={() => restartGame()}
								label='New Game'
						/>
					</div>
				</Modal>
			</div>
		);
	}
};

AppContainer.propTypes = {
    boardGrid: PropTypes.arrayOf(
      PropTypes.arrayOf(
        PropTypes.number,
      ).isRequired,
    ).isRequired,
    currentPlayer: PropTypes.number.isRequired,
    winnerPlayer: PropTypes.number,
    isTie: PropTypes.bool.isRequired,
    playersSymbols: PropTypes.object,
    marksCount: PropTypes.number,
    actions: PropTypes.shape({
      restartGame: PropTypes.func.isRequired,
      newSignOnBoard: PropTypes.func.isRequired
    }),
};

const mapStateToProps = ({ game }) => ({ ...game });
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(gameActions, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
