import React, { useState } from 'react'
import Table from '../../components/table';
import Create_Modal from '../../components/modals/create_modal';
import Input, { TextArea } from '../../components/modals/input';
import Delete_Modal from '../../components/modals/delete_modal';
import { useCreate_drugsMutation,useDelete_drugsMutation,useFetch_drugsQuery,useUpdate_drugsMutation} from '../../features/slices/drugSlice';



function index() {
    const [popUp, setPopUp] = useState(false)
    const [show, setShow] = useState(false)
    const [err, setError] = useState(undefined)
    const initialState = {
        drug_name: "",
        price: null,
        
    }
    const [item, setItem] = useState(initialState)
    const columns = [
        { Header: 'Name', accessor: 'drug_name' },
        { Header: 'price', accessor: 'price' },

    ];
    const [filter, setFilter] = useState({
        page: 1, limit: 7,
        activeTab: 1,
        pageNumber: 0,

        word: "",
    })
    const { data, isLoading, isSuccess, refetch } = useFetch_drugsQuery(filter)

    const [Posttests, isFetching, error] = useCreate_drugsMutation()
    const [Updatetests] = useUpdate_drugsMutation()

    const [Deletetests] = useDelete_drugsMutation()

    const handleChange = (e, name) => {
        setItem(((prev) => ({
            ...prev, [name]: e
        })))

    }

    const submit = async () => {

        try {
            if (item._id) {

                await Updatetests(item).unwrap()
            } else {
                await Posttests(item).unwrap()
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
            await Deletetests(item._id).unwrap()
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
            <Table notLinkable isLoading={isLoading} key_column="drug_name" columns={columns} setPopUp={setPopUp} setItem={setItem} setShow={setShow} title="Lab Test Offered" data={isSuccess && data !== undefined ? data.results.results
                : []}
                paginate={data?.results?.pager} filter={filter} refetch={refetch} setFilter={setFilter}
            />
            {popUp && <Create_Modal
                submit={submit}
                cancel={cancel}
                item={item}
                error={isFetching?.error?.data?.message}
                body={<div className='gap-y-2 flex flex-col'>
                    <Input label="Name" required name="drug_name" value={item.drug_name} onChange={handleChange} />
                    <Input label="Price" required name="price" value={item.price} type="number" onChange={handleChange} />
                  
                </div>}
                name="Drug" setPopUp={setPopUp} />}
            {show && <Delete_Modal
                item={item}
                submit={submitDelete}
                cancel={cancel}
                name="tests" setPopUp={setShow} />}
        </>

    )
}

export default index


