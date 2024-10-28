/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import Input, { SelectContainer } from '../components/modals/input'
import { useGet_usersQuery } from '../features/slices/usersApiSlice'
import { useTest_uploadsMutation } from '../features/slices/dataEntrySlice'
import { downloadCSV } from './ext.func.js'

const DataAnalisis = () => {
    const [item, setItem] = useState({
        student: "", csv_file: "", acuracy: "", speed: "", time: "", records: "", records_entered: "", test: ""
    })

    const [show,setShow] =useState(false)
    const [filter, setFilter] = useState({
        page: 1, limit: 1000,
        activeTab: 1,
        pageNumber: 0,
        role: "student",
        word: "",
        course: ""
    })
    const [submit, data] = useTest_uploadsMutation()
    const { data: students, isSuccess, } = useGet_usersQuery(filter)
    const handleFileChange = (event) => {
        setItem(prevState => ({ ...prevState, csv_file: event.target.files[0] }))
    };


  
    const handleSubmit = async () => {
        try {
            const formData = new FormData();
            formData.append("student", item.student);
            formData.append("csv_file", item.csv_file);
            formData.append("test", item.test);
            await submit(formData).unwrap()
            
        } catch (error) {
            console.log(error)
        }
    }

    // eslint-disable-next-line react/prop-types
    const DataItem = ({ value, title, value1 }) => {
        return (
            <div className="flex w-full border-b border-blue-200  ">
                <div className="flex w-1/4 font-bold border-r border-blue-200px-2 ">{title}</div>
                <div onClick={()=>title==="Errors"&& setShow(prev=>(!prev)) }className="flex border-r border-blue-200 w-[300px] px-2">{value}</div>
                <div className="flex px-2 text-red-400 ">{value1}</div>
            </div>
        )
    }
console.log(data)
    return (
        <div className={`flex  w-full h-full p-2`}>
            <div className="flex w-full items-center gap-y-2 flex-col justify-center">
                <div className="flex rounded-sm font-bold text-blue-400 px-2  py-1 bg-slate-200">Data Entry Accuracy Speed Test </div>
                <div className="flex  px-2  gap-x-2 py-1 flex">
                    <div className="flex rounded-sm font-bold text-blue-400 px-2  py-1 bg-slate-100">
                        <SelectContainer key_name="name" item label="Test" array={[
                            {
                                name: "Practical 1", _id: "prac 1"
                            }, {
                                name: "Practical 2", _id: "prac 2"
                            }, {
                                name: "Practical 3", _id: "prac 3"
                            },]} required name="test" value={item.test} handleChange={(e) => setItem(((prev) => ({
                                ...prev, test: e.target.value
                            })))} />
                    </div>
                    <div className="flex rounded-sm font-bold text-blue-400 px-2  py-1 bg-slate-100">
                        <SelectContainer item key_name="name" label="Student" array={isSuccess && students !== undefined ? students.results.results : []} required name="student" value={item.student} handleChange={(e) => setItem(((prev) => ({
                            ...prev, student: e.target.value
                        })))} />
                    </div>
                </div>
              {item.student!=="" && item.test!==""&&  <div className="flex rounded-sm shadow-3xl font-bold  px-2  w-full py-1 bg-slate-300">
                    <input
                        onChange={(e) => handleFileChange(e)}
                        type="file"
                        name="file"
                        className={`block w-full text-sm ${data.isError ? "text-red-400" : "text-slate-500"} file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100`}
                    />
                </div>}
                {data?.data && <div className={`flex w-full mb-10 flex-center justify-center ${data?.data?.acuracy < 0 && " bg-red-200 animate-pulse"} ${data?.data?.acuracy > 60 && " bg-green-100 animate-pulse"}`}>
                    <div className={`flex w-full p-2 rounded-md border flex-col`}>
                        <DataItem value={data?.data?.records} title="Records Entered" />
                        <DataItem value={`${data?.data?.speed} records per min`} title="Speed" />
                        <DataItem value={`${data?.data?.acuracy} %`} title="Acuracy" />
                        <DataItem value={`${data?.data?.errors?.length} Erroneous Entries`} title="Errors" />
                    </div>
                </div>}
                {data?.data?.errors?.length > 0 && show &&<div className="flex w-full flex-center justify-center">
                    <div className={`flex w-full p-2 rounded-md border flex-col`}>
                        {data?.data?.errors.map((err, i) => (
                            <DataItem key={i} value={err.expected} value1={err.got} title={err.label} />
                        ))}
                    </div>
                </div>}
               {item.student!=="" && item.test!==""&& <div className="flex w-full items-center justify-end">
                    {data.isSuccess && data?.data?.errors ? <button onClick={()=>downloadCSV(data?.data?.errors, `${data?.data?.name} ${item.test} error report `)}>Download CSV</button>:<div className="flex font-bold pointer-cursor text-white rounded-md px-2 py-1 bg-blue-700 " onClick={async()=>await handleSubmit()}>Submit</div>}
                </div>}
                
            </div>
        </div>
    )
}

export default DataAnalisis