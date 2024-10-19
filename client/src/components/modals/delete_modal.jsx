import React from 'react'


function Delete_Modal({ setPopUp,submit, name, item, cancel }) {
    return (
        <div className='w-screen h-screen bg-black bg-opacity-30 fixed top-0 right-0 flex justify-center items-center'>
            <div className='bg-white p-10 rounded-md shadow-md'>
                <h1 className='font-bold text-center text-lg my-5'>Delete {name}</h1>
                <p>

                    <p className='bg-[#ffe9d9] p-2 border-[#fa703f] text-[#bc4c2e] flex flex-col items-center  text-sm my-1'>
                        <span className='text-[#771505] font-bold flex items-center justi gap-1'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-16 text-red-400">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                            </svg>

                            {/* Warning */}
                        </span>
                        {/* By Deleting this account, you won't be able to access the system. */}
                        Are you sure you want to delete <b>{item.name}</b>
                    </p>
                </p>
                <div className='flex justify-between mt-5 gap-x-2'>
                    <button className='rounded-md outline-[#101f20] bg-[#101f20] text-white py-2 px-2 hover:bg-transparent hover:text-black'
                        onClick={() => { setPopUp(false); cancel() }}
                    >No, Cancel</button>
                    <button className=' rounded-md outline-[#101f20] hover:bg-[#101f20] hover:text-white py-2 px-2 bg-red-500 text-white'
                        onClick={() => { submit(); cancel() }}
                    >Yes, Delete</button>
                </div>
            </div>
        </div>
    )
}

export default Delete_Modal