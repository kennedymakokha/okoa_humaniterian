// src/App.js
import React, { useState } from 'react';


const initialBoard = [
    // Add a sample Sudoku puzzle here (0 for empty cells)
    ["10:10", "", "1:30", "", "3:20", ],
    ["1:10", "", "", "", "3:20", ],
    ["10:10", "", "1:30", "", "3:20", ],
    ["10:10", "", "1:30", "", "3:20", ],
    ["10:10", "", "1:30", "", "3:20", ],
   
];

const TimeTable = () => {
    const [board, setBoard] = useState(initialBoard);

    const handleChange = (row, col, value) => {
        const newBoard = board.map(r => [...r]);
        newBoard[row][col] = value ? parseInt(value) : 0; // Update value or set to 0
        setBoard(newBoard);
    };

    return (

        <div className="flex justify-center flex-col  md:px-0 px-2 items-center ">
            <h2>weekly TimeTable</h2>
            <div className="grid grid-cols-9 gap-1">
                {board.map((row, rowIndex) => (
                    row.map((cell, colIndex) => (
                        <div className={`md:w-10 w-8 md:h-10 h-8 text-center border ${cell !== "" ? "bg-blue-300":"bg-slate-50"} flex items-center justify-center text-sm border-blue-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500`} key={`${rowIndex}-${colIndex}`}>{cell}</div>
                     
                    ))
                ))}
            </div>
        </div>

    );
};

export default TimeTable;
