import React, { useEffect, useState } from 'react'
import { useFetch_patient_triagesQuery } from '../../features/slices/triageSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import SelectInput from '../../components/SelectInput';
// import moment from 'moment';
import { useFetch_testssQuery } from '../../features/slices/testSlice';
import { usePost_testsMutation } from '../../features/slices/labtestSlice';
import { HeaderItem } from '../../components/headerItem';

function index() {
    const [popUp, setPopUp] = useState(false)
    const [show, setShow] = useState(1)
    const navigate = useNavigate()
    const [error, setError] = useState(undefined)


    const location = useLocation()
    const { details } = location.state

    const initialState = {
        patient_id: details._id,
        observation: 0,
        tests: [],
        drugs: []

    }

    const [item, setItem] = useState(initialState)

  
    const [Post_user] = usePost_testsMutation()


    const { data: tests, isSuccess: testsSuccess } = useFetch_testssQuery({
        page: 1, limit: 200,
        activeTab: 1,
        pageNumber: 0,
        word: "",

    })

    const { data: triages } = useFetch_patient_triagesQuery(details._id)
    const submit = async () => {
        try {
            await Post_user(item).unwrap()
            // await refetch()
            navigate('/doctors-desk')
        } catch (error) {
            setError(error?.data?.message)
        }
    }
    let options = testsSuccess && tests !== undefined ? tests.results.results : []
    useEffect(() => {

        if (details === null) {
            alert('hey')
            navigate('doctors-desk')
        }
    }, [])

    return (
        <>
            <div className="flex w-full py-10 flex-col relative z-0  rounded-t-md min-h-[86vh]">
                <div className="flex   w-full  pt-[80px] ">

                    <div className="flex  p-2 w-[60%] flex-col h-[70vh] border">
                        <h2 className='font-bold text-start underline '>Doctors Observations</h2>
                        <textarea name="observation" onChange={(e) => setItem(prev => ({ ...prev, observation: e.target.value }))} placeholder=' Enter Doctors observations' id="" cols="10" rows="40" className='bg-transparent'></textarea>
                    </div>
                    <div className="flex  p-2 w-[40%] flex-col h-[70vh] border">
                        <div className="flex items-center justify-between px-5 mb-2">
                            <h2 className='font-bold text-start underline '>Lab tests</h2>
                            <div className="flex items-center justify-between px-2 shadow-2xl bg-[#98daf8] rounded-md font-bold text">{item?.tests?.reduce((sum, item) => sum + item.test_fee, 0)}/=</div>
                        </div>

                        <SelectInput label="Test" searches="lab tests" value_holder="_id" handleChange={(e) => {
                            setItem(((prev) => ({
                                ...prev, tests: [...item.tests, options.find(item => item._id === e)],
                            })))
                            // setItems((prevItems) => [...prevItems, newItem])
                        }}
                            lable_holder="test_name" options={options} />
                        <div className="flex flex-col mt-3 gap-y-2">
                            {item.tests.map(item => (
                                <div key={item._id} className="flex w-full px-2 items-center h-10 border">{item.test_name}</div>
                            ))}
                            <div className="flex w-full mt-10 items-center justify-end">
                                <div onClick={submit} className="flex px-2 shadow-2xl rounded-md justify-center h-10 font-bold text-slate-50 bg-blue-500 items-center">
                                    Submit Results
                                </div>
                            </div>

                        </div>

                    </div>


                </div>
                <div className="absolute top-10 w-full flex justify-center z-10">

                    <div className="flex w-full flex-col  justify-center items-center h-1/4  gap-x-2">
                        <div className="flex items-center px-2 h-10 w-full border-b gap-x-2 rounded-t-md bg-[#98daf8]">
                            <HeaderItem header title="Date " />
                            <HeaderItem header title="Temp (&deg;C)" />
                            <HeaderItem header title="height (Ft)" />
                            <HeaderItem header title="weight (kg)" />
                            <HeaderItem header title="blood Pressure (kg)" />
                            <HeaderItem header title="blood sugar (kg)" />
                            <svg onClick={() => show === 1 ? setShow(10) : setShow(1)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3.5} stroke="currentColor" className="size-6 ">
                                <path strokeLinecap="round" strokeLinejoin="round" d={show === 1 ? "m19.5 8.25-7.5 7.5-7.5-7.5" : "m4.5 15.75 7.5-7.5 7.5 7.5"} />
                            </svg>

                        </div>
                        {triages?.slice(0, show).map((triage, i) => (<div key={triage._id} className={`flex h-10 w-full gap-x-2 ${i === 0 ? "bg-blue-100" : "bg-slate-100 even:bg-slate-200"}  `}>
                            {/* <HeaderItem title={moment(triage.createdAt).format('Do MMM YYYY hh:mm ')} /> */}
                            <HeaderItem title={triage.temp} />
                            <HeaderItem title={triage.height} />
                            <HeaderItem title={triage.weight} />
                            <HeaderItem title={triage.bloodpressure} />
                            <HeaderItem title={triage.bloodsugar} />
                        </div>

                        ))}
                    </div>
                </div>

            </div>


        </>

    )
}

export default index