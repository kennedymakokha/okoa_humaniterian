import React, { useEffect, useState } from 'react'
import Table from '../../components/table';
import Modal from '../../components/modals/delete_modal';
import Create_Modal from '../../components/modals/create_modal';
import Input, { SelectContainer } from '../../components/modals/input';
import Delete_Modal from '../../components/modals/delete_modal';
import { useFetch_coursesQuery } from '../../features/slices/cousesSlice';
import { useDelete_userMutation, useGet_usersQuery, usePost_guardianMutation, usePost_userMutation, useUpdate_userMutation } from '../../features/slices/usersApiSlice';
import { useLocation } from 'react-router-dom';
import { useGet_users_financesQuery, useUpdate_user_financesMutation } from '../../features/slices/financeSlice';
import SelectInput from '../../components/SelectInput';

function index() {
    const [popUp, setPopUp] = useState(false)
    const [show, setShow] = useState(false)
    const [error, setError] = useState(undefined)
    const location = useLocation()
    let role = location.pathname.replace(/\//g, "").slice(0, -1)

    const initialState = {
        amount: "",
        student: "",
        receipt:"",
        mode: "",
        student_name: "",

    }

    const [item, setItem] = useState(initialState)

    const columns = [
        { Header: 'Name', accessor: 'student_name' },

        { Header: 'Arrears', accessor: 'arrears' },

        { Header: 'Date Last Paid', accessor: 'createdAt' },

    ];
    const { data: students, isLoading, isSuccess: studentsSuccess } = useGet_usersQuery({
        page: 1, limit: 100,
        activeTab: 1,
        pageNumber: 0,
        role: "student",
        word: "",
        course: ""
    })

    const [Post_user] = usePost_userMutation()
    const [Post_Fees] = useUpdate_user_financesMutation()
    const [delete_user,] = useDelete_userMutation()
    const [UpdateUser] = useUpdate_userMutation()
    const [filter, setFilter] = useState({
        page: 1, limit: 7,
        activeTab: 1,
        pageNumber: 0,
        role: role,
        course: "",
        word: "",

    })
    const { data, refetch, isSuccess, } = useGet_users_financesQuery(filter)


    const handleChange = (e, name) => {
        setItem(((prev) => ({
            ...prev, [name]: e
        })))
    }

    const submit = async () => {
        try {
            let response = await Post_Fees(item).unwrap()
            setPopUp(false)

            await refetch()
            // setItem(initialState)
            // console.log(response)

        } catch (error) {
            // console.log(error)
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

    return (
        <>
            <Table noAction isLoading={isLoading} key_column="student_name" columns={columns} setPopUp={setPopUp} setItem={setItem} setShow={setShow} title="Accounts" data={isSuccess && data !== undefined ? data.results.results
                : []}
                paginate={data?.results?.pager} filter={filter} refetch={refetch} setFilter={setFilter}
            />
            {popUp && <Create_Modal
                error={error}
                submit={submit}
                cancel={() => setItem(initialState)}
                item={item}
                body={<div className='gap-y-2  flex w-full flex-col'>{item.mode}
                    <div className="flex gap-2">
                        <Input label="Amount" required name="amount" value={item.name} onChange={handleChange} />
                    </div>

                    <div className="flex gap-x-2">
                        <SelectInput label="Student" searches="students" required value_holder="_id" handleChange={(e) => {
                            setItem(((prev) => ({
                                ...prev, student: e, student_name: students.results.results.find(item => item._id === e)["name"]
                            })))
                        }}
                            lable_holder="name" options={studentsSuccess && students !== undefined ? students.results.results : []} />

                    </div>
                    <div className="flex gap-x-2">
                        <SelectInput label="Mode" searches="modes" required value_holder="_id" handleChange={(e) => {
                            setItem(((prev) => ({
                                ...prev, mode: e,
                            })))
                        }}
                            lable_holder="name" options={[{
                                name: "M-Pesa", _id: "mpesa"
                            }, {
                                name: "Bank Transfare", _id: "bank"
                            }, {
                                name: "Cash", _id: "cash"
                            }]} />
                    </div>
                    {item.mode === "mpesa" && <div className="flex gap-2">
                        <Input label="Receipt"  name="receipt" value={item.receipt} onChange={handleChange} />
                    </div>}


                </div>}
                name="Instructor" setPopUp={setPopUp} />}

            {show && <Delete_Modal
                item={item}
                submit={deleteUser}
                cancel={() => setItem(initialState)}
                name="Course" setPopUp={setShow} />}
        </>

    )
}

export default index