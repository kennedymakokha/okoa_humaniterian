import React from 'react'


function Create_Modal({ setPopUp, cancel, error, submit, item, name, body }) {
 
    return (
        <div className={`w-screen h-screen ${error ? "bg-black bg-opacity-90 gap-y-10" : "bg-black bg-opacity-30"} flex-col fixed top-0 right-0 flex justify-center items-center`}>
            <h2 className="text-red-500 font-bold">{error}</h2>
            <div className='bg-white min-w-[800px] p-10 rounded-md shadow-md'>
                <h1 className='font-bold text-center text-lg my-5 uppercase text-[rgb(101,12,174)]'>Create a new {name}</h1>
                {body}
                <div className='flex justify-between mt-5'>
                    <button className='outline  rounded-md  outline-1 outline-[#101f20] bg-[#101f20] text-white py-2 px-4 hover:bg-transparent hover:text-black'
                        onClick={() => { setPopUp(false); cancel() }}
                    > Cancel</button>
                    <button className='outline rounded-md bg-green-500 outline-1 outline-[#101f20] hover:bg-[#101f20] hover:text-white py-2 px-4 text-black'
                        onClick={submit}
                    >{item?._id ? "Update" : "Submit"}</button>
                </div>
            </div>
        </div>

    )
}

export default Create_Modal