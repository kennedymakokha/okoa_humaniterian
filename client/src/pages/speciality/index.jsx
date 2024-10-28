import React, { useState } from 'react'
import Table from '../../components/table';
import Create_Modal from '../../components/modals/create_modal';
import Input from '../../components/modals/input';
import Delete_Modal from '../../components/modals/delete_modal';
import { useCreate_specialityMutation, useDelete_specialityMutation, useFetch_specialitysQuery, useUpdate_specialityMutation  } from '../../features/slices/specialitySlice';



function index() {
    const [popUp, setPopUp] = useState(false)
    const [show, setShow] = useState(false)
    const [err, setError] = useState(undefined)
    const initialState = {
        speciality_name: "",
        consultation_fee: 0
    }
    const [item, setItem] = useState(initialState)
    const columns = [
        { Header: 'Speciality', accessor: 'speciality_name' },
        { Header: 'consultation', accessor: 'consultation_fee' },

    ];
    const [filter, setFilter] = useState({
        page: 1, limit: 7,
        activeTab: 1,
        pageNumber: 0,
      
        word: "",
    })
    const { data, isLoading, isSuccess, refetch } = useFetch_specialitysQuery(filter)

    const [Postspeciality, isFetching, error] = useCreate_specialityMutation()
    const [Updatespeciality] = useUpdate_specialityMutation()

    const [Deletespeciality] = useDelete_specialityMutation()

    const handleChange = (e, name) => {
        setItem(((prev) => ({
            ...prev, [name]: e
        })))

    }

    const submit = async () => {

        try {
            if (item._id) {
                
                await Updatespeciality(item).unwrap()
            } else {
                await Postspeciality(item).unwrap()
            }

            await refetch()
            setItem(initialState)
            setPopUp(false)
        } catch (error) {
            setError()
            console.log(error)

        }
    }
    const submitDelete = async () => {
        try {
            await Deletespeciality(item._id).unwrap()
            await refetch()
            setItem(initialState)
            setShow(false)
        } catch (error) {
            console.log(error)

        }


    }
    const cancel = () => {

        setItem(initialState)
    }

    return (
        <>

            <Table isLoading={isLoading} key_column="speciality_name" columns={columns} setPopUp={setPopUp} setItem={setItem} setShow={setShow} title="specialities Offered" data={isSuccess && data !== undefined ? data.results.results
                : []}
                paginate={data?.results?.pager} filter={filter} refetch={refetch} setFilter={setFilter}
            />
            {popUp && <Create_Modal
                submit={submit}
                cancel={cancel}
                item={item}
                error={isFetching?.error?.data?.message}
                body={<div className='gap-y-2 flex flex-col'>
                    <Input label="speciality" name="speciality_name" value={item.speciality_name} onChange={handleChange} />
                    <Input label="Fee" name="consultation_fee" value={item.speciality_duration} type="number" onChange={handleChange} />
                   
                </div>}
                name="speciality" setPopUp={setPopUp} />}
            {show && <Delete_Modal
                item={item}
                submit={submitDelete}
                cancel={cancel}
                name="speciality" setPopUp={setShow} />}
        </>

    )
}

export default index