import { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import { useSelector, useDispatch } from "react-redux";

import { setTable, setisInsertFile } from "../redux/slices/employeSlice";
import { useGetTableListQuery } from "../redux/services/employeeApi";

function TableList() {
  const dispatch = useDispatch();
  const employee = useSelector((state) => state.employee);
  const [state, setState] = useState(false);
  const { data: tableList, isLoading, error } = useGetTableListQuery();

  if (isLoading) {
    return;
  }

  return (
    <div>
      <FormatListBulletedIcon onClick={() => setState(true)} className="icon" />
      <Drawer anchor={"right"} open={state} onClose={() => setState(false)}>
        <Box sx={{ width: 300 }} onClick={() => setState(false)}>
          <span
            id="table-add-btn"
            onClick={() => dispatch(setisInsertFile(true))}
          >
            + new
          </span>
          <h1 className="drawer-header">Tables</h1>
          <ul className="table-ul">
            {tableList?.length > 0 &&
              tableList.map((table) => (
                <li
                  className={`table-li ${
                    employee.table.id === table.id && "active"
                  }`}
                  onClick={() => {
                    dispatch(
                      setTable({
                        name: table.name,
                        id: table.id,
                      })
                    );
                  }}
                  key={table.id}
                >
                  {table.name}
                </li>
              ))}
          </ul>
        </Box>
      </Drawer>
    </div>
  );
}

export default TableList;
