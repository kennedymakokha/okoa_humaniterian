import React, { useState } from 'react'
import Table from '../../../components/table';
import { useLocation } from 'react-router-dom';
import { useFetch_prac_resultQuery } from '../../../features/slices/dataEntrySlice';

function Practicals({ data1 }) {
  

    const columns = [
        { Header: 'Students', accessor: 'test' },
        { Header: 'Total Records', accessor: 'records' },
        { Header: 'Records Entered', accessor: 'records_entered' },
        { Header: 'Speed', accessor: 'speed' },
        { Header: 'Accuracy', accessor: 'accuracy' },
        { Header: 'Time', accessor: 'time' },


    ];
    const { data, isLoading, isSuccess } = useFetch_prac_resultQuery(data1._id)



    return (
        <>
            <Table notdetailed isLoading={isLoading} key_column="studentName" columns={columns} title={`${name} Practical Results`} data={isSuccess && data !== undefined ? data
                : []}
                paginate={data?.results?.pager}
            />
        </>

    )
}

export default Practicals