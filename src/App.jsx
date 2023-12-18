import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Header from "./components/Header";
import Loader from "./components/Loader";
import ImportFile from "./components/ImportFile";
import EmployeeTable from "./components/EmployeeTable";
import ChartList from "./components/ChartList";
import { useGetEmployeeListMutation } from "./redux/services/employeeApi";
import { setEmployeeList } from "./redux/slices/employeSlice";

function App() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.employee);
  const [getEmployeeList, { isLoading }] = useGetEmployeeListMutation(
    data?.table?.id
  );

  useEffect(() => {
    (async function () {
      const res = await getEmployeeList(data?.table?.id);
      dispatch(setEmployeeList(res?.data));
    })();
  }, [data?.table?.id]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      {data?.isInsertFile ? (
        <ImportFile />
      ) : (
        <>
          <Header />
          <EmployeeTable data={getEmployeeList?.data} />
          <ChartList />
        </>
      )}
    </div>
  );
}

export default App;
