// src/App.js
import React, { useState } from 'react';

const initialBoard = [

    [{ day: "Mon", time: "10:10" }, { day: "Mon", time: "" }, { day: "Mon", time: "10:10" }, { day: "Mon", time: "" }, { day: "Mon", time: "1:10" },],
    [{ day: "Tue", time: "" }, { day: "Tue", time: "10:30" }, { day: "Tue", time: "10:10" }, { day: "Tue", time: "11:40" }, { day: "Tue", time: "" },],
    [{ day: "Wed", time: "" }, { day: "Wed", time: "" }, { day: "Wed", time: "" }, { day: "Wed", time: "" }, { day: "Wed", time: "" },],
    [{ day: "Thur", time: "10:10" }, { day: "Thur", time: "" }, { day: "Thur", time: "10:10" }, { day: "Thur", time: "" }, { day: "Thur", time: "1:10" },],
    [{ day: "Fri", time: "" }, { day: "Fri", time: "10:30" }, { day: "Fri", time: "10:10" }, { day: "Fri", time: "11:40" }, { day: "Fri", time: "" },],
 

];

const TimeTable = () => {
    const [board, setBoard] = useState(initialBoard);
    return (

        <div className="flex justify-center w-full flex-col  md:px-0 px-2 items-center ">
            <h2>weekly TimeTable</h2>
            <div className="grid grid-cols-5 gap-1 w-full">
                {["10am-11am", "11am-12pm", "12pm-1pm", "2pm-3pm", "3pm-4pm",].map((row, rowIndex) => (<div className=' '>{row}</div>))}
                {board.map((row, rowIndex) => (<>
                    {
                        row.map((cell, colIndex) => (
                            <div className={`md:w-32 w-8 md:h-14  flex-col h-8 text-center border ${cell.time !== "" ? "bg-blue-300" : "bg-slate-50"} flex items-center justify-center text-sm border-blue-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500`} key={`${rowIndex}-${colIndex}`}>
                                <span>{cell.day}</span>
                                {/* <span>{cell.time}</span> */}
                            </div>

                        ))}
                </>

                ))}
            </div>
        </div>

    );
};

export default TimeTable;
