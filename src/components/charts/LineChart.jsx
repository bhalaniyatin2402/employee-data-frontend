import * as React from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import { useSelector } from "react-redux";

export default function LineCharts({ title, field }) {
  const data = useSelector((state) => state.employee.employeeList);

  let dataSet = [];
  data.map((employeeData, i) => {
    let valueExist = false;
    dataSet?.map((item, i) => {
      if (item[field] === employeeData[field]) {
        dataSet[i] = { ...item, total: item.total + 1 };
        valueExist = true;
        return;
      }
    });
    if (!valueExist) {
      dataSet.push({
        [field]: employeeData[field],
        total: 1,
      });
    }
  });

  let xAxisData = [];
  let yAxisData = [];
  dataSet.map((data) => {
    xAxisData.push(data[field]);
    yAxisData.push(data.total);
  });

  return (
    <>
      <div className="chart">
        <h1>{title}</h1>
        <LineChart
          width={400}
          height={250}
          series={[
            { data: yAxisData, label: "uv", area: true, showMark: false },
          ]}
          xAxis={[{ scaleType: "point", data: xAxisData }]}
          sx={{
            ".MuiLineElement-root": {
              display: "none",
            },
          }}
        />
      </div>
    </>
  );
}
