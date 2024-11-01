import React, { useEffect, useState } from 'react'
import Table from '../../components/table';
import Create_Modal from '../../components/modals/create_modal';
import Input, { SelectContainer } from '../../components/modals/input';
import Delete_Modal from '../../components/modals/delete_modal';
import { useFetch_coursesQuery } from '../../features/slices/cousesSlice';
import { usePost_guardianMutation, usePost_patientsMutation, useAdmit_patientMutation, useDelete_patientMutation, useEdit_patientMutation, useFetch_patientQuery, useGet_patientsQuery, useValidate_input_patientsMutation, } from '../../features/slices/patientsSlice';
import { useLocation } from 'react-router-dom';
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


    const initialState = {
        name: "",
        phone_number: "",
        pay_number: "",
        ID_no: "",
        age: "",
        gender: "",
        dept: "",
        role: "patient",
        password: "Makokha12!"
        // state: ""
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
        { Header: 'Reg No', accessor: 'reg_no' },
        { Header: 'name', accessor: 'name' },
        { Header: 'Phone Number', accessor: 'phone_number' },

        { Header: 'Identificaton', accessor: 'ID_no' },
        { Header: 'gender', accessor: 'gender' },
        { Header: 'age', accessor: 'age' },

    ];

    const [Post_user] = usePost_patientsMutation()
    const [validate_user] = useValidate_input_patientsMutation()
    const [Post_Guardian] = usePost_guardianMutation()
    const [delete_user,] = useDelete_patientMutation()
    const [UpdateUser] = useEdit_patientMutation()
    const [EnrolUser] = useAdmit_patientMutation()

    const [filter, setFilter] = useState({
        page: 1, limit: 10,
        activeTab: 1,
        pageNumber: 0,
        word: "",
        course: "",
        state: "all"

    })
    const { data, refetch, isSuccess, isLoading, } = useGet_patientsQuery(filter)

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
    const closePay = async () => {
        setPay(false)
        await refetch()
        setPaying(!paying)
        setItem(initialState)
    }
    const Pay = async () => {
        try {
            setPaying(!paying)
            await Post_user(item).unwrap()
            setTimeout(() => closePay(), 6000);
            await refetch()
            socket.emit("hello", "triage-table");

        } catch (error) {

        }
    }
    const submit = async () => {
        try {
            let response
            if (item._id) {
                await UpdateUser(item).unwrap()
            }
            else {
                await validate_user(item).unwrap()
                setPay(true)
                setItem(prev => ({ ...prev, pay_number: item.phone_number }))
               
            }
            await refetch()
            socket.emit("hello", "triage-table");
            setPopUp(false)
            // setItem(initialState)
        } catch (error) {
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
    const { data: specialities, isSuccess: studentsSuccess } = useFetch_specialitysQuery({
        page: 1, limit: 200,
        activeTab: 1,
        pageNumber: 0,
        word: "",

    })


    return (
        <>
            <Table enrolUser={enrolUser} isLoading={isLoading} key_column="name" columns={columns} setPopUp={setPopUp} setItem={setItem} setShow={setShow} title="Patients" data={isSuccess && data !== undefined ? data.results.results
                : []}
                paginate={data?.results?.pager} filter={filter} refetch={refetch} setFilter={setFilter}
            />
            {popUp && <Create_Modal
                error={error}
                submit={submit}
                cancel={() => console.log(item)}
                submitName="Continue"
                // cancel={() => setItem(initialState)}
                item={item}
                body={<div className='gap-y-2 flex w-full flex-col'>
                    <div className="flex gap-2">
                        <Input label="Name" required name="name" value={item.name} onChange={handleChange} />
                        <Input label="phone" required name="phone_number" value={item.phone_number} onChange={handleChange} />
                    </div>
                    <div className="flex gap-x-2">

                        <Input label="ID" name="ID_no" value={item.ID_no} type="number" onChange={handleChange} />
                        <SelectContainer key_name="name" label="Gender" name="Gender" array={[{
                            name: "Male", _id: "male"
                        }, {
                            name: "Female", _id: "female"
                        }, {
                            name: "Not willing to specify", _id: "Not willing to specify"
                        }]} required value={item.course} handleChange={(e) => setItem(((prev) => ({
                            ...prev, gender: e.target.value
                        })))} />
                    </div>
                    <div className="flex gap-x-2">
                        <Input label="Age" required name="age" value={item.age} onChange={handleChange} />
                        <SelectInput label="Speciality" searches="specifications" value_holder="_id" handleChange={(e) => {
                            setItem(((prev) => ({
                                ...prev, speciality: e,
                            })))
                        }}
                            lable_holder="speciality_name" options={studentsSuccess && specialities !== undefined ? specialities.results.results : []} />
                    </div>

                </div>}
                name="Patient" setPopUp={setPopUp} />}
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
            {pay && <Payment_Modal
                item={item}
                paying={paying}
                handleChange={handleChange}
                submit={Pay}
                setItem={setItem}
                cancel={() => setItem(prev => ({ ...prev, pay_number: item.phone_number }))}
                name="Consultation" phone={item.pay_number} setPopUp={setPay} />}
        </>

    )
}

export default index