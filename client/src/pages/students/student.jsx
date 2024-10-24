import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Ratings } from '../../components/ratings'
import TimeTable from './timetable'
import Bio from './bio'
import Practicals from './reports/practicals'
import Finances from './reports/finance'



const Button = ({ title, state, child, toggleState }) => {
    return (
        <div onClick={toggleState} className={`flex capitalize font-bold rounded-md h-full  ${state ? "border-b-[4px] bg-purple-100" : ""} shadow-2xl ${child ? "text-red-400 border" : " text-slate-500  border-[rgb(101,12,174)]"}  items-center  px-2 justify-center   gap-x-20`}>
            {title}
        </div>
    )
}

function Student() {
    const location = useLocation()
    const { details } = location.state

    const [menus, setMenu] = useState([
        {
            title: "Bio",
            state: true
        },
        {
            title: "timetable",
            state: false
        },
        {
            title: "Report",
            state: false
        }
    ])
    const [reportMenus, setReportMenus] = useState([
        {
            title: "Practicals",
            state: true
        },
        {
            title: "Exams",
            state: false
        },
        {
            title: "Fees",
            state: false
        }
    ])

    const toggleState = (title) => {
        setMenu(prevItems =>
            prevItems.map(item => ({
                ...item,
                state: item.title === title // Set the state to true if the title matches, else false
            }))
        );
    };

    let arr = menus
    if (details.role === "student") {
        arr = menus.filter(item => item.title !== "timetable")
    }
    let reportarr = reportMenus
    if (details.role !== "student") {
        reportarr = reportMenus.filter(item => item.title !== "Exam" || item.title !== "Fees")
    }


    return (
        <div className='w-full h-full flex items-center flex-col '>
            <div className="flex h-1/3 w-full">
                <div className="flex h-full w-1/4 p-2">
                    <div className="flex h-full w-full  border items-center justify-center  rounded-md shadow-3xl">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-40">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                        </svg>

                    </div>
                </div>
                <div className="flex h-full w-3/4  flex-col  p-2">
                    <div className="flex h-full w-full flex-col items-start   shadow-3xl">
                        <h2 className='font-bold uppercase'>{details.name} </h2>
                        <span className=" text-sm text-[rgb(101,12,174)] font-semibold capitalize">{details?.role}</span>
                        <Ratings small row width={5} count={Math.random() * (5 - 0) + 0} />
                        <div className="flex w-full h-10 mt-8 border-b-[0.001px] gap-x-4">
                            {arr.map((menu, i) => (
                                <Button key={i} toggleState={() => toggleState(menu.title)} title={menu.title} state={menu.state} />
                            ))}
                        </div>
                    </div>

                </div>

            </div>
            {menus.find(item => item.state === true).title === "Report" && <div className="flex w-full h-10 mt-8  gap-x-4">
                {reportarr.map((menu, i) => (
                    <Button child key={i} toggleState={() => setReportMenus(prevItems =>
                        prevItems.map(item => ({
                            ...item,
                            state: item.title === menu.title // Set the state to true if the title matches, else false
                        }))
                    )} title={menu.title} state={menu.state} />
                ))}
            </div>}


            <div className="flex w-full p-2 ">
                {menus.find(item => item.state === true).title === "timetable" && <TimeTable />}
                {menus.find(item => item.state === true).title === "Bio" && <Bio details={details} />}
                {menus.find(item => item.state === true).title === "Report" &&
                    <div className="flex  w-full h-full">
                        {reportMenus.find(item => item.state === true)?.title === "Practicals" && <Practicals data1={details} />}
                        {reportMenus.find(item => item.state === true)?.title === "Fees" && <Finances data1={details} />}
                    </div>
                }
            </div>
            {/* <div className="flex w-1/4"></div> */}


        </div>
    )
}

export default Student