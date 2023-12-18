import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import AddEmployeeForm from "./AddEmployeeForm";
import UpdateEmployeeForm from "./UpdateEmployeeForm";
import { useDeleteEmployeeMutation } from "../redux/services/employeeApi";
import { setDeleteEmployee } from "../redux/slices/employeSlice";

function EmployeeTable() {
  const dispatch = useDispatch();
  const [removeEmployes, { isLoading }] = useDeleteEmployeeMutation();
  const data = useSelector((state) => state?.employee.employeeList);
  const [selectedCols, setSelectedCols] = useState([]);
  const [selectedColIds, setSelectedColIds] = useState([]);
  const [isAddEmployeeOpen, setIsAddEmployeeOpen] = useState(false);
  const [isUpdateEmployeeOpen, setIsUpdateEmployeeOpen] = useState(false);

  let columns = [
    { field: "id", headerName: "EmployeeID", width: 150 },
    { field: "name", headerName: "name", width: 150 },
    { field: "designation", headerName: "designation", width: 150 },
    { field: "status", headerName: "Status", width: 150 },
    { field: "salary", headerName: "Salary", width: 150 },
    { field: "location", headerName: "location", width: 150 },
  ];

  function handleSelectionModeOnChange(selectionModel) {
    setSelectedColIds(selectionModel);
    const selectedData = selectionModel.map((id) => {
      return data.find((i) => i.id === id);
    });
    setSelectedCols(selectedData);
  }

  async function handleRemoveEmployee() {
    const res = await removeEmployes({
      employeeIds: selectedColIds,
    });
    if (res?.data?.success) {
      dispatch(setDeleteEmployee(selectedColIds));
      setSelectedColIds([]);
    }
  }

  return (
    <div style={{ height: 400, width: "100%" }}>
      <div className="employee-table-btn">
        <button className="btn" onClick={() => setIsAddEmployeeOpen(true)}>
          + add
        </button>
        <button
          className="btn"
          disabled={selectedCols.length === 1 ? false : true}
          onClick={() => setIsUpdateEmployeeOpen(true)}
        >
          <EditIcon />
        </button>
        <button
          className="btn employee-delete-btn"
          disabled={selectedCols.length > 0 ? false : true || isLoading}
          onClick={handleRemoveEmployee}
        >
          <DeleteIcon />
        </button>
      </div>
      <DataGrid
        rows={data}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        onRowSelectionModelChange={handleSelectionModeOnChange}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
      <AddEmployeeForm
        isOpen={isAddEmployeeOpen}
        setIsOpen={setIsAddEmployeeOpen}
      />
      <UpdateEmployeeForm
        isOpen={isUpdateEmployeeOpen}
        setIsOpen={setIsUpdateEmployeeOpen}
        employeeData={selectedCols}
      />
    </div>
  );
}

export default EmployeeTable;
