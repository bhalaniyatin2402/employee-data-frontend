import * as XLSX from "xlsx";
import { useState } from "react";
import { useDispatch } from "react-redux";
import AttachFileIcon from "@mui/icons-material/AttachFile";

import {
  setEmployeeList,
  setTable,
  setisInsertFile,
} from "../redux/slices/employeSlice";
import { useCreateTableMutation } from "../redux/services/employeeApi";
import Loader from "./Loader";

function ImportFile() {
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [createTable, { isLoading }] = useCreateTableMutation();

  async function createNewTable(data, filename) {
    const extractedData = data.map((item) => {
      return {
        id: item.id,
        name: item.name || "",
        status: item.status || "",
        designation: item.designation || "",
        salary: Number(item.salary) || "",
        location: item.location || "",
      };
    });
    const res = await createTable({
      name: filename.substring(0, filename.lastIndexOf(".")),
      employeeList: extractedData,
    });
    if (res?.data?.success) {
      dispatch(setTable(res?.data?.table));
      dispatch(setEmployeeList(extractedData));
      dispatch(setisInsertFile(false));
    }
  }

  function convertExcelDataIntoJson(file) {
    if (file) {
      if (!isValidExcelExtension(file.name)) {
        return setError("please upload xls or xlsx file");
      }

      const reader = new FileReader();

      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: "binary" });

        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        const jsonData = XLSX.utils.sheet_to_json(sheet);

        createNewTable(jsonData, file.name);
      };
      reader.readAsBinaryString(file);
    }
  }

  function isValidExcelExtension(filename) {
    return ["xls", "xlsx"].some((validExtension) =>
      filename
        .slice(filename.lastIndexOf("."))
        .toLowerCase()
        .endsWith(validExtension)
    );
  }

  function handleDrag(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  function handleDrop(e) {
    e.preventDefault();
    e.stopPropagation();

    const droppedFiles = e.dataTransfer.files[0];
    convertExcelDataIntoJson(droppedFiles);
  }

  function handleFileUpdload(e) {
    const uploadedFile = e.target.files[0];
    convertExcelDataIntoJson(uploadedFile);
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div
      id="import-file"
      onDragEnter={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <div id="import-file-box">
        <AttachFileIcon />
        <h3 id="import-drag">Drag and Drop files, or</h3>
        <label htmlFor="xlxs-file">
          <span id="import-browse">Browse</span>
          <input
            type="file"
            id="xlxs-file"
            onChange={handleFileUpdload}
            accept=".xlsx"
          />
        </label>
      </div>
      <button
        className="button import-back-button"
        onClick={() => dispatch(setisInsertFile(false))}
      >
        back
      </button>
      <div className="err-msg">{error}</div>
    </div>
  );
}

export default ImportFile;
