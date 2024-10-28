export const Multiple = (props) => {
    let count = []
    for (let index = 0; index < props.count; index++) {
        count.push(index)
    }
    return (
        <div className={`${props.row && "flex-row gap-x-2"} ${props.col && "flex-col gap-y-1"} ${props.width ? props.width : "w-full"}  ${props.wrap && "flex-wrap"}  flex transition duration-50 fade-in`} >
            {count.map((user, i) => (
                <div i={i} key={i}>
                    {props.body}
                </div>
            ))}
        </div>


    )
}
export const Ratings = (props) => {
    let count = []
    let unCount = []
    for (let index = 0; index < props.count; index++) {
        count.push(index)
    }
    let neg = 5 - props.count
    for (let index = 0; index < neg; index++) {
        unCount.push(index)
    }
    return (
        <div className={`${props.row && "flex-row"} flex transition items-center flex-col  duration-50 fade-in`} >
            <div className="flex flex-col pt-10">
                <span className="text-sm justify-left flex  ">Rankings</span>
                
                <div className="flex items-center">
                <span className="text-sm font-bold text-[#98daf8]">{parseInt(props.count)+1}/5</span>
                    {count.map((user, i) => (
                        <div i={i} key={i}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="yellow" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`${props.small ? "sm:w-5 sm:h-5" : "sm:w-6 sm:h-6"} text-yellow-600 w-4 h-4`}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                            </svg>
                        </div>
                    ))}
                    {unCount.map((user, i) => (
                        <div i={i} key={i}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`${props.small ? "sm:w-5 sm:h-5" : "sm:w-6 sm:h-6"} text-yellow-600 w-4 h-4`}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                            </svg>
                        </div>
                    ))}
                </div>
            </div>



        </div>


    )
}
function Rating({ data }) {

    return (
        <>
            <div className=' px-2 flex w-full items-center flex-row h-20 justify-between'>
                <div className='flex   rounded-sm px-2  items-center justify-between'>
                    <TitleContainer title="Rating" />

                </div>
                <div className='sm:flex hidden w-1/2 items-center  justify-end'>
                    <Ratings row count={data?.ratings} />

                </div>
            </div>
            <div className='flex sm:flex-row flex-col px-6 pb-10  gap-y-4 w-full '>
                <div className='flex sm:w-1/2  w-full flex-col items-center justify-center '>
                    <Multiple row count={data?.ratings} body={
                        <div className='sm:h-20 sm:w-20 h-14 w-14 bg-slate-50 border border-slate-50 rounded-md flex items-center justify-center' >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="yellow" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-10 h-10 text-[yellow]">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                            </svg>

                        </div>
                    } />
                </div>
                <div className='flex sm:w-1/2  w-full gap-y-4 flex-col '>
                    <div className='flex   rounded-sm px-2  items-center justify-between'>
                        <TitleContainer title="Rating Breakdown" />
                    </div>
                    <Rate c={data.counr} count={5} />
                    <Rate c={data.counr} count={4} />
                    <Rate c={data.counr} count={3} />
                    <Rate c={data.counr} count={2} />
                    <Rate c={data.counr} count={1} />
                </div>
            </div>

        </>

    )
}

export default Rating


function Rate({ count, c }) {
    return (
        <div className='flex  w-full h-2 '>
            <div className='flex  w-[30%] h-full items-center'> <Ratings row count={count} /></div>
            <div className='flex  w-[60%] h-full items-center text-slate-300  sm:text-4xl font-bold'>------------------------- </div>
            <div className='flex  w-[10%] h-full items-center '>{c === count ? `${count / 5 * 100}%` : "0%"}</div>
        </div>
    )
}
