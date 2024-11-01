import React, { useState } from 'react'
import Table from '../../components/table';
import { useGet_patientsQuery, } from '../../features/slices/patientsSlice';
function index() {
 

    const columns = [
        { Header: 'Reg No', accessor: 'reg_no' },
        { Header: 'name', accessor: 'name' },
        { Header: 'Date', accessor: `createdAt` },
    ];
   
    const [filter, setFilter] = useState({
        page: 1, limit: 7,
        activeTab: 1,
        pageNumber: 0,
        word: "",
        state: "lab"


    })
    const { data, refetch, isSuccess, isLoading, } = useGet_patientsQuery(filter)
   
    return (
        <>

           
            <Table noExport noAdd noAction editOnly isLoading={isLoading && !isSuccess} key_column="name" columns={columns} title="Triages" data={isSuccess && data !== undefined ? data.results.results
                : []}
                paginate={data?.results?.pager} filter={filter} refetch={refetch} setFilter={setFilter}
            />


        </>

    )
}

export default index