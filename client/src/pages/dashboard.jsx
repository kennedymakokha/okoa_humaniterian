import React from 'react'
import { Assignment, } from '../components/sidebar/images'
import Admission from './charts/admission'
import { Link, } from 'react-router-dom'

import { useFetch_countQuery } from './../features/slices/usersApiSlice';
const CardOne = ({ from, to, color, count, title, icon, url, grad }) => {
    return (
        <div className={` shrink-0 w-[25%] h-24 px-1 `}>
            <div className={` shrink-0 w-full h-24 rounded-md shadow-2xl items-center justify-center flex flex-col ${to} ${from} bg-gradient-to-${grad}   `}>

                <Link to={url} className={`flex cursor-pointer font-bold items-center justify-center bg-purple-200 text-[20px] size-10 rounded-tl-md rounded-br-md shadow-3xl`}>
                    {count}
                </Link>
                <h2 className="text-white font-bold capitalize">
                    {title}
                </h2>
                {/* <img src={icon} alt="" className="w-[40%]" /> */}
            </div>
        </div>
    )
}
const DetailItem = ({ title, value }) => {
    return (
        <div className="flex items-center text-[14px]  justify-between">
            <span className='font-bold'>{title}:</span>
            <span>{value}</span>
        </div>
    )
}
function Dashboard() {

    const { data } = useFetch_countQuery()

    return (
        <div className='p-2'>
           
            <div className="flex h-[280px] w-full ">
                <div className="flex flex-col w-3/4 ">
                    <div className="flex  w-full flex-wrap ">
                        <CardOne from="from-indigo-700" to="to-indigo-400" color="red" grad='r' title="Students" icon="" url="students"
                            count={data?.students}
                        />
                        <CardOne from="from-yellow-700" to="to-yellow-400" color="red" grad='r' title="Courses" icon="" url="courses"
                            count={data?.courses}
                        />
                        <CardOne from="from-green-700" to="to-green-400" color="green" grad='r' title="Instructors" icon={Assignment} url="instructors"
                            count={data?.instructors}
                        />
                        <CardOne from="from-red-700" to="to-red-400" color="red" grad='r' title="Sponsors" icon="" url=""
                            count={data?.sponsors}
                        />
                    </div>
                    <div className='w-full p-2 h-40'>
                        <div className="flex w-1/2 px-2">
                            <div className="flex w-full h-40 border">
                                <Admission />
                            </div>
                        </div>
                        <div className="flex w-1/2 px-2"></div>
                    </div>
                </div>
                <div className="flex w-1/4 border flex-col rounded-t-md  h-full">
                    <div className="flex w-full h-[45%]  bg-red-100 flex-col items-center justify-center">
                        <img src="" alt="" className=" h-20 w-20 border-2 border-[rgb(101,12,174)] rounded-full" />
                        <h3 className=" text-[rgb(101,12,174)] font-bold "> Student of the week </h3>
                    </div>
                    <div className="flex flex-col p-3">
                        <DetailItem title="Enrollment No" value="202402009" />
                        <DetailItem title="course" value="Machanical eng" />
                        <DetailItem title="Session" value="March-2024 to Aug-2024" />
                        <DetailItem title="Semister" value="2" />
                    </div>
                    <div className="flex items-center justify-center w-full">
                        <div className="flex w-3/4 px-2 items-center justify-center text-white text-sm rounded-md bg-[rgb(101,12,174)] shadow-2xl">View Prodile </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Dashboard