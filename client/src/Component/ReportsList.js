import React from "react";
import ReportsItems from "./ReportsItem";

const ReportsList = ({ onEdit, ReportList }) => {
  return (
    <section className="reports-lists">
      {ReportList.map((item) => {
        return <ReportsItems key={item.id} {...item} onEdit={onEdit} />;
      })}
    </section>
  );
};

export default ReportsList;
