
// src/App.js
import React, { useState } from 'react';

import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useGet_usersQuery } from '../../features/slices/usersApiSlice'
import Table from '../../components/table'
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import Certificate from '../certificate/cert';
import { exportToExcel } from '../../helperFunc'


export const generatePDF = () => {
    const input = document.getElementById('certificate');
    html2canvas(input).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'PNG', 0, 0);
        pdf.save('certificate.pdf');
    });
};
const App = () => {
    const [name, setName] = useState('');
    const [show, setShow] = useState(false);

    const [user, setUser] = useState({
        name: "", validity: ""
    })
    const location = useLocation()
    const { details } = location.state
    const [filter, setFilter] = useState({
        page: 1, limit: 7,
        activeTab: 1,
        pageNumber: 0,
        role: "",
        word: "",
        course: details._id

    })
    const generatePDF = () => {
        setShow(true)
        const input = document.getElementById('certificate');
        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();
            pdf.addImage(imgData, 'PNG', 0, 0);
            pdf.save('certificate.pdf');
        });
        setShow(false)
    }
    const { data, refetch, isSuccess, isLoading } = useGet_usersQuery(filter)
    return (
        <div className="w-full  relative z-0">
            <div className='w-full h-full flex items-center flex-col gap-y-20 justify-center'>
                <h2 className="text-[rgb(101,12,174)] text-40 font-bold underline uppercase">{details.course_name}</h2>
                <div className="flex w-full border flex-col bg-slate-50 p-2">
                    <div className="flex w-full gap-x-10 items-center justify-end">
                        <div onClick={() => exportToExcel(isSuccess && data !== undefined && data?.results?.results.filter(item => item.role === "student"), `${details.course_name}_students`)} className='px-4 text-[18px] shadow-2xl  bg-slate-500 flex items-center justify-center font-bold text-white rounded-md'>Export</div>
                        By {isSuccess && data !== undefined && data?.results?.results?.filter(item => item.role === "instructor")[0]?.name}
                    </div>
                    <div className='flex items-center justify-center font-bold'>Students</div>
                    {isSuccess && data !== undefined && data?.results?.results.filter(item => item.role === "student").map((student) => (
                        <div key={student._id} className="flex gap-x-20 odd:bg-gray-200 p-2 items-center w-full text-[18px]">
                            <Link className='w-44 items-center justify-left flex'
                                to={`/students/${student.name.replace(/\s+/g, '-').toLowerCase()}`
                                } state={{ details: student }}>
                                {student.name}
                            </Link>
                            <div className="flex w-44 ">{student.phone_number}</div>
                            <div className="flex h-10 items-center justify-center shadow-2xl px-2 bg-green-400" onClick={() => { setUser({ name: `${student.name}`, date: `${student.name}` }); setShow(true) }}>Print Cert</div>
                        </div>
                    ))}

                </div>
              
            </div>
            <div className={`absolute inset-0 w-full h-[500px] ${show ? "flex" : "hidden"} flex-col bg-blue-700 flex justify-center items-center z-10`}>
                <div className="flex w-full items-center my-2 justify-end px-4">
                    <div onClick={generatePDF} className="flex px-2 py-1 rounded-md bg-blue-700 text-white font-bold">Print</div>
                </div>
                <Certificate user={{ name: user.name, date: user.validity, course: `${details.course_name}` }} />
            </div>
        </div>


    );
};

export default App;


// import html2canvas from 'html2canvas';
// import jsPDF from 'jspdf';
// import { exportToExcel } from '../../helperFunc'
// // import { generatePDF } from '../certificate'
// import Certificate from '../certificate/cert'

// function Course() {
//     const [user, setUser] = useState({
//         name: "ken", date: "me", course: "123"
//     })
//     const location = useLocation()
//     const { details } = location.state
//     const [filter, setFilter] = useState({
//         page: 1, limit: 7,
//         activeTab: 1,
//         pageNumber: 0,
//         role: "",
//         word: "",
//         course: details._id

//     })
//    const  generatePDF = () => {
//         const input = document.getElementById('certificate');
//         html2canvas(input).then((canvas) => {
//             const imgData = canvas.toDataURL('image/png');
//             const pdf = new jsPDF();
//             pdf.addImage(imgData, 'PNG', 0, 0);
//             pdf.save('certificate.pdf');
//         });
//     };

//     const { data, refetch, isSuccess, isLoading } = useGet_usersQuery(filter)

//     return (
//         <div className='w-full h-full flex items-center flex-col gap-y-20 justify-center'>
//             <h2 className="text-[rgb(101,12,174)] text-40 font-bold underline uppercase">{details.course_name}</h2>
//
//             <div id="certificate" className=''>
//                 {/* <Certificate data={user} /> */}
//                 <Certificate user={{name:"kenn",date:"james",course:"law"}} />
//             </div>
//             <div className="flex flex-col w-40 h-40 bg-[rgb(101,12,174)] font-bold text-white text-5xl rounded-full items-center justify-center">
//                 {
//                     details.duration
//                 }
//                 <span className='text-sm'>months</span>
//             </div>
//         </div>
//     )
// }

// export default Course