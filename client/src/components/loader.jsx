import React from 'react'
import { LoaderIMage } from './sidebar/images'

function Loader() {
    return (
        <div className="flex w-6 h-6 items-center justify-center bg-slate-5000">
            <img src={LoaderIMage} alt="" className='animate-spin w-full h-full' />
        </div>
    )
}

export default Loader