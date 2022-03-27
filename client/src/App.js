import "./App.css";
import axios from "axios";
import React, { useState, useRef, useEffect, useMemo } from "react";
import ReportsHeader from "./Component/ReportsHeader";
import ReportsList from "./Component/ReportsList";

function App() {
  const [data, setData] = useState([]);
  const dataID = useRef(0);

  const callApi = async () => {
    const getData = await axios
      .get("/api/rest/book")
      .then((res) => res.data.api);

    const initData = getData.map((item) => {
      return {
        author: item.email,
        comment: item.body,
        star: Math.floor(Math.random() * 5) + 1,
        created_date: new Date().getTime(),
        id: dataID.current++,
      };
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
      id: dataID.current++,
    };

    setData([newReportList, ...data]);
  };

  const onEdit = (targetID, newComment) => {
    const newReportList = data.map((item) =>
      item.id === targetID ? { ...item, comment: newComment } : item
    );

    setData(newReportList);
  };

  const onDelete = (targetID) => {
    const newReportList = data.filter((item) => item.id !== targetID);

    setData(newReportList);
  };

  /** 
   * 데이터를 update 할때마다 리랜더링이 되어 해당 함수가 계속 다시 선언이 됩니다.
   * 해결법: useMemo
   */
  const getReportStarAnalysis = useMemo(() => {
    const totalStar = data.length;
    // item.star 가 3 이상 이라면 return 하여 데이터를 수집 합니다.
    const goodStar = data.filter((item) => item.star > 3).length;
    const badStar = totalStar - goodStar;
    const goodRatio = (goodStar / totalStar) * 100;

    console.log(totalStar, goodStar, badStar, goodRatio);
    // const badStar

    return [ totalStar, goodStar, badStar, goodRatio ];
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.length]);

  // getReportStarAnalysis - () 를 안넣은 이유는 useMemo 는 값으로 반환하기 때문에 함수가 아닌 값이 됩니다.
  const [ totalStar, goodStar, badStar, goodRatio ] = getReportStarAnalysis;

  return (
    <div className="reports-container">
      <ReportsHeader onCreate={onCreate} />
      <div>Book Reports Total Length: {totalStar}</div>
      <div>Good Star: {goodStar}</div>
      <div>Bad Star: {badStar}</div>
      <div>Good Ratio: {goodRatio.toFixed(1)}%</div>

      <ReportsList onEdit={onEdit} onDelete={onDelete} ReportList={data} />
    </div>
  );
}

export default App;
