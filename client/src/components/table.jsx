import React from 'react'
import { Link, useLocation } from 'react-router-dom';
import Loader from './loader';
import * as XLSX from 'xlsx';
import Input, { SelectContainer } from './modals/input';
import { Paginator } from './Paginator';
import { exportToExcel } from '../helperFunc';
import { useNavbar } from '../context/sideBar.context';
import { Repeat } from '../pages/ext.func.js';
const Table = ({ columns, noAdd, otherAction, noAction, notLinkable, enrolUser, data, setFilter, notdetailed, page, title, paginate, filter, isLoading, key_column, setShow, setItem, setPopUp }) => {
    const location = useLocation();
    const { collapsed, toggleNavbar } = useNavbar();
    const setLimit = async (e) => {

        setFilter(prev => ({
            ...prev, limit: e.target.value
        }))
        await refetch()
    }
    return (
        <div className=" ">
            <div className="flex w-full min-w-[70hw] overflow-hidden items-center p-2 justify-between">
                <div className='flex items-center justify-center'>
                    <h4 className='font-bold uppercase text-center text-indigo-700'>{title}</h4> {isLoading && <Loader />}
                </div>
                {!notdetailed && <div className="flex items-center justify-center gap-x-3 ">
                    <Input bgNone label="" name="" onChange={(e) => setFilter(prev => ({ ...prev, word: e }))} />
                    <div onClick={() => exportToExcel(data, title)} className='px-4 text-[18px] shadow-2xl h-8 bg-slate-500 flex items-center justify-center font-bold text-white rounded-md'>Export</div>
                    {!noAdd && <div onClick={() => { setPopUp(true); }} className='px-2 h-7 text-[18px] shadow-2xl  bg-blue-500  flex items-center justify-between font-bold text-white rounded-md'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="size-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>

                    </div>}
                </div>}
            </div>
            {data?.length <= 0 ? <div className='flex items-center justify-center text-[#98daf8] '>
                No Record found
            </div> : <table className="min-w-full bg-white border border-gray-200">
                <thead className="bg-gray-200">
                    <tr>
                        {columns.map((column) => (
                            <th
                                key={column.accessor}
                                className="py-2 px-4 border-b uppercase text-[12px]   border-gray-200 text-left text-gray-600"
                            >
                                {column.Header}
                            </th>
                        ))}
                        {!noAction && <th
                            className="py-2 px-4 border-b  text-[18px] border-gray-200 text-left text-gray-600"
                        >
                            Action
                        </th>}
                        {otherAction && <th
                            className="py-2 px-4 border-b  text-[18px] border-gray-200 text-left text-gray-600"
                        >
                            Action
                        </th>}
                    </tr>
                </thead>
                {isLoading ? <tbody>
                    {Repeat(10, <tr>
                        {columns.map((column) => (

                            <td className=" p-2 " >
                                <div className="even:bg-gradient-to-r bg-gradient-to-l animate-pulse from-slate-200  to-slate-100 h-10 rounded-md even:bg-red-300"></div>
                            </td>
                        ))}
                    </tr>)}
                </tbody> :
                    <tbody>
                        {data?.map((row, rowIndex) => (
                            <tr key={rowIndex} className="even:bg-gray-50 ">
                                {columns.map((column) => (
                                    <td
                                        key={column.accessor}
                                        className="py-2 text-start  text-[18px] capitalize px-4 border-b border-gray-200 text-gray-500"
                                    >
                                        <Link
                                            to={notLinkable ? "" : `${location.pathname}/${row[key_column].replace(/\s+/g, '-')?.toLowerCase()}`
                                            } state={{ details: row }}


                                        >{row[column.accessor]}</Link>
                                    </td>
                                ))}
                                {otherAction && <td className="py-1 text-start  px-4  flex items-center  justify-center border-b border-l border-gray-200  ">
                                    <div onClick={() => { setPopUp(true); setItem(row); }} className=' w-14 h-full border-blue-500 font-bold cursor-pointer capitalize  text-blue-700 py-1 border  flex items-center justify-center rounded-md'>
                                        {otherAction}
                                    </div>


                                </td>}
                                {!noAction && <td className="py-2 text-start  px-4 border-b border-l border-gray-200  text-gray-800">
                                    <div className="flex gap-2 ">
                                        <div onClick={() => { setShow(true); setItem(row); }} className=' w-14 border-red-500  p-2 border  flex items-center justify-center rounded-md'>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-red-500">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                            </svg>

                                        </div>
                                        <div onClick={() => { setPopUp(true); setItem(row); }} className=' w-14 border-blue-500  p-2 border   flex items-center justify-center rounded-md'>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-blue-500">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                            </svg>

                                        </div>
                                        {location.pathname === "/students" && !row.enroled && <div onClick={() => { enrolUser(row);; setItem(row) }} className='text-[10px] px-3 border w-1/3  border-blue-500     text-blue-500 font-bold flex items-center justify-center rounded-md'>Enroll</div>}
                                    </div>

                                </td>}
                            </tr>
                        ))}
                    </tbody>}
            </table>}
            {
                data?.length >= 0 && <div className="flex h-full w-full py-5 bg-blue-danger">
                    <div className="flex w-1/2 items-center justify-between">

                        {paginate && <div className='flex'>
                            <div onClick={filter.page > 1 ? () => prev() : null} className={`w-10 cursor-pointer h-7 text-[10px] ${filter.page > 1 ? null : "text-slate-200"} border flex items-center rounded-l-md justify-center`}>Prev</div>
                            {<Paginator page={page} filter={filter} setFilter={setFilter} count={paginate} />}
                            <div onClick={async () => next()} className={`w-10 cursor-pointer text-[10px] border flex ${filter.page < paginate ? null : "text-slate-200"} items-center   rounded-r-md justify-center`}>Next</div>
                        </div>}
                    </div>
                    <div className="flex w-1/2 items-center justify-end">
                        <select className='text-[10px] border h-6 rounded-md px-2 text-slate-400 bg-transparent float-right focus:outline-none' onChange={setLimit}>
                            <option >Select Limit </option>
                            <option value={2}>2</option>
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={15}>15</option>
                            <option value={20}>20</option>
                        </select>
                    </div>
                </div>
            }

        </div >
    );
};

export default Table