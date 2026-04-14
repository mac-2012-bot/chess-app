import React, { useState } from 'react';
import './App.css';

function ChessBoard() {
  const [board, setBoard] = useState([
    ['♜', '♞', '♝', '♛', '♚', '♝', '♞', '♜'],
    ['♟', '♟', '♟', '♟', '♟', '♟', '♟', '♟'],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    ['♙', '♙', '♙', '♙', '♙', '♙', '♙', '♙'],
    ['♖', '♘', '♗', '♕', '♔', '♗', '♘', '♖']
  ]);

  const [selectedPiece, setSelectedPiece] = useState(null);
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [currentPlayer, setCurrentPlayer] = useState('white');
  const [gameStatus, setGameStatus] = useState('White to move');

  const handleSquareClick = (row, col) => {
    const piece = board[row][col];

    // Se não há peça selecionada
    if (!selectedPiece) {
      if (piece !== ' ' && 
          ((currentPlayer === 'white' && piece === piece.toUpperCase()) ||
           (currentPlayer === 'black' && piece === piece.toLowerCase()))) {
        setSelectedPiece(piece);
        setSelectedPosition({ row, col });
      }
    } else {
      // Se clicou na mesma peça
      if (row === selectedPosition.row && col === selectedPosition.col) {
        setSelectedPiece(null);
        setSelectedPosition(null);
        return;
      }

      // Move a peça
      const newBoard = board.map(row => [...row]);
      newBoard[selectedPosition.row][selectedPosition.col] = ' ';
      newBoard[row][col] = selectedPiece;

      setBoard(newBoard);
      setSelectedPiece(null);
      setSelectedPosition(null);
      setCurrentPlayer(currentPlayer === 'white' ? 'black' : 'white');
      setGameStatus(`${currentPlayer === 'white' ? 'Black' : 'White'} to move`);
    }
  };

  const isDarkSquare = (row, col) => {
    return (row + col) % 2 === 1;
  };

  return (
    <div className="chess-app">
      <h1>♟️ Chess Game</h1>
      <div className="game-status">{gameStatus}</div>
      <div className="chess-board">
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="chess-row">
            {row.map((piece, colIndex) => (
              <div
                key={colIndex}
                className={`chess-square ${isDarkSquare(rowIndex, colIndex) ? 'dark' : 'light'} ${
                  selectedPosition && selectedPosition.row === rowIndex && selectedPosition.col === colIndex ? 'selected' : ''
                }`}
                onClick={() => handleSquareClick(rowIndex, colIndex)}
              >
                {piece !== ' ' && <span className="chess-piece">{piece}</span>}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="instructions">
        <p>📝 Instructions:</p>
        <p>1. Click on a piece to select it</p>
        <p>2. Click on an empty square to move the piece</p>
        <p>3. White pieces move first, then black</p>
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="app">
      <ChessBoard />
    </div>
  );
}

export default App;