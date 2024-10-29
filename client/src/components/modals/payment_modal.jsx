import React, { useState } from 'react'
import Input from './input';
import Loader from '../loader';


function Payment_Modal({ handleChange, paying, setPopUp, phone, submit, name, item, cancel }) {
    const [use, setUse] = useState(true)

    return (
        <div className='w-screen h-screen bg-black bg-opacity-30 fixed top-0 right-0 flex justify-center items-center'>
            <div className='bg-[#0fb020] p-10 rounded-md shadow-md  '>
                <h1 className='font-bold text-center text-black text-lg my-2'>Pay for  {name}</h1>
                {/*  */}
                <div className='w-full items-center mt-2 flex font-bold uppercase text-white  gap-x-5 h-[40px] '>
                    <input
                        type="checkbox"
                        className='size-5 rounded-full bg-red-400'
                        checked={use}
                        onChange={() => setUse(!use)}
                    />
                    Use patient No
                </div>
                <Input label="Phone" disable={use} name="pay_number" value={item.pay_number} type="number" onChange={handleChange} />

                <div className='flex justify-between mt-5 gap-x-2'>
                    <button className='rounded-md outline-[#101f20] bg-[#101f20] text-white py-2 px-2 hover:bg-transparent hover:text-black'
                        onClick={() => { setPopUp(false); cancel() }}
                    >No, Cancel</button>
                    <button className='flex rounded-md outline-[#101f20] hover:bg-[#101f20] hover:text-white py-2 px-2 bg-white text-[#0fb020] font-bold'
                        onClick={() => { submit(); cancel() }}
                    >{!paying ? <><Loader /> <Loader /> <Loader /></> : "Pay Now"}</button>
                </div>
            </div>
        </div>
    )
}

export default Payment_Modal