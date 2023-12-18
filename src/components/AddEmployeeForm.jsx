import React, { useState } from "react";
import { Box, Modal, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { useAddNewEmployeeMutation } from "../redux/services/employeeApi";
import { setAddEmploye } from "../redux/slices/employeSlice";

function AddEmployeeForm({ isOpen, setIsOpen }) {
  const dispatch = useDispatch();
  const [addNewEmployee, { isLoading }] = useAddNewEmployeeMutation();
  const { table } = useSelector((state) => state.employee);

  const [formState, setFormState] = useState({});

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  function handleChange(e) {
    setFormState((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await addNewEmployee({
        tableId: table?.id,
        data: formState,
      });
      if (res?.data) {
        setFormState({});
        dispatch(setAddEmploye(res?.data));
      }
      setIsOpen(false);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Modal
      open={isOpen}
      onClose={() => setIsOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <form className="form" onSubmit={handleSubmit}>
          <h1>Add New Employee</h1>
          <input
            type="text"
            name="name"
            placeholder="Enter Employee Name"
            value={formState.name}
            onChange={handleChange}
          />
          <input
            type="text"
            name="status"
            placeholder="Enter Employee status"
            value={formState.status}
            onChange={handleChange}
          />
          <input
            type="text"
            name="designation"
            placeholder="Enter Employee designation"
            value={formState.skills}
            onChange={handleChange}
          />
          <input
            type="number"
            name="salary"
            placeholder="Enter Employee salary"
            value={formState.salary}
            onChange={handleChange}
          />
          <input
            type="text"
            name="location"
            placeholder="Enter Employee location"
            value={formState.address}
            onChange={handleChange}
          />
          <button type="submit" disabled={isLoading ? true : false}>
            submit
          </button>
        </form>
      </Box>
    </Modal>
  );
}

export default AddEmployeeForm;
