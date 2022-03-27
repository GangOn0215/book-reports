import React from "react";
import ReportsItems from "./ReportsItem";

const ReportsList = ({ onEdit, onDelete, ReportList }) => {
  return (
    <section className="reports-lists">
      {ReportList.map((item) => {
        return (
          <ReportsItems key={item.id} {...item} onEdit={onEdit} onDelete={onDelete} />
        );
      })}
    </section>
  );
};

export default ReportsList;
