import React, { useState } from 'react'
import Table from '../../../components/table';
import { useLocation } from 'react-router-dom';
import daysjs from 'dayjs'
import { useFetch_user_financesQuery } from '../../../features/slices/financeSlice';

function Finances({ data1 }) {

    const columns = [
        { Header: 'Amount', accessor: 'amount' },
        { Header: 'Mode Of payment', accessor: 'mode' },
        { Header: 'Receipt', accessor: 'receipt' },
        { Header: 'Date', accessor: `createdAt` },
    ];

    const [filter, setFilter] = useState({
        page: 1, limit: 7,
        activeTab: 1,
        pageNumber: 0,
        word: "",
        id: data1._id

    })
    const { data, isLoading, isSuccess, refetch } = useFetch_user_financesQuery(filter)

    return (
        <>
            <Table notLinkable noAction noAdd isLoading={isLoading} key_column="student_name" columns={columns} title={`Fee Statement`} data={isSuccess && data !== undefined ? data.results.results
                : []}
                paginate={data?.results?.pager} filter={filter} refetch={refetch} setFilter={setFilter}
            />
        </>

    )
}

export default Finances