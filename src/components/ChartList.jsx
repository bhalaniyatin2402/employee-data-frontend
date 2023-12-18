import BarCharts from "./charts/BarChart";
import LineCharts from "./charts/LineChart";
import PieCharts from "./charts/PieChart";

import { useSelector } from "react-redux";

function ChartList() {
  const chartList = useSelector((state) => state.employee.chartList);

  return (
    <div className="chart-list flex">
      {chartList.map((chartData, i) => {
        if (chartData.chartType == "bar-chart") {
          return (
            <BarCharts title={chartData.chartTitle} field={chartData.field} key={i} />
          );
        } else if (chartData.chartType == "line-chart") {
          return (
            <LineCharts title={chartData.chartTitle} field={chartData.field} key={i} />
          );
        } else if (chartData.chartType == "pie-chart") {
          return <PieCharts title={chartData.chartTitle} field={chartData.field} key={i} />;
        }
      })}
    </div>
  );
}

export default ChartList;
