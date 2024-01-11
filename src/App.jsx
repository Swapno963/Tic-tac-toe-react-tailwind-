import React, { useState } from "react";

function Square({value,onSquareClick}){



  return  <button 
  className="bg-white border border-gray-400 h-12 w-12 leading-9 text-lg m-1"
  onClick={onSquareClick}
  >
  {value}
</button>
}


export default function Board() {
  const [squares, setSuares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true)
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
  setSuares(nextSquares)
  setXIsNext(!xIsNext) // Toggle xIsNext value
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