import React from "react";
import ReportsItems from "./ReportsItem";

const ReportsList = ({ReportList}) => {

  return (
    <section className="reports-lists">
    {
      ReportList.map((item) => {
        return (
          <ReportsItems key={item.id} {...item}/>
        )
      })
    }  
    </section>
  )
}

export default ReportsList;
