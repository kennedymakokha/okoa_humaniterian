/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useGet_usersQuery } from "../../features/slices/usersApiSlice";
import Table from "../../components/table";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Certificate from "../certificate/cert";
import { exportToExcel } from "../../helperFunc";
const Students=({details,setUser,setShow})=> {

    const [filter, setFilter] = useState({
        page: 1,
        limit: 7,
        activeTab: 1,
        pageNumber: 0,
        role: "",
        word: "",
        course: details?._id,
      });
      const { data, isSuccess, isLoading } = useGet_usersQuery(filter);
  return (
    <div>

         {isSuccess &&
            data !== undefined &&
            data?.results?.results
              .filter((item) => item.role === "student")
              .map((student) => (
                <div
                  key={student._id}
                  className="flex gap-x-20 odd:bg-gray-200 p-2 items-center w-full text-[18px]"
                >
                  <Link
                    className="w-44 items-center justify-left flex"
                    to={`/students/${student.name
                      .replace(/\s+/g, "-")
                      .toLowerCase()}`}
                    state={{ details: student }}
                  >
                    {student.name}
                  </Link>
                  <div className="flex w-44 ">{student.phone_number}</div>
                  <div
                    className="flex h-10 items-center rounded-md font-bold text-slate-200  justify-center shadow-2xl px-4 bg-green-400"
                    onClick={() => {
                      setUser({
                        name: `${student.name}`,
                        date: `${student.name}`,
                      });
                      setShow(true);
                    }}
                  >
                    Print Cert
                  </div>
                </div>
              ))}
    </div>
  )
}

export default Students