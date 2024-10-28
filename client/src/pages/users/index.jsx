import React, { useEffect, useState } from 'react'
import Table from '../../components/table';
import Modal from '../../components/modals/delete_modal';
import Create_Modal from '../../components/modals/create_modal';
import Input, { SelectContainer } from '../../components/modals/input';
import Delete_Modal from '../../components/modals/delete_modal';
import { useFetch_coursesQuery } from '../../features/slices/cousesSlice';
import { useDelete_userMutation, useGet_usersQuery, usePost_userMutation, useUpdate_userMutation } from '../../features/slices/usersApiSlice';
import { useLocation } from 'react-router-dom';
import { useFetch_specialitysQuery } from '../../features/slices/specialitySlice';
import SelectInput from '../../components/SelectInput';
import { toSingular } from '../../helperFunc';
function index() {
    const [popUp, setPopUp] = useState(false)
    const [show, setShow] = useState(false)

    const [error, setError] = useState(undefined)
    const location = useLocation()

    const columns = [
        { Header: 'name', accessor: 'name' },
        { Header: 'Phone Number', accessor: 'phone_number' },
        { Header: 'Email Address', accessor: 'email' },
        { Header: 'Identificaton', accessor: 'ID_no' },

    ];

    const [tabs, setTabs] = useState([
        // { title: "Admin", active: true },
        { title: "doctors", active: true },
        { title: "receptionists", active: false },
        { title: "pharmacists", active: false },
        { title: "nurses", active: false },
    ]);

    const [Post_user] = usePost_userMutation()

    const [delete_user,] = useDelete_userMutation()
    const [UpdateUser] = useUpdate_userMutation()
    let TabItem = tabs.filter(t => t.active)[0].title
    const [filter, setFilter] = useState({
        page: 1, limit: 7,
        activeTab: 1,
        pageNumber: 0,
        role: TabItem,
        course: "",
        word: "",

    })

    const { data, refetch, isLoading, isSuccess, } = useGet_usersQuery(filter)

    const handleChange = (e, name) => {
        setItem(((prev) => ({
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
            }
            await refetch()
            setPopUp(false)
            setItem(initialState)


        } catch (error) {

            setError(error?.data?.message)


        }


    }

    const initialState = {
        name: "",
        email: "",
        phone_number: "",
        ID_no: "",
        role: TabItem,
        speciality: "",
        dob: "01.01.01",
        gender: "",

    }

    const [item, setItem] = useState(initialState)

    const Tab = ({ title, active }) => {
        return (
            <div onClick={() => {

                setTabs((prevTabs) =>
                    prevTabs.map((tab) => ({
                        ...tab,
                        active: tab.title === title,
                    }))
                );



            }} className="flex h-full   text-white  justify-center items-center">
                <div
                    className={`flex px-2 py-1 capitalize ${active ? "bg-blue-400 text-black" : " text-white bg-blue-700"
                        } shadow-2xl  rounded-md justify-center items-center`}
                >
                    {title}
                </div>
            </div>
        );
    };
    const { data: specialities, isSuccess: studentsSuccess } = useFetch_specialitysQuery({
        page: 1, limit: 7,
        activeTab: 1,
        pageNumber: 0,
        word: "",
    })
    console.log(specialities)
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
            <div className="flex w-full  my-2   gap-x-1 rounded-md justify-center items-center">
                {tabs.map((tab, i) => (
                    <Tab key={i} title={tab.title} active={tab.active} />
                ))}
            </div>
            <Table isLoading={isLoading} key_column="name" columns={columns} setPopUp={setPopUp} setItem={setItem} setShow={setShow} title={TabItem} data={isSuccess && data !== undefined ? data.results.results
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
                        <Input label="Email" required name="email" value={item.email} onChange={handleChange} />
                        <Input label="ID" required name="ID_no" value={item.ID_no} type="number" onChange={handleChange} />
                    </div>
                    <div className="flex gap-x-2">
                        <SelectContainer key_name="name" label="Gender" array={[{
                            name: "Male", _id: "male"
                        }, {
                            name: "Female", _id: "female"
                        }, {
                            name: "Not willing to specify", _id: "Not willing to specify"
                        }]} required value={item.course} handleChange={(e) => setItem(((prev) => ({
                            ...prev, gender: e.target.value
                        })))} />
                        <SelectInput label="Student" searches="specifications" required value_holder="_id" handleChange={(e) => {
                            setItem(((prev) => ({
                                ...prev, speciality: e,
                            })))
                        }}
                            lable_holder="speciality_name" options={studentsSuccess && specialities !== undefined ? specialities.results.results : []} />
                        {/* <SelectContainer key_name="name" label="Gender" array={[{
                            name: "general", _id: "general"
                        }, {
                            name: "gynaecologist ", _id: "gynaecologist "
                        }, {
                            name: "Not willing to specify", _id: "Not willing to specify"
                        }]} required value={item.course} handleChange={(e) => setItem(((prev) => ({
                            ...prev, gender: e.target.value
                        })))} /> */}
                    </div>

                </div>}
                name={toSingular(TabItem)} setPopUp={setPopUp} />}

            {show && <Delete_Modal
                item={item}
                submit={deleteUser}
                cancel={() => setItem(initialState)}
                name="Course" setPopUp={setShow} />}
        </>

    )
}

export default index