/* eslint-disable react/prop-types */
import React, { useState } from "react";
import Table from "../../components/table";
import Create_Modal from "../../components/modals/create_modal";
import Input from "../../components/modals/input";
import Delete_Modal from "../../components/modals/delete_modal";
import {
  useCreate_pracMutation,
  useDelete_pracMutation,
  useFetch_pracsQuery,
} from "../../features/slices/practicalSlice";
import { useUpdate_userMutation } from "../../features/slices/usersApiSlice";

const Practical = ({ details }) => {
  const [popUp, setPopUp] = useState(false);
  const [show, setShow] = useState(false);
  const [err, setError] = useState(undefined);
  const initialState = {
    prac_name: "",
    prac_duration: "",
    course: details._id,
    csv_file:""
  };
  const [item, setItem] = useState(initialState);
  const columns = [
    { Header: "Practical", accessor: "prac_name" },
    { Header: "Duration(months)", accessor: "prac_duration" },
  ];
  const { data, isLoading, isSuccess, refetch } = useFetch_pracsQuery(details._id);

  const [Postpractical, isFetching, error] = useCreate_pracMutation();
  const [Updatepractical] = useUpdate_userMutation();

  const [Deletepractical] = useDelete_pracMutation();

  const handleChange = (e, name) => {
    setItem((prev) => ({
      ...prev,
      [name]: e,
    }));
  };
 
  const submit = async () => {
    try {
        const formData = new FormData();
        formData.append("prac_name", item.prac_name);
        formData.append("csv_file", item.csv_file);
        formData.append("prac_duration", item.prac_duration);
        formData.append("course", item.course);
      if (item._id) {
        await Updatepractical(formData).unwrap();
      } else {
        await Postpractical(formData).unwrap();
      }

      await refetch();
      setItem(initialState);
      setPopUp(false);
    } catch (error) {
      setError();
      console.log(error);
    }
  };
  const submitDelete = async () => {
    try {
      await Deletepractical(item._id).unwrap();
      await refetch();
      setItem(initialState);
      setShow(false);
    } catch (error) {
      console.log(error);
    }
  };
  const cancel = () => {
    setItem(initialState);
  };

  return (
    <>
      <Table
        isLoading={isLoading}
        key_column="prac_name"
        columns={columns}
        setPopUp={setPopUp}
        setItem={setItem}
        setShow={setShow}
        title="Practicals Administered"
        data={isSuccess && data !== undefined ? data : []}
      />

      {popUp && (
        <Create_Modal
          submit={submit}
          cancel={cancel}
          item={item}
          error={isFetching?.error?.data?.message}
          body={
            <div className="gap-y-2 flex flex-col">
              <Input
                label="Name"
                name="prac_name"
                value={item.name}
                onChange={handleChange}
              />
              <Input
                label="Duration"
                name="prac_duration"
                value={item.duration}
                type="number"
                onChange={handleChange}
              />
               <input
                        onChange={(e) => console.log(e)}
                        type="file"
                        name="file"
                        className={`block w-full text-sm ${data.isError ? "text-red-400" : "text-slate-500"} file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100`}
                    />
            </div>
          }
          name="practical"
          setPopUp={setPopUp}
        />
      )}
      {show && (
        <Delete_Modal
          item={item}
          submit={submitDelete}
          cancel={cancel}
          name="practical"
          setPopUp={setShow}
        />
      )}
    </>
  );
};

export default Practical;
