import "./App.css";
import axios from "axios";
import React, {useEffect, useState, useRef} from "react";
import ReportsHeader from "./Component/ReportsHeader";

function App() {
  const [data, setData] = useState([]);
  const dataID = useRef(0);

  const callApi = async () => {
    const getData = await axios.get("/api/rest/book").then((res) => res.data.api);

    const initData = getData.map((item) => {
      return {
        Author: item.email,
        comment: item.body,
        create_date: new Date().getTime(),
        id: dataID.current++
      }
    });

    console.log(initData);
  };

  useEffect(() => {
    callApi();
  }, []);

  return (
    <div className="reports-container">
      <ReportsHeader />
      <section className="reports-lists"></section>
    </div>
  );
}

export default App;
