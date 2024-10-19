import React from 'react'
const Item = ({ label, value }) => {
    return (
        <div className='flex w-full h-10  px-2 gap-x-4 items-center  '>
            <div className="flex w-24 h-full  items-center capitalize"> {label}:</div>
            <div className="flex  h-full  items-center justify-center"> {value}</div>
        </div>
    )
}
function Bio({ details }) {
    return (
        <div className='flex p-2 w-full  flex-col h-full bg-gray-100 '>
            <span className="font-semibold text-slate-600 ">Contact Information</span>
            <Item value={details.name} label="Name" />
            <Item value={details.phone} label="phone" />
            <Item value={details.email} label="email" />
            <Item value={details.course} label="Course" />
            <Item value={details.course} label="ID No" />
            <span className="font-semibold text-slate-600 ">Personal Information</span>
            <Item value="Male" label="Gender" />
            <Item value="16" label="age" />
            <Item value="Kenyan" label="Nationality" />

        </div>
    )
}

export default Bio