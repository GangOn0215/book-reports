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
        star: Math.floor(Math.random() * 5) + 1,
        created_date: new Date().getTime(),
        id: dataID.current++
      }
    });

    setData(initData);
  };

  useEffect(() => {
    callApi();
  }, []);
  
  const onCreate = (newAuthor, newComment, newStar) => {
    const create_date = new Date().getTime();
    
    const newReportList = {
      author: newAuthor,
      comment: newComment,
      star: newStar,
      created_date: create_date,
      id: dataID.current++
    };

    setData([newReportList, ...data]);
  }

  return (
    <div className="reports-container">
      <ReportsHeader onCreate={onCreate}/>
      <ReportsList ReportList={data}/>
    </div>
  );
}

export default App;
