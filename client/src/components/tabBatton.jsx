import React from 'react'
const TabBatton = ({ title, length, state, child, toggleState }) => {
    return (
        <div onClick={toggleState} className={`flex capitalize ${length && `w-1/${length}`} font-bold  min-w-[200px] border border-slate-200 h-full  ${state ? "border-b-[4px] bg-blue-100 border-b-blue-700" : ""} shadow-2xl ${child ? "text-red-400 border" : " text-slate-500  border-[#98daf8]"}  items-center  px-2 justify-center   gap-x-20`}>
            {title}
        </div>
    )
}


export default TabBatton