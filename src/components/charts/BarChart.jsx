import { BarChart } from "@mui/x-charts/BarChart";
import { useSelector } from "react-redux";

const valueFormatter = (value) => `${value}mm`;

export default function BarCharts({ title, field }) {
  const data = useSelector((state) => state?.employee?.employeeList);

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

  return (
    <>
      <div className="chart">
        <h1>{title}</h1>
        <BarChart
          dataset={dataSet}
          yAxis={[{ scaleType: "band", dataKey: field }]}
          series={[
            {
              dataKey: "total",
              label: "Employees",
              valueFormatter,
            },
          ]}
          layout="horizontal"
          xAxis={[
            {
              label: "No. of Employees",
            },
          ]}
          width={400}
          height={250}
        />
      </div>
    </>
  );
}
