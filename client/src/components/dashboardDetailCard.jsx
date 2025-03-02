import React from 'react'

const DashboardDetailCard = ({
    title, date, desc, color, perc, color1
}) => {
    return (
        <div className="flex h-full sm:w-[23%] w-full  rounded-md">
            <div className="box-shadow flex w-full h-full p-1 ">
                <div className="w-[10%] h-full  justify-center items-end  flex ">
                    <div class={`w-3 h-full ${color1} items-end flex  rounded-t-md`}>
                        <div class={`w-3 ${perc} ${color} rounded-t-md`}></div>
                    </div>
                </div>
                <div className="w-[90%] h-full p-5  flex-col items-start gap-y-2  flex ">
                    <span>{date}</span>
                    <span className='font-semibold'>{title}</span>
                    <span>{desc}</span>
                </div>

            </div>
        </div>
    )
}

export default DashboardDetailCard