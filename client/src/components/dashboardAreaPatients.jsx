import React from 'react'


const ItemData = ({ title, perc }) => {
    return (
        <div className="flex flex-col border justify-center p-2">
            <div className="flex items-center justify-between py-2">
                <span className='font-semibold'>{title}</span>
                <span>{perc}</span>
            </div>
            <div className={`flex w-full h-2 rounded-r-full ${perc < 25 ? "bg-red-50" : perc > 25 && perc < 50 ? "bg-yellow-50" : perc > 50 && perc < 75 ? "bg-orange-50" : "bg-green-50"} `}>
                <div className={`flex w-[${perc}%] h-2 rounded-r-full  ${perc < 25 ? "bg-red-500" : perc > 25 && perc < 50 ? "bg-yellow-500" : perc > 50 && perc < 75 ? "bg-orange-500" : "bg-green-500"} px-2`}></div>
            </div>
        </div>
    )
}
const DashboardAreaPatients = () => {
    return (
        <div className='w-full h-full gap-2 flex-col '>
            <ItemData
                title="Sirende "
                perc={90}
            />
            <ItemData
                title="Siyenga"
                perc={20}
            />
            <ItemData
                title="Bishop Sulumet"
                perc={40}
            />
            <ItemData
                title="Chewoyet"
                perc={60}
            />
        </div>
    )
}

export default DashboardAreaPatients