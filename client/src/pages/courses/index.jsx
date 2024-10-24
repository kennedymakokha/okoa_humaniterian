import React, { useState } from 'react'
import Table from '../../components/table';
import Create_Modal from '../../components/modals/create_modal';
import Input from '../../components/modals/input';
import Delete_Modal from '../../components/modals/delete_modal';
import { useCreate_courseMutation, useDelete_courseMutation, useFetch_coursesQuery, useUpdate_courseMutation } from '../../features/slices/cousesSlice';



function index() {
    const [popUp, setPopUp] = useState(false)
    const [show, setShow] = useState(false)
    const [err, setError] = useState(undefined)
    const initialState = {
        course_name: "",
        course_duration: ""
    }
    const [item, setItem] = useState(initialState)
    const columns = [
        { Header: 'Course', accessor: 'course_name' },
        { Header: 'Duration(months)', accessor: 'course_duration' },

        { Header: 'Price', accessor: 'course_price' },
    ];
    const { data, isLoading, isSuccess, refetch } = useFetch_coursesQuery()

    const [PostCourse, isFetching, error] = useCreate_courseMutation()
    const [UpdateCourse] = useUpdate_courseMutation()

    const [DeleteCourse] = useDelete_courseMutation()

    const handleChange = (e, name) => {
        setItem(((prev) => ({
            ...prev, [name]: e
        })))

    }

    const submit = async () => {

        try {
            if (item._id) {
                
                await UpdateCourse(item).unwrap()
            } else {
                await PostCourse(item).unwrap()
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
            await DeleteCourse(item._id).unwrap()
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

            <Table isLoading={isLoading} key_column="course_name" columns={columns} setPopUp={setPopUp} setItem={setItem} setShow={setShow} title="Courses Offered" data={isSuccess && data !== undefined ? data : []} />

            {popUp && <Create_Modal
                submit={submit}
                cancel={cancel}
                item={item}
                error={isFetching?.error?.data?.message}
                body={<div className='gap-y-2 flex flex-col'>
                    <Input label="Course" name="course_name" value={item.course_name} onChange={handleChange} />
                    <Input label="Duration" name="course_duration" value={item.course_duration} type="number" onChange={handleChange} />
                    <Input label="Price" name="course_price" value={item.course_price} type="number" onChange={handleChange} />
                </div>}
                name="Course" setPopUp={setPopUp} />}
            {show && <Delete_Modal
                item={item}
                submit={submitDelete}
                cancel={cancel}
                name="Course" setPopUp={setShow} />}
        </>

    )
}

export default index