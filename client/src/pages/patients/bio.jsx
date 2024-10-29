import React from 'react'
import { calculateAge, truncateString } from '../../helperFunc'
const Item = ({ label, value }) => {
    return (
        <div className='flex w-full h-10  px-2 gap-x-4 items-center  '>
            <div className="flex w-24 h-full font-bold  items-center capitalize"> {truncateString(label, 6)}:</div>
            <div className="flex  h-full  items-center justify-center"> {value}</div>
        </div>
    )
}
function Bio({ details }) {
    return (
        <div className='flex p-2 w-full  flex-col  '>
            <div className="flex items-center justify-center border-b border-blue-300">
            <span className="font-bold text-xl text-blue-600 ">Contact Information</span>
            </div>
           
            <div className="flex w-full">
                <div className="flex w-1/3 p-2 flex-col">

                    <span className="font-semibold text-blue-400">Personal contact</span>
                    <Item value={details.name} label="Name" />
                    <Item value={details.phone_number} label="phone" />
                    <Item value={details.email} label="email" />
                    <Item value={details?.course?.course_name} label="Course" />
                    <Item value={details.ID_no} label="ID No" />
                </div>
                {details.role === "student" && <div className="flex w-1/3 p-2 border-l flex-col">
                    <span className="font-semibold text-blue-400">Guardian contact</span>
                    <Item value={details?.guardian?.name} label="Name" />
                    <Item value={details?.guardian?.phone_number} label="phone" />
                    <Item value={details?.guardian?.address} label="Address" />
                    <Item value={details?.guardian?.relationship} label="ID No" />
                </div>}
                {details.role === "student" && <div className="flex w-1/3 p-2 border-l flex-col">
                    <span className="font-semibold text-blue-400 ">Personal Information</span>
                    <Item value={details.gender} label="Gender" />
                    {details.role === "student" && <Item value={calculateAge(details.dob)} label="age" />}
                    <Item value="Kenyan" label="Nationality" />
                    {details.role === "student" && <Item value={details?.state} label="Parental State" />}

                </div>}
            </div>


        </div>
    )
}

export default Bio