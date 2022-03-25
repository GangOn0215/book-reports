import "./App.css";
import axios from "axios";
import React, {useEffect, useState, useRef} from "react";
import ReportsHeader from "./Component/ReportsHeader";
import ReportsList from "./Component/ReportsList";

function App() {
  const [data, setData] = useState([]);
  const dataID = useRef(0);

  const callApi = async () => {
    const getData = await axios.get("/api/rest/book").then((res) => res.data.api);

    const initData = getData.map((item) => {
      return {
        author: item.email,
        comment: item.body,
        create_date: new Date().getTime(),
        id: dataID.current++
      }
    });

    setData(initData);
  };

  useEffect(() => {
    callApi();
  }, []);
  
  return (
    <div className="reports-container">
      <ReportsHeader />
      <ReportsList ReportList={data}/>
    </div>
  );
}

export default App;
