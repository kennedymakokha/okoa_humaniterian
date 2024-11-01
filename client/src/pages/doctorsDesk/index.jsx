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
import TabBatton from '../../components/tabBatton';
function index() {
    const [popUp, setPopUp] = useState(false)
    const [state, setState] = useState(true)
    const [menustate, setmenuState] = useState(true)

    const columns = [
        { Header: 'Reg No', accessor: 'reg_no' },
        { Header: 'name', accessor: 'name' },
        { Header: 'Date', accessor: `createdAt` },
    ];
    const [menus, setMenu] = useState([
        {
            title: "From Triage",
            state: true
        },
        {
            title: "From Lab",
            state: false
        },

    ])
    let tabTitle = menus.filter(item => item.state)[0]['title']
    const [filter, setFilter] = useState({
        page: 1, limit: 7,
        activeTab: 1,
        pageNumber: 0,
        word: "",
        state: "doctors-table"


    })
    const { data, refetch, isSuccess, isLoading, } = useGet_patientsQuery(filter)
    const toggleMenu = async (title) => {
        setFilter(prevItems => ({
            ...prevItems, state: title
        }))
        setmenuState(!menustate)
        await refetch()
    }
    return (
        <>

            <div className="flex w-full h-10 mt-8 border-b-[0.001px] gap-x-0">

                <TabBatton length={menus.length} toggleState={() => toggleMenu("doctors-table")} title="From Triage" state={menustate} />
                <TabBatton length={menus.length} toggleState={() => toggleMenu("doctors-table-after")} title="From Lab" state={!menustate} />
            </div>
            <Table linkto={`/doctors-desk/${filter.state}`} noExport noAdd noAction editOnly isLoading={isLoading && !isSuccess} key_column="name" columns={columns} title="Triages" data={isSuccess && data !== undefined ? data.results.results
                : []}
                paginate={data?.results?.pager} filter={filter} refetch={refetch} setFilter={setFilter}
            />


        </>

    )
}

export default index