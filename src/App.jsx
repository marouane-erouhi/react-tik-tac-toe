import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [gameBoard, setGameBoard] = useState(new Array(9).fill(null))
  const [currentPlayer, setCurrentplayer] = useState(null)
  const [gameOver, setGameOver] = useState(true)

  /*
  States:
  - null : empty
  - p1 : player 1
  - p2 : player 2
  */
  const switchPlayer = () => {
    setCurrentplayer(currentPlayer === 'p1' ? 'p2' : 'p1')
  }
  const resetGame = () => {
    setGameOver(true)
    setGameBoard(new Array(9).fill(null))
    setCurrentplayer('p1')
  }
  const toggleCell = (cell_index) => {
    if(gameBoard[cell_index] !== null){
      console.log('current cell is already full')
      return
    }

    console.log('cell changing', cell_index, gameBoard)
    gameBoard[cell_index] = currentPlayer
    setGameBoard(gameBoard)

  }
  const checkGameOver = () => {
    return (
      //across
      (gameBoard[0] !== null && gameBoard[0] === gameBoard[1] && gameBoard[1] === gameBoard[2]) ||
      (gameBoard[3] !== null && gameBoard[3] === gameBoard[4] && gameBoard[4] === gameBoard[5]) ||
      (gameBoard[6] !== null && gameBoard[6] === gameBoard[7] && gameBoard[7] === gameBoard[8]) ||
      // down
      (gameBoard[0] !== null && gameBoard[0] === gameBoard[3] && gameBoard[3] === gameBoard[6]) ||
      (gameBoard[1] !== null && gameBoard[1] === gameBoard[4] && gameBoard[4] === gameBoard[7]) ||
      (gameBoard[2] !== null && gameBoard[2] === gameBoard[5] && gameBoard[5] === gameBoard[8]) ||
      // diagonals
      (gameBoard[0] !== null && gameBoard[0] === gameBoard[4] && gameBoard[4] === gameBoard[8]) ||
      (gameBoard[2] !== null && gameBoard[2] === gameBoard[4] && gameBoard[4] === gameBoard[6])
    )
  }

  const onClick = e => {
    const cell_i = e.target.getAttribute("data-cell-number")
    toggleCell(cell_i)
    if (checkGameOver()) {
      console.log(`${currentPlayer}, wins`)
      console.log('gameBoard:', gameBoard)
      setGameOver(true)
      return
    }
    switchPlayer()
  }

  const drawGameBoard = (gameBoard) => {
    return gameBoard.map((val, i) => {
        return <button key={i} data-cell-number={i} onClick={onClick}>{val}</button>
      })
  }
  const startGame = () => {
    resetGame()
    setGameOver(false)
  }

  return (
    <>
      <h1>Let's play tic tac toe</h1>
      <div className={`game-board`} >
        <div className={`board-cover ${gameOver ? '' : 'hidden'}`}>
          {currentPlayer ? <h2 className='player-win-banner'>{`${currentPlayer} Wins`}</h2> : ''}
          <button onClick={startGame}>{currentPlayer ? 'Restart' : 'Start'} game</button>
        </div>
        {drawGameBoard(gameBoard)}
      </div>
    </>
  )
}

export default App
