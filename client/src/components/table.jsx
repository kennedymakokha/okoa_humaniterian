import React from 'react'
import { Link, useLocation } from 'react-router-dom';
import Loader from './loader';
import * as XLSX from 'xlsx';
import Input, { SelectContainer } from './modals/input';
import { Paginator } from './Paginator';
import { exportToExcel } from '../helperFunc';
const Table = ({ columns, data, setFilter, notdetailed, page, title, paginate, filter, isLoading, key_column, setShow, setItem, setPopUp }) => {
    const location = useLocation();

    const setLimit = async (e) => {

        setFilter(prev => ({
            ...prev, limit: e.target.value
        }))
        await refetch()
    }
    return (
        <div className="overflow-x-auto">
            <div className="flex w-full items-center p-2 justify-between">
                <div className='flex items-center justify-center'>
                    <h4 className='font-bold uppercase text-center text-indigo-700'>{title}</h4> {isLoading && <Loader />}
                </div>
                {!notdetailed && <div className="flex items-center justify-center gap-x-3 ">
                    <Input label="" name="" onChange={(e) => setFilter(prev => ({ ...prev, word: e }))} />
                    <div onClick={() => exportToExcel(data, title)} className='px-4 text-[18px] shadow-2xl  bg-slate-500 flex items-center justify-center font-bold text-white rounded-md'>Export</div>
                    <div onClick={() => setPopUp(true)} className='px-4 text-[18px] shadow-2xl  bg-green-500 flex items-center justify-center font-bold text-white rounded-md'>Add</div>
                </div>}
            </div>
            {data.length <= 0 ? <div className='flex items-center justify-center text-[rgb(101,12,174)] '>
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
                        {!notdetailed && <th
                            className="py-2 px-4 border-b  text-[18px] border-gray-200 text-left text-gray-600"
                        >
                            Action
                        </th>}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, rowIndex) => (
                        <tr key={rowIndex} className="even:bg-gray-50 ">
                            {columns.map((column) => (
                                <td
                                    key={column.accessor}
                                    className="py-2 text-start  text-[18px] capitalize px-4 border-b border-gray-200 text-gray-500"
                                >
                                    <Link
                                        to={`${location.pathname}/${row[key_column].replace(/\s+/g, '-').toLowerCase()}`
                                        } state={{ details: row }}


                                    >{row[column.accessor]}</Link>
                                </td>
                            ))}
                            {!notdetailed && <td className="py-2 text-start  px-4 border-b border-l border-gray-200  text-gray-800">
                                <div className="flex gap-2 ">
                                    <div onClick={() => { setShow(true); setItem(row) }} className='text-[10px] px-3 bg-red-500 w-1/3  text-white font-bold flex items-center justify-center rounded-md'>Delete</div>
                                    <div onClick={() => { setPopUp(true); setItem(row) }} className='text-[10px] px-3 border w-1/3  text-purple-500 font-bold flex items-center justify-center rounded-md'>Edit</div>
                                </div>

                            </td>}
                        </tr>
                    ))}
                </tbody>
            </table>}
            {data.length >= 0 && <div className="flex h-full w-full py-5 bg-blue-danger">
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
            </div>}
            {/* {data.length > 9 && <div className="flex w-full items-center my-2 justify-center">
                <div className="flex w-1/2 h-6  items-center justify-center gap-x-2">
                    <div className="flex items-center justify-center w-10 rounded-md bg-gray-200 shadow-xl h-5 border text-[10px] font-bold text-purple-800 px-2">Prev</div>
                    <div className="flex items-center justify-center w-10 rounded-md bg-gray-200 shadow-xl h-5 border text-[10px] font-bold text-purple-800 px-2">Prev</div>
                </div>
            </div>} */}
        </div>
    );
};

export default Table