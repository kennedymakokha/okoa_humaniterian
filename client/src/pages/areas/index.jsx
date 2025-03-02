import React, { useState } from 'react'
import Table from '../../components/table';
import Create_Modal from '../../components/modals/create_modal';
import Input, { TextArea } from '../../components/modals/input';
import Delete_Modal from '../../components/modals/delete_modal';
import { useCreate_areasMutation, useDelete_areasMutation, useFetch_areasQuery, useUpdate_areasMutation } from '../../features/slices/areaSlice';



function index() {
    const [popUp, setPopUp] = useState(false)
    const [show, setShow] = useState(false)
    const [err, setError] = useState(undefined)
    const initialState = {
        area_name: "",
      
        desc: ""
    }
    const [item, setItem] = useState(initialState)
    const columns = [
        { Header: 'areas', accessor: 'area_name' },
        { Header: 'Description', accessor: 'desc' },
    ];
    const [filter, setFilter] = useState({
        page: 1, limit: 7,
        activeTab: 1,
        pageNumber: 0,

        word: "",
    })
    const { data, isLoading, isSuccess, refetch } = useFetch_areasQuery(filter)

    const [Postareas, isFetching, error] = useCreate_areasMutation()
    const [Updateareas] = useUpdate_areasMutation()

    const [Deleteareas] = useDelete_areasMutation()

    const handleChange = (e, name) => {
        setItem(((prev) => ({
            ...prev, [name]: e
        })))

    }

    const submit = async () => {

        try {
            if (item._id) {

                await Updateareas(item).unwrap()
            } else {
                await Postareas(item).unwrap()
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
            await Deleteareas(item._id).unwrap()
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

            <Table notLinkable isLoading={isLoading} key_column="area_name" columns={columns} setPopUp={setPopUp} setItem={setItem} setShow={setShow} title="Areas" data={isSuccess && data !== undefined ? data.results.results
                : []}
                paginate={data?.results?.pager} filter={filter} refetch={refetch} setFilter={setFilter}
            />
            {popUp && <Create_Modal
                submit={submit}
                cancel={cancel}
                item={item}
                error={isFetching?.error?.data?.message}
                body={<div className='gap-y-2 flex flex-col'>
                    <Input label="Area" required name="area_name" value={item.area_name} onChange={handleChange} />
                   
                    <TextArea label="Description" name="desc" value={item.desc} onChange={handleChange} />
                </div>}
                name="areas" setPopUp={setPopUp} />}
            {show && <Delete_Modal
                item={item}
                submit={submitDelete}
                cancel={cancel}
                name="areas" setPopUp={setShow} />}
        </>

    )
}

export default index


