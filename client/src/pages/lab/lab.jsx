import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import SelectInput from '../../components/SelectInput';
import moment from 'moment';
import { useFetch_lab_testQuery, useFetch_observationsQuery, usePost_resultsMutation } from '../../features/slices/labtestSlice';
import { HeaderItem } from '../../components/headerItem';
import axios from 'axios';
function index() {
    const navigate = useNavigate()
    const [show, setShow] = useState(1)
    const [error, setError] = useState(undefined)
    const location = useLocation()
    const { details } = location.state
    const [item, setItem] = useState([])
    const [Post_user] = usePost_resultsMutation()
    const { data: Observations } = useFetch_observationsQuery(details._id)
    const { data: labTests, refetch } = useFetch_lab_testQuery(`${Observations !== undefined && Observations[0]?._id}`)

    const submit = async () => {
        try {
            await Post_user({ tests: item, patient_id: details._id }).unwrap()
            await refetch()
            navigate("/laboratory")

            // setPopUp(false)
            // setItem(initialState)
        } catch (error) {
            console.log(error)
            setError(error?.data?.message)
        }
    }

    const handleChange = (e, data) => {
        if (!item.find(item => item.test === data.test_id._id)) {
            setItem((prevItems) => [...prevItems, {
                test: data.test_id._id,
                outcome: e.target.checked,
                patient_id: details._id,
                observation: `${Observations !== undefined && Observations[0]?._id}`
            }]);
        } else {
            setItem((prevTests) =>
                prevTests.map((item) =>
                    item.test === data.test_id._id ? { ...item, outcome: false } : item
                )
            )
        }
    }
    return (
        <>
            <div className="flex w-full py-14 flex-col relative z-0  rounded-t-md min-h-[86vh]">
                <div className="flex w-3/4 items-center justify-center  pt-[80px] ">

                    <div className="flex  p-2 w-[100%] flex-col h-[70vh] border">
                        <div className="flex items-center justify-between px-5 mb-2">
                            <h2 className='font-bold text-start underline '>Lab tests</h2>
                        </div>

                        {labTests !== undefined && labTests.map((data) => (
                            <div key={data._id} className="flex w-full mt-2 h-10  items-center justify-between rounded-md">
                                <div className="flex w-[90%] h-10  items-center  p-2 font-semibold ">
                                    {data.test_id.test_name}
                                </div>
                                <div className="flex w-[10%] items-center justify-center">
                                    <input value="test" type="checkbox" className='size-5' onChange={e => handleChange(e, data)} />
                                </div>
                            </div>
                        ))}

                        <div className="flex w-full mt-10 items-center justify-end">
                            <div onClick={submit} className="flex px-2 shadow-2xl rounded-md justify-center h-10 font-bold text-slate-50 bg-blue-500 items-center">
                                Submit Results
                            </div>
                        </div>
                    </div>
                </div>
                <div className="absolute top-10 w-full flex justify-center z-10">

                    <div className="flex w-full flex-col left-0  justify-center items-center h-1/4  gap-x-2">
                        <div className="flex items-center px-2 h-10 w-full border-b gap-x-2 rounded-t-md bg-[#98daf8]">
                            <HeaderItem header title="Date " />
                            <HeaderItem header title="Observations" />
                        </div>
                        {Observations?.slice(0, show).map((observe, i) => (<div onClick={() => { i == 0 && show === 1 ? setShow(10) : setShow(1) }} key={observe._id} className={`flex  w-full gap-x-2 ${i === 0 ? "bg-blue-100" : "bg-slate-100 even:bg-slate-200"}  `}>
                            <HeaderItem title={moment(observe.createdAt).format('Do MMM YYYY hh:mm ')} />
                            <div className={`flex border-r text-start text-slate-500 p-2 flex items-center justify-center    px-2  items-center justify-centetr`}>
                                {observe.observation}
                            </div>
                        </div>
                        ))}
                    </div>
                </div>

            </div>


        </>

    )
}

export default index