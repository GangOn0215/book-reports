import React from "react";

const ReportsItems = ({author, comment, created_date}) => {
  return (
    <div className="reports-item">
      <div className="info">
        <span className="author">Author: {author}</span>
        <br/>
        <span className="create-at">create_at: { new Date(created_date).toLocaleDateString() }</span>
      </div>
      <div className="content">
        <span>{comment}</span>
      </div>
    </div>
  )
}

export default ReportsItems;
