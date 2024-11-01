import React, { useEffect, useState } from 'react'
import Table from '../../components/table';
import Create_Modal from '../../components/modals/create_modal';
import Input, { SelectContainer } from '../../components/modals/input';
import Delete_Modal from '../../components/modals/delete_modal';
import { useFetch_coursesQuery } from '../../features/slices/cousesSlice';
import { useCreate_triageMutation, useDelete_triageMutation, useFetch_triagesQuery, useUpdate_triageMutation } from '../../features/slices/triageSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import { useFetch_specialitysQuery } from '../../features/slices/specialitySlice';
import SelectInput from '../../components/SelectInput';
import Payment_Modal from '../../components/modals/payment_modal';
import { socket } from '../root';
function index() {
    const [popUp, setPopUp] = useState(false)
    const [show, setShow] = useState(false)
    const [pay, setPay] = useState(false)
    const [paying, setPaying] = useState(true)
    const [next, setNext] = useState(false)
    const [error, setError] = useState(undefined)


    const location = useLocation()
    const navigate = useNavigate()
    const { details } = location.state

    const initialState = {
        patient_id: details._id,
        temp: null,
        bloodpressure: null,
        height: null,
        bloodsugar: null,
        weight: null,
    }

    const [item, setItem] = useState(initialState)

    const columns = [
        { Header: 'Date', accessor: 'createdAt' },
        { Header: 'temperature', accessor: 'temp' },
        { Header: 'weight', accessor: 'weight' },
        { Header: 'height', accessor: 'height' },
        { Header: 'Blood sugar', accessor: 'bloodsugar' },
        { Header: 'Blood pressure', accessor: 'bloodpressure' },
    ];

    const [Post_user] = useCreate_triageMutation()
    const [UpdateUser] = useUpdate_triageMutation()
    const [filter, setFilter] = useState({
        page: 1, limit: 7,
        activeTab: 1,
        pageNumber: 0,
        word: "",
        patient: details._id

    })
    const { data, refetch, isSuccess, isLoading, } = useFetch_triagesQuery(filter)

    const handleChange = (e, name) => {
        setError("")
        setItem(((prev) => ({
            ...prev, [name]: e
        })))
    }

    const submit = async () => {
        try {
            await Post_user(item).unwrap()
            await refetch()
            navigate('/triage')
           
            socket.emit("hello", "doctors-table");
            setItem(initialState)
        } catch (error) {
            setError(error?.data?.message)
        }
    }
    return (
        <>
            <Table editOnly notLinkable isLoading={isLoading} key_column="name" columns={columns} setPopUp={setPopUp} setItem={setItem} setShow={setShow} title={`${details.name} triages`} data={isSuccess && data !== undefined ? data.results.results
                : []}
                paginate={data?.results?.pager} filter={filter} refetch={refetch} setFilter={setFilter}
            />
            {popUp && <Create_Modal
                error={error}
                submit={submit}
                cancel={() => console.log(item)}
                submitName="Continue"
                item={item}
                body={<div className='gap-y-2 flex w-full flex-col'>
                    <div className="flex gap-2">
                        <Input label="Weight(kg)" required name="weight" value={item.weight} onChange={handleChange} />
                    </div>
                    <div className="flex gap-2">
                        <Input label="Height(ft)" required name="height" value={item.height} onChange={handleChange} />
                    </div>
                    <div className="flex gap-x-2">
                        <Input label="Blood Sugar(mmol/L)" required name="bloodsugar" value={item.bloodsugar} onChange={handleChange} />
                    </div>
                    <div className="flex gap-2">
                        <Input label="Temp()" required name="temp" value={item.temp} onChange={handleChange} />
                    </div>
                    <div className="flex gap-x-2">
                        <Input label="blood pressure(mmHg)" required name="bloodpressure" value={item.bloodpressure} onChange={handleChange} />
                    </div>

                </div>}
                name="Triage" setPopUp={setPopUp} />}

        </>

    )
}

export default index