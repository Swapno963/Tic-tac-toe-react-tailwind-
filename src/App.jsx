import React, { useState } from "react";

function Square({value,onSquareClick}){



  return  <button 
  className="bg-white border border-gray-400 h-12 w-12 leading-9 text-lg m-1"
  onClick={onSquareClick}
  >
  {value}
</button>
}


function Board({xIsNext,squares,onPlay}) {
  const winner = calculateWinner(squares)
  let status;
  if(winner) status = `Winner : ${winner}`
  else status = `Next Player : ${xIsNext ?'X' : 'Y'}`;


 function handelClick(i){
  // checking wheather the state is blank, if so we return
  if(squares[i] || calculateWinner(squares)) return;

  const nextSquares = squares.slice();
  if(xIsNext){
    nextSquares[i] = 'X';
  }
  else{
    nextSquares[i] = 'O';
  }
  onPlay(nextSquares)
}

  return (
    <>
    <div className="text-center xxl ">
      {status}
    </div>
      <div className="flex">
       <Square value={squares[0]} onSquareClick={()=>handelClick(0)} />
       <Square value={squares[1]} onSquareClick={()=>handelClick(1)}/>
       <Square value={squares[2]} onSquareClick={()=>handelClick(2)}/>
      </div>

      <div className="flex">
       <Square value={squares[3]} onSquareClick={()=>handelClick(3)}/>
       <Square value={squares[4]} onSquareClick={()=>handelClick(4)}/>
       <Square value={squares[5]} onSquareClick={()=>handelClick(5)}/>
      </div>

      <div className="flex">
       <Square value={squares[6]} onSquareClick={()=>handelClick(6)}/>
       <Square value={squares[7]} onSquareClick={()=>handelClick(7)}/>
       <Square value={squares[8]} onSquareClick={()=>handelClick(8)}/>
      </div>
  
    </>
  );
}

// main gamefunction

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [xIsNext, setXIsNext] = useState(true)
  const [currentMove, setCurrentMove] = useState(0)

  const currentSquares = history[currentMove]

  function handelPlay(nextSquares) {
    setXIsNext(!xIsNext);
    const nextHistory = [...history.slice(0, currentMove+1),nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length-1)
  }

  function jumpTo(move) {
    setCurrentMove(move)
    setXIsNext(move%2==0)
  }

  const moves = history.map((squares, move)=>{
    let description;
    if(move > 0) description = `Go to the move # ${move}`
    else description = 'Start The Game'

    return (
      <li key={move}>
        <button onClick={()=>jumpTo(move)}>{description}</button>
      </li>
    )
  })


  return (
   
    <div className="flex w-100 h-screen bg-sky-400 opacity-70 justify-center ">
      <div className="mr-16">
        <Board
        xIsNext={xIsNext}
        squares={currentSquares}
        onPlay={handelPlay}
        />
     </div>

      <div className="ml-8">
        <ol className="border border-gray-500 p-3 mt-8 text-lg">{moves}</ol>
      </div>
    </div>
  )
}


// calculating the winner
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}