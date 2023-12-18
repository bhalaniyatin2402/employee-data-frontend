import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Box, Modal, Typography } from "@mui/material";

import { setUpdateEmployee } from "../redux/slices/employeSlice";
import { useUpdateExistigEmployeeMutation } from "../redux/services/employeeApi";

function UpdateEmployeeForm({ isOpen, setIsOpen, employeeData }) {
  const dispatch = useDispatch();
  const [formState, setFormState] = useState({});
  const [updateEmployee, { isLoading }] = useUpdateExistigEmployeeMutation();

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
    const res = await updateEmployee({
      employeeId: employeeData[0].id,
      data: formState,
    });
    if (res?.data?.message) {
      setFormState({})
      dispatch(setUpdateEmployee(res?.data?.updateEmployee));
      setIsOpen(false);
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
          <h1>Update New Employee</h1>
          <input
            type="text"
            name="name"
            placeholder="Enter Employee Name"
            onChange={handleChange}
            defaultValue={employeeData[0]?.name}
          />
          <input
            type="text"
            name="status"
            placeholder="Enter Employee status"
            onChange={handleChange}
            defaultValue={employeeData[0]?.status}
          />
          <input
            type="text"
            name="designation"
            placeholder="Enter Employee designation"
            onChange={handleChange}
            defaultValue={employeeData[0]?.designation}
          />
          <input
            type="number"
            name="salary"
            placeholder="Enter Employee number"
            onChange={handleChange}
            defaultValue={employeeData[0]?.salary}
          />
          <input
            type="text"
            name="location"
            placeholder="Enter Employee location"
            onChange={handleChange}
            defaultValue={employeeData[0]?.location}
          />
          <button type="submit" disabled={isLoading ? true : false}>
            submit
          </button>
        </form>
      </Box>
    </Modal>
  );
}

export default UpdateEmployeeForm;
