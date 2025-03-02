import React from 'react'

const DashbordCard = ({
    title, body
}) => {
    return (
        <div className=" flex-col box-shadow overflow-hidden ">
            {title && <div className="flex w-full h-[10%] border-b border-slate-200 font-bold  items-center px-4">
                {title}
            </div>}

            <div className="flex w-full h-[90%] ">
                {body}
            </div>
        </div>
    )
}

export default DashbordCard