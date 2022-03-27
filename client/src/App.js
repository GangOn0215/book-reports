import "./App.css";
import axios from "axios";
import React, { useState, useRef, useEffect, useMemo, useCallback } from "react";
import ReportsHeader from "./Component/ReportsHeader";
import ReportsList from "./Component/ReportsList";
// import DingdongDitch from "./Component/DingdongDitch";

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

  const onCreate = useCallback((newAuthor, newComment, newStar) => {
    const create_date = new Date().getTime();

    const newReportList = {
      author: newAuthor,
      comment: newComment,
      star: newStar,
      created_date: create_date,
      id: dataID.current++,
    };

    /* 
      기존에 하던 방식대로 setData([newReportList, ...data]); 이러한 형태로
      setData를 하면 데이터가 이상하게 변할것입니다.
      
      이유는 아래 dependency(의존성) 에 빈 배열이 있기때문에 data는 빈 배열로 됩니다.

      그래서 함수로 반환하여 데이터를 주입시켜줍니다.
    */
    setData((data) => setData([newReportList, ...data]));
  }, []);

  const onEdit = useCallback((targetID, newComment) => {
    setData((data) => 
      data.map((item) => targetID === item.id ? {...item, comment: newComment} : item)
    );
  }, []);

  const onDelete = useCallback((targetID) => {
    setData((data) => 
      data.filter((item) => targetID !== item.id)
    );
  }, []);

  /** 
   * 데이터를 update 할때마다 리랜더링이 되어 해당 함수가 계속 다시 선언이 됩니다.
   * 해결법: useMemo
   */
  const getReportStarAnalysis = () => {
    const totalStar = data.length;
    // item.star 가 3 이상 이라면 return 하여 데이터를 수집 합니다.
    const goodStar = data.filter((item) => item.star > 3).length;
    const badStar = totalStar - goodStar;
    const goodRatio = (goodStar / totalStar) * 100;

    return [ totalStar, goodStar, badStar, goodRatio ];
  };

  // getReportStarAnalysis - () 를 안넣은 이유는 useMemo 는 값으로 반환하기 때문에 함수가 아닌 값이 됩니다.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const [ totalStar, goodStar, badStar, goodRatio ] = useMemo(getReportStarAnalysis, [data.length]);

  return (
    <div className="reports-container">
      {/* <DingdongDitch /> */}
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
