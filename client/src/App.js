import "./App.css";
import axios from "axios";
import React, { useRef, useEffect, useMemo, useCallback, useReducer } from "react";
import ReportsHeader from "./Component/ReportsHeader";
import ReportsList from "./Component/ReportsList";
// import DingdongDitch from "./Component/DingdongDitch";

const reducer = (state, action) => {
  switch(action.type) {
    case "INIT":
      return action.initData;
    case "CREATE":
      const created_date = new Date().getTime();

      const newItem = {
        ...action.data,
        created_date
      }

      return [newItem, ...state];
    case "UPDATE":
      // targetID, newComment
      return state.map((item) => item.id === action.data.targetID ? {...item, comment: action.data.newComment} : item);
    case "DELETE":
      return state.filter((item) => item.id !== action.data.targetID);
    default:
      return state;
  }
}

function App() {
  /*
   * useState 말고 useReducer을 써보도록 하겠습니다.
   * useReducer을 사용하는 이유는 상태 변화 코드를 Component 내에서 모두 처리하면 상당히 무거워 지는 관계로
   * Component 밖에서 따로 빼두고 처리하는것이 용이합니다. 
   * 
   */

  const [data, dispatch] = useReducer(reducer, []);
  // const [data, setData] = useState([]);
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

    dispatch({type: "INIT", initData})
    // setData(initData);
  };

  useEffect(() => {
    callApi();
  }, []);

  const onCreate = useCallback((author, comment, star) => {
    dispatch({type: "CREATE", data: {author, comment, star, id: dataID.current}});

    dataID.current++;
  }, []);

  const onEdit = useCallback((targetID, newComment) => {
    dispatch({type: "UPDATE", data: {targetID, newComment}});
  }, []);

  const onDelete = useCallback((targetID) => {
    dispatch({type: "DELETE", data: {targetID}});
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
