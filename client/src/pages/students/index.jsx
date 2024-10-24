import React, { useEffect, useState } from 'react'
import Table from '../../components/table';
import Modal from '../../components/modals/delete_modal';
import Create_Modal from '../../components/modals/create_modal';
import Input, { SelectContainer } from '../../components/modals/input';
import Delete_Modal from '../../components/modals/delete_modal';
import { useFetch_coursesQuery } from '../../features/slices/cousesSlice';
import { useDelete_userMutation, useEnrollUserMutation, useGet_usersQuery, usePost_guardianMutation, usePost_userMutation, useUpdate_userMutation } from '../../features/slices/usersApiSlice';
import { useLocation } from 'react-router-dom';

function index() {
    const [popUp, setPopUp] = useState(false)
    const [show, setShow] = useState(false)
    const [next, setNext] = useState(false)
    const [error, setError] = useState(undefined)
    const location = useLocation()
    let role = location.pathname.replace(/\//g, "").slice(0, -1)

    const initialState = {
        name: "",
        email: "",
        phone_number: "",
        ID_no: "",
        role: role,
        dob: "",
        gender: "",
        course: "",
        course_name: "",
        state: ""
    }
    const newguardian = {
        name: "",
        address: "",
        relationship: "",
        phone_number: "",
        ID_no: "",
        id: ""
    }
    const [item, setItem] = useState(initialState)
    const [nextOfKin, setNextOfKin] = useState(newguardian)
    const columns = [
        { Header: 'Adm', accessor: 'adm_no' },
        { Header: 'name', accessor: 'name' },
        { Header: 'Phone Number', accessor: 'phone_number' },
       
        { Header: 'Identificaton', accessor: 'ID_no' },
        { Header: 'gender', accessor: 'gender' },
        { Header: 'Date of Birth', accessor: 'dob' },
       
    ];
    const { data: courses, isLoading, isSuccess: cousrsesSuccess } = useFetch_coursesQuery()
    const [Post_user] = usePost_userMutation()
    const [Post_Guardian] = usePost_guardianMutation()
    const [delete_user,] = useDelete_userMutation()
    const [UpdateUser] = useUpdate_userMutation()
    const [EnrolUser] = useEnrollUserMutation()

    const [filter, setFilter] = useState({
        page: 1, limit: 7,
        activeTab: 1,
        pageNumber: 0,
        role: role,
        word: "",
        course: ""

    })
    const { data, refetch, isSuccess, } = useGet_usersQuery(filter)

    const handleChange = (e, name) => {
        setError("")
        setItem(((prev) => ({
            ...prev, [name]: e
        })))
    }
    const handleNXTChange = (e, name) => {
        setError("")
        setNextOfKin(((prev) => ({
            ...prev, [name]: e
        })))

    }
    const submit = async () => {
        try {
            let response
            if (item._id) {
                await UpdateUser(item).unwrap()
            }
            else {
                response = await Post_user(item).unwrap()
                setPopUp(false)
            }

            await refetch()
            setItem(initialState)
            // console.log(response)

        } catch (error) {
            // console.log(error)
            setError(error?.data?.message)


        }


    }
    const submitGuardian = async () => {
        try {
            await Post_Guardian(nextOfKin).unwrap()
            setNext(false)
            await refetch()
            setNextOfKin(newguardian)
        } catch (error) {

            setError(error?.data?.message)
        }
    }
    const deleteUser = async () => {
        try {
            await delete_user(item._id).unwrap()
            await refetch()
            setItem(initialState)
            setShow(false)
        } catch (error) {
            console.log(error)
        }
    }
    const enrolUser = async (item) => {
        try {
            await EnrolUser(item._id).unwrap()
            await refetch()
            setNextOfKin(((prev) => ({
                ...prev, id: item._id
            })))
            setNext(true)
        } catch (error) {

        }
    }

    return (
        <>
            <Table enrolUser={enrolUser} isLoading={isLoading} key_column="name" columns={columns} setPopUp={setPopUp} setItem={setItem} setShow={setShow} title="students" data={isSuccess && data !== undefined ? data.results.results
                : []}
                paginate={data?.results?.pager} filter={filter} refetch={refetch} setFilter={setFilter}
            />
            {popUp && <Create_Modal
                error={error}
                submit={submit}
                cancel={() => setItem(initialState)}
                item={item}
                body={<div className='gap-y-2 flex w-full flex-col'>
                    <div className="flex gap-2">
                        <Input label="Name" required name="name" value={item.name} onChange={handleChange} />
                        <Input label="phone" required name="phone_number" value={item.phone_number} onChange={handleChange} />
                    </div>
                    <div className="flex gap-x-2">
                        <Input label="Email" name="email" value={item.email} onChange={handleChange} />
                        <Input label="ID" name="ID_no" value={item.ID_no} type="number" onChange={handleChange} />
                    </div>
                    <div className="flex gap-x-2">
                        <SelectContainer key_name="name" label="Gender" name="Gender" array={[{
                            name: "Male", _id: "male"
                        }, {
                            name: "Female", _id: "female"
                        }, {
                            name: "Not willing to specify", _id: "Not willing to specify"
                        }]} required value={item.course} handleChange={(e) => setItem(((prev) => ({
                            ...prev, gender: e.target.value
                        })))} />
                        <SelectContainer key_name="course_name" label="Course" array={cousrsesSuccess && courses !== undefined ? courses : []} required name="Course" value={item.course} handleChange={(e) => {
                            setItem(((prev) => ({
                                ...prev, course: e.target.value, course_name: courses.find(item => item._id === e.target.value)["course_name"]
                            })))
                        }} />
                    </div>
                    <div className="flex gap-x-2">
                        <SelectContainer key_name="name" label="" array={[
                            {
                                name: "Both Parents Alive", _id: "parented"
                            }, {
                                name: "Half orphan", _id: "half-orphan"
                            }, {
                                name: "Total Orphan", _id: "total-orphan"
                            }, {
                                name: "Abandoned", _id: "abandoned"
                            }]} required name="State" value={item.course} handleChange={(e) => setItem(((prev) => ({
                                ...prev, state: e.target.value
                            })))} />
                        <Input label="DOB" required name="dob" type="date" value={item.dob} onChange={handleChange} />
                    </div>
                </div>}
                name="Student" setPopUp={setPopUp} />}
            {next && <Create_Modal
                submit={submitGuardian}
                error={error}
                cancel={() => setItem(initialState)}
                item={nextOfKin}
                body={<div className='gap-y-2 flex w-full flex-col'>
                    <div className="flex gap-2">
                        <Input label="Name" required name="name" value={nextOfKin.name} onChange={handleNXTChange} />
                        <Input label="phone" required name="phone_number" value={nextOfKin.phone_number} onChange={handleNXTChange} />
                    </div>
                    <div className="flex gap-x-2">
                        <Input label="Email" name="email" value={nextOfKin.email} onChange={handleNXTChange} />
                        <Input label="ID" required name="ID_no" value={nextOfKin.ID_no} type="number" onChange={handleNXTChange} />
                    </div>
                    <div className="flex gap-x-2">
                        <Input label="Address" name="address" value={nextOfKin.address} onChange={handleNXTChange} />
                        <SelectContainer key_name="name" label="" array={[
                            {
                                name: "Parent", _id: "parent"
                            }, {
                                name: "Guardian", _id: "guardian"
                            }, {
                                name: "Sibling", _id: "sibling"
                            },]} required name="relationship" value={item.relationship} handleChange={(e) => setNextOfKin(((prev) => ({
                                ...prev, relationship: e.target.value
                            })))} />
                    </div>
                </div>}
                name="Next Of Kin" setPopUp={setNext} />}
            {show && <Delete_Modal
                item={item}
                submit={deleteUser}
                cancel={() => setItem(initialState)}
                name="Course" setPopUp={setShow} />}
        </>

    )
}

export default index