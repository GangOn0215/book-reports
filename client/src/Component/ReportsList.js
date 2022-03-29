import React, { useContext } from "react";
import ReportsItems from "./ReportsItem";
import { ReportsStateContext } from "../App";

// App.js 에서 받아오는 { onEdit, onDelete } 는 ReportsList에서 거쳐갈뿐 실제로 사용하지 않습니다.
// Context를 이용하여 Props Dlilling 을 방지합니다.

const ReportsList = () => {
  const ReportList = useContext(ReportsStateContext);
  return (
    <section className="reports-lists">
      {ReportList.map((item) => {
        return <ReportsItems key={item.id} {...item} />;
      })}
    </section>
  );
};

export default ReportsList;
