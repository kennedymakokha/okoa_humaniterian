// src/Certificate.js
import React from 'react';
import './Certificate.css';
import { Login_background } from '../../components/sidebar/images';
// import Bestaward from './../../assets/bestaward.png'
const Certificate = (user) => {
    console.log(user)
    const { name, date, course } = user.user
    console.log(name)
    return (

        <div className="bg-blue-50 w-full h-[600px] relative z-0">
            {/* <p className="italic text-bold  font-serif">Map</p> */}
            <img src={Login_background} alt="" className="w-full h-full" />
            <div className="absolute inset-0 flex justify-center items-center z-10">

            </div>
            <div className="absolute  w-full h-full top-0 left-0 right-0 p-10 flex justify-center items-center z-10">
                <div className="flex  shadow-2xl border border-[10px] border-[#98daf8] rounded-md w-full h-full"></div>
            </div>
            <div className="absolute w-full h-full top-0 left-0 right-0 p-20 flex justify-center items-center z-10">
                <div className="flex  bg-white shadow-2xl opacity-95 rounded-md w-full h-full"></div>
            </div>
            <div className="absolute w-full h-full top-0 left-0 right-0 p-20 flex justify-center items-center z-20">
                <div className="flex flex-col gap-y-3  rounded-md p-3 w-full h-full">
                    <div className="flex items-center h-20 w-full justify-center flex-col">
                        <div className="flex items-center h-full w-1/2 justify-center flex-col">
                            <h2 className="uppercase font-bold  text-4xl">Certificate</h2>
                            <span className="uppercase">of achievement</span>
                            {/* <div className="flex gap-x-3 items-center">
                                <div className="flex w-2 h-2  shadow-2xl rounded-sm bg-red-300 rotate-[45deg]"></div>
                                <div className="flex w-3 h-3  shadow-2xl rounded-sm bg-[#98daf8] rotate-[45deg]"></div>
                                <div className="flex w-2 h-2  shadow-2xl rounded-sm bg-red-300 rotate-[45deg]"></div>
                            </div> */}
                        </div>
                    </div>
                    <div className="flex flex-col gap-y-5">
                        <h3 className="text-sm">This is to certify that </h3>
                        <h2 className="text-[34px] italic font-bold">{name}</h2>
                        <p>has successfully completed the <span className='font-bold capitalize'> {course}</span></p>
                        <p>on this day <span className="font-bold">{date}</span></p>


                        Presented By : OKOA HUMANITARIAN C.B.O
                    </div>

                </div>
            </div>
        </div>


    );
};


{/* <h1 className='text-[#98daf8] font-bold'>Certificate of Achievement</h1>
<p>This certifies that</p>
<h2>{name}</h2>
<p>has completed the course</p>
<p>on {date}</p>
<footer>Signature</footer> */}
export default Certificate;
