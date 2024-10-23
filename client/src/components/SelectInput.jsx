

import React, { useState } from 'react';

const SearchableSelect = ({ searches, label, required, handleChange, options, lable_holder, value_holder }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedOption, setSelectedOption] = useState('');
    const [show, setShow] = useState(false);

    const handleSearchChange = (e) => {
        setShow(true)
        setSearchTerm(e.target.value);
    };

    const handleSelectChange = (e) => {
        setSelectedOption(e[value_holder]);
        handleChange(e[value_holder])
        setShow(false)
        setSearchTerm(''); // Clear search on selection
    };

    const filteredOptions = options.filter(option =>
        option[lable_holder].toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className='flex flex-col w-full'>
            <div className="flex w-full relative flex-col  rounded-md border md:border-slate-200 border-purple-800">
                <div className="flex w-full items-center px-2 justify-between">
                    <div className="flex capitalize md:text-slate-500 text-slate-50  font-bold ">
                        {label}{" "}
                        {required === true && (
                            <span className="text-red-500 px-2 font-bold">* </span>
                        )}
                    </div>
                    <>
                        <input
                            type="text"
                            placeholder={selectedOption ? options.find(item => item._id === selectedOption)[lable_holder] : `Search ${searches}...`}
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className={`flex focus:outline-none p-2 bg-transparent focus:bg-transparent  focus:ring-0 focus:ring-offset-0 w-full`}
                        />
                        <svg onClick={() => setShow(prev => !prev)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d={!show ? "m19.5 8.25-7.5 7.5-7.5-7.5" : "m4.5 15.75 7.5-7.5 7.5 7.5"} />
                        </svg>

                    </>
                </div>
                {show && <div className="flex absolute z-10 top-10 bg-slate-50 w-full flex-col">
                    {filteredOptions.map((option, index) => (
                        <div key={index} onClick={() => handleSelectChange(option)} className="flex p-2 hover:bg-slate-100 cursor-pointer">{option[lable_holder]}</div>
                    ))}
                </div>}
                {show && filteredOptions.length < 0 &&
                    <div onClick={() => setShow(false)} className="flex p-2 hover:bg-slate-100 cursor-pointer">No records</div>
                }

            </div>
        </div>
    );
};
export default SearchableSelect