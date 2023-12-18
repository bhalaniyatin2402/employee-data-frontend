import { PieChart } from "@mui/x-charts/PieChart";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function PieCharts({ title, field }) {
  const data = useSelector((state) => state.employee.employeeList);

  let dataSet = [];
  data.map((employeeData, i) => {
    let valueExist = false;
    dataSet?.map((item, i) => {
      if (item.label === employeeData[field]) {
        dataSet[i] = { ...item, value: item.value + 1 };
        valueExist = true;
        return;
      }
    });
    if (!valueExist) {
      dataSet.push({
        id: dataSet.length,
        value: 1,
        label: employeeData[field],
      });
    }
  });

  return (
    <>
      <div className="chart">
        <h1>{title}</h1>
        <PieChart
          series={[
            {
              data: dataSet,
            },
          ]}
          width={400}
          height={250}
        />
      </div>
    </>
  );
}
