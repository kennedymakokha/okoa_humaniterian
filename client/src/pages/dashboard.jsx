import React from 'react'
import { Assignment, } from '../components/sidebar/images'
import Admission from './charts/admission'
import { Link, } from 'react-router-dom'

import { useFetch_countQuery } from './../features/slices/usersApiSlice';
import DashboardDetailCard from '../components/dashboardDetailCard'
import DashboardAreaPatients from './../components/dashboardAreaPatients'
import DashbordCard from '../components/dashboardCard';



const PlainDashboadTable = ({ columns, data }) => {
    const headers = Object.keys(data[0]);
    return (
        <div className="flex flex-col w-full mt-2 md:overflow-hidden overflow-scroll ">
            <div className="flex  justify-between h-10 px-5">
                {headers.map((header) => (
                    <div key={header} className=" py-2 min-w-20  text-left font-semibold">
                        {header.charAt(0).toUpperCase() + header.slice(1)}
                    </div>
                ))}
            </div>
            {data.map((column, index) => (
                <div className="flex justify-between h-10 px-5">
                    {headers.map((header) => (
                        <div key={header} className="   py-2 min-w-20  text-gray-600  text-left">
                            {column[header]}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    )
}

function Dashboard() {

    const { data } = useFetch_countQuery()

    return (


        <div className="flex w-full  gap-4 flex-col ">
            <div className="sm:flex hidden w-full px-2 h-40 gap-4 flex-wrap ">
                <DashboardDetailCard
                    date="10 Feb, 2025"
                    title="Hypertensive Crisis"
                    desc="Ongoing treatment"
                    perc="h-[60%]" color='bg-orange-500' color1='bg-orange-100' />
                <DashboardDetailCard
                    date="12 Jan, 2025"
                    title="Osteoporosis"
                    desc="Incurable"
                    perc="h-[10%]" color1='bg-red-100' color='bg-red-500' />
                <DashboardDetailCard
                    date="15 Dec, 2024"
                    title="Hypertensive Crisis"
                    desc="Examination"
                    perc="h-[50%]" color='bg-green-200' color1='bg-green-100' />
                <DashboardDetailCard
                    date=""
                    title=""
                    desc=""
                    perc="h-[80%]" color='bg-green-500' color1='bg-green-100' />
            </div>

            {/* <div className="flex h-[60vh] w-full">
                <div className="flex w-1/3 p-2">

                    <DashbordCard title="Visits From Countries" body={<DashboardAreaPatients />} />
                </div>
                <div className="flex w-2/3 p-2">
                    <DashbordCard title="Patient Overview" />
                </div>
            </div> */}
            <div className="flex h-auto w-full sm:flex-row flex-col">
                <div className="flex sm:w-2/3 w-full p-2">
                    <DashbordCard title="Patient Overview" body={<PlainDashboadTable
                        data={[
                            {
                                patient: "Petey Cruiser", doctor: "Dr.Monty Carlo", date: "20/02/2020", time: "8:00 AM", contact: "+ 1 - 202 - 555-0146"
                            },
                            {
                                patient: "Petey Cruiser", doctor: "Dr.Monty Carlo", date: "20/02/2020", time: "8:00 AM", contact: "+ 1 - 202 - 555-0146"
                            },
                            {
                                patient: "Petey Cruiser", doctor: "Dr.Monty Carlo", date: "20/02/2020", time: "8:00 AM", contact: "+ 1 - 202 - 555-0146"
                            }
                        ]}
                        columns={['patient', 'doctor', 'date', "time", 'contact']} />} />
                </div>
                <div className="flex sm:w-1/3 w-full p-2">

                    <DashbordCard title="New Appointments" body={<DashboardAreaPatients />} />
                </div>
            </div>
        </div>


    )
}

export default Dashboard