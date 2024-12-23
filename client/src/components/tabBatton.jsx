import React from 'react'
const TabBatton = ({ title, state, child, toggleState }) => {
    return (
        <div onClick={toggleState} className={`flex capitalize font-bold  min-w-[200px] border border-slate-200 h-full  ${state ? "border-b-[4px] bg-purple-100 border-b-purple-700" : ""} shadow-2xl ${child ? "text-red-400 border" : " text-slate-500  border-[rgb(101,12,174)]"}  items-center  px-2 justify-center   gap-x-20`}>
            {title}
        </div>
    )
}


export default TabBatton