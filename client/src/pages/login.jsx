import React, { useEffect, useState } from 'react'
import { Login_background, Logo } from '../components/sidebar/images'
import Input from '../components/modals/input'
import { useLocation } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation, } from './../features/slices/usersApiSlice';
import { setCredentials } from './../features/slices/authSlice';

function Login() {
    let location = useLocation()
    const { userInfo } = useSelector((state) => state.auth)

    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [login, isFetching, error,] = useLoginMutation();
    const [disable, setDisable] = useState(false)
    const [item, setItem] = useState({
        phone_number: "",
        password: ""
    })
    const handleChange = (e, name) => {
        setItem(((prev) => ({
            ...prev, [name]: e
        })))

    }
    const submit = async () => {
        try {
            const res = await login(item).unwrap();
            dispatch(setCredentials({ ...res }))
            // localStorage.removeItem("token")
            navigate('/')
        } catch (error) {
            setError(error.data.message)
            console.log(error)
        }
    }
    useEffect(() => {
        if (location.search.split("=")[1] !== "1213") {
            setDisable(true)
        }
    }, [])
    useEffect(() => {
        if (userInfo !== null) {
            navigate('/')
        }
    }, [])

    // let originalString = "HV";
    // let encodedString = btoa(originalString);
    // console.log(encodedString); // Outputs: 

    // let decodedString = atob(encodedString);
    // console.log(decodedString);

    return (

        <div className="bg-gray-400 w-[100%] h-[90vh] rounded-[10px] relative z-0">
            <img src={Login_background} alt="" className="w-full rounded-[10px] h-full object-cover" />
            <div className="absolute flex-col md:right-10 right:1 md:bottom-10 top-10 rounded-md h-[85%] md:w-1/3 w-full p-10   flex justify-center  z-40">
                <div className="flex h-1/3 w-full items-center justify-center">
                    <img src={Logo} alt="" className="" />
                </div>
                {isFetching.isError && <span className='text-white flex w-full h-20 bg-red-500 p-2 rounded-md'>{isFetching?.error?.data?.message}</span>}
                <div className="w-full h-2/3 pt-5  gap-y-5 flex flex-col">
                    <Input disable={disable} label="Phone " name="phone_number" value={item.phone_number} onChange={handleChange} />
                    <Input type="password" disable={disable} label="password " name="password" value={item.password} onChange={handleChange} />

                    <div onClick={() => submit()} className="flex w-full items-center justify-center">
                        <div className={`flex w-1/2 border-purple-800 items-center justify-center shadow-2xl text-white  ${!isFetching.isLoading && !disable ? "bg-purple-900" : "bg-gray-200 text-red-900"} rounded-md`}>{disable ? "UnAuthorized" : "Login"}</div>
                    </div>

                </div>
            </div>
            <div className="absolute md:right-10 right:1 md:bottom-10 md:top-10 top-0 md:rounded-md md:h-[85%] h-full  md:w-1/3 w-full p-10 bg-white md:opacity-70 opacity-20  flex justify-center items-center z-20">

            </div>
            <div className="absolute inset-0  rounded-[10px] bg-gradient-to-r from-indigo-500 via-[rgb(101,12,174)] to-pink-500 opacity-40 flex justify-center items-center z-10">

            </div>
        </div>


    )
}

export default Login