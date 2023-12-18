import { useState } from "react";
import { useSelector } from "react-redux";
import AddchartIcon from "@mui/icons-material/Addchart";

import TableList from "./TableList";
import SelectChart from "./modals/SelectChart";

function Header() {
  const { table, chartList } = useSelector((state) => state.employee);
  const [isOpenChartModal, setIsOpenChartModal] = useState(false);

  return (
    <div id="header">
      <h1 className="heading">{table.name}</h1>
      <div className="btns">
        <button
          className="button"
          disabled={chartList.length > 5}
          onClick={() => setIsOpenChartModal(true)}
        >
          <AddchartIcon className="icon" />
        </button>
        <TableList className="icon" />
      </div>
      <SelectChart isOpen={isOpenChartModal} setIsOpen={setIsOpenChartModal} />
    </div>
  );
}

export default Header;
