import React from 'react'
import IMG from './../assets/403.svg'
import { Link } from 'react-router-dom'
function Unauthorized() {
    return (
        <div className="flex h-[70vh] gap-3 flex-col items-center justify-center ">
            <img src={IMG} alt="" className="h-full" />
            <div className="flex text-lg font-bold bg-red-800 text-white uppercase px-3">
                You are not allowed to view this page
            </div>
            <Link to="/" className='bg-[#98DAF8] text-red-500 px-2 shadow-2xl rounded-sm flex items-center justify-center font-bold' > Home</Link>
        </div>

    )
}

export default Unauthorized