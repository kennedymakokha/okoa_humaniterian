import React, { useState } from 'react'
import Table from '../../components/table';
import Create_Modal from '../../components/modals/create_modal';
import Input, { SelectContainer } from '../../components/modals/input';
import { useGet_usersQuery } from '../../features/slices/usersApiSlice';
import { useLocation } from 'react-router-dom';
import { useGet_users_financesQuery, useUpdate_user_financesMutation } from '../../features/slices/financeSlice';
import SelectInput from '../../components/SelectInput';
import TabBatton from '../../components/tabBatton';

function index() {
    const [popUp, setPopUp] = useState(false)
    const [show, setShow] = useState(false)
    const [error, setError] = useState(undefined)
    const location = useLocation()
    let role = location.pathname.replace(/\//g, "").slice(0, -1)

    const initialState = {
        amount: "",
        student: "",
        receipt: "",
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
        course: "",
        for: "fee"
    })


    const [Post_Fees] = useUpdate_user_financesMutation()

    const [menus, setMenu] = useState([
        {
            title: "home",
            state: true
        },
        {
            title: "fee",
            state: false
        },
        {
            title: "electricity",
            state: false
        },
        {
            title: "internet",
            state: false
        }
    ])
    let tabTitle = menus.filter(item => item.state)[0]['title']
    const [filter, setFilter] = useState({
        page: 1, limit: 7,
        activeTab: 1,
        pageNumber: 0,
        role: role,
        course: "",
        word: "",
        form: tabTitle

    })

    const { data, refetch, isSuccess, } = useGet_users_financesQuery(filter)

    const handleChange = (e, name) => {
        setItem(((prev) => ({
            ...prev, [name]: e
        })))
    }
    const showMoadal = (data) => {
        if (data) {
            setItem({
                student: data._id,
                student_name: data.student_name,
            })
        }
        setPopUp(true)
    }

    const submit = async () => {
        try {
            if (item._id) {
                item.student = item.student._id
                delete item._id
            }
            await Post_Fees(item).unwrap()
            setPopUp(false)

            await refetch()
            setItem(initialState)
        } catch (error) {
            setError(error?.data?.message)
        }
    }


    return (
        <>

            <div className="flex w-full h-10 mt-8 border-b-[0.001px] gap-x-0">
                {menus.map((menu, i) => (
                    <TabBatton key={i} toggleState={() => setMenu(prevItems =>
                        prevItems.map(item => ({
                            ...item,
                            state: item.title === menu.title // Set the state to true if the title matches, else false
                        }))
                    )} title={menu.title} state={menu.state} />
                ))}
            </div>
            <Table noAction otherAction="pay" isLoading={isLoading} key_column="student_name" columns={columns} openModal={showMoadal} setPopUp={setPopUp} setItem={setItem} setShow={setShow} title={`${tabTitle}`} data={isSuccess && data !== undefined ? data.results.results
                : []}
                paginate={data?.results?.pager} filter={filter} refetch={refetch} setFilter={setFilter}
            />
            {popUp && <Create_Modal
                error={error}
                submit={submit}
                disable={item._id}
                cancel={() => setItem(initialState)}
                item={item}
                body={<div className='gap-y-2  flex w-full flex-col'>{item.mode}
                    {item._id === undefined && <div className="flex gap-x-2">
                        <SelectInput label="Student" searches="students" required value_holder="_id" handleChange={(e) => {
                            setItem(((prev) => ({
                                ...prev, student: e, student_name: students.results.results.find(item => item._id === e)["name"]
                            })))
                        }}
                            lable_holder="name" options={studentsSuccess && students !== undefined ? students.results.results : []} />

                    </div>}
                    <div className="flex gap-2">
                        <Input label="Amount" required name="amount" value={item.name} onChange={handleChange} />
                    </div>


                    <div className="flex gap-x-2">
                        <SelectContainer key_name="name" label="" array={[{
                            name: "M-Pesa", _id: "mpesa"
                        }, {
                            name: "Bank Transfare", _id: "bank"
                        }, {
                            name: "Cash", _id: "cash"
                        }]} required name="Mode" value={item.mode} handleChange={(e) => setItem(((prev) => ({
                            ...prev, mode: e.target.value
                        })))} />

                    </div>
                    {item.mode === "mpesa" && <div className="flex gap-2">
                        <Input label="Receipt" name="receipt" value={item.receipt} onChange={handleChange} />
                    </div>}


                </div>}
                name="Payment" setPopUp={setPopUp} />}

        </>

    )
}

export default index