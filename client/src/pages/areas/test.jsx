 /* eslint-disable react/prop-types */
// src/App.js
import React, { useState } from "react";

import { useLocation } from "react-router-dom";
import { useGet_usersQuery } from "../../features/slices/usersApiSlice";

import { exportToExcel } from "../../helperFunc";


export const generatePDF = () => {
  const input = document.getElementById("certificate");
  html2canvas(input).then((canvas) => {
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF();
    pdf.addImage(imgData, "PNG", 0, 0);
    pdf.save("certificate.pdf");
  });
};
const App = () => {
  const [name, setName] = useState("");
  const [show, setShow] = useState(false);

  const [user, setUser] = useState({
    name: "",
    validity: "",
  });
  const location = useLocation();
  const { details } = location.state;
  const [filter, setFilter] = useState({
    page: 1,
    limit: 7,
    activeTab: 1,
    pageNumber: 0,
    role: "",
    word: "",
    course: details._id,
  });
 
  const { data, isSuccess } = useGet_usersQuery(filter);
  const [tabs, setTabs] = useState([
    { title: "students", active: true },
    { title: "practicals", active: false },
    { title: "exams", active: false },
  ]);
  
  const Tab = ({ title, active }) => {
    return (
      <div  onClick={()=>{
       
            setTabs((prevTabs) =>
              prevTabs.map((tab) => ({
                ...tab,
                active: tab.title === title,
              }))
            );
          
          

      }} className="flex h-full   text-white  justify-center items-center">
        <div
          className={`flex px-2 py-1 capitalize ${
            active ? "bg-blue-400 text-black" : " text-white bg-blue-700"
          } shadow-2xl  rounded-md justify-center items-center`}
        >
          {title}
        </div>
      </div>
    );
  };
  let TabItem = tabs.filter(t=>t.active)[0].title
  return (
    <div className="w-full  relative z-0">
      <div className="w-full h-full flex items-center flex-col gap-y-20 justify-center">
        <h2 className="text-[#98daf8] text-40 font-bold underline uppercase">
          {details.course_name}
        </h2>
        <div className="flex w-full border flex-col bg-slate-50 p-2">
          <div className="flex w-full  my-2   gap-x-1 rounded-md justify-center items-center">
            {tabs.map((tab, i) => (
              <Tab key={i} title={tab.title} active={tab.active} />
            ))}
          </div>
          <div className="flex w-full gap-x-10 items-center justify-end">
            <div
              onClick={() =>
                exportToExcel(
                  isSuccess &&
                    data !== undefined &&
                    data?.results?.results.filter(
                      (item) => item.role === "student"
                    ),
                  `${details.course_name}_students`
                )
              }
              className="px-4 text-[18px] shadow-2xl  bg-slate-500 flex items-center justify-center font-bold text-white rounded-md"
            >
              Export
            </div>
            By{" "}
            {isSuccess &&
              data !== undefined &&
              data?.results?.results?.filter(
                (item) => item.role === "instructor"
              )[0]?.name}
          </div>

          <div className="flex items-center uppercase justify-center font-bold">
            {TabItem}
          </div>
       
        </div>
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
//             <h2 className="text-[#98daf8] text-40 font-bold underline uppercase">{details.course_name}</h2>
//
//             <div id="certificate" className=''>
//                 {/* <Certificate data={user} /> */}
//                 <Certificate user={{name:"kenn",date:"james",course:"law"}} />
//             </div>
//             <div className="flex flex-col w-40 h-40 bg-[#98daf8] font-bold text-white text-5xl rounded-full items-center justify-center">
//                 {
//                     details.duration
//                 }
//                 <span className='text-sm'>months</span>
//             </div>
//         </div>
//     )
// }

// export default Course
