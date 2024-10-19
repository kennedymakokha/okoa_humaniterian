// src/App.js
import React, { useState } from 'react';
import Certificate from './cert.jsx';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';



export  const generatePDF = () => {
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
    const [date, setDate] = useState('');


    return (
        <div>
            <h1>Certificate Generator</h1>
            {/* <input
                type="text"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="text"
                placeholder="Enter Date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
            /> */}
            <button onClick={generatePDF}>Generate PDF</button>
            <div className="flex">
                
            </div>
            <div  id="certificate">
                <Certificate user={{name:"kenn",date:"james",course:"law"}} />
            </div>
        </div>
    );
};

export default App;
