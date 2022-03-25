import React, { useState, useRef } from "react";

const ReportsItems = ({ onEdit, author, comment, created_date, id }) => {
  // textarea element를 관리하기 위한 useRef
  const inputComment = useRef();

  // edit 중인지 아닌지 확인하는 변수
  const [isEdit, setIsEdit] = useState(false);
  // edit 변수를 반전 시키는 함수
  const toggleIsEdit = () => {
    setIsEdit(!isEdit);
  };

  // 내부 textarea의 값을 저장하는 변수
  const [localComment, setLocalComment] = useState(comment);
  // 내부 textarea의 값을 저장하는 함수
  const handleChange = (e) => {
    setLocalComment(e.target.value);
  };

  // cancle을 눌렀을때 실행되는 함수
  const handleEditQuit = () => {
    // edit cancle 이기 때문에 props 로 받아왔던 comment로 초기화를 시켜줍니다.
    setLocalComment(comment);
    // isEdit 의 toggle 함수를 호출하여 isEdit 변수를 반전시켜 줍니다.
    toggleIsEdit();
  };

  // edit 을 submit 해주는 함수
  const handleEditSubmit = () => {
    // localComment 의 길이가 5 미만이라면 focus를 해주며 return 시켜줍니다.
    if (localComment.length < 5) {
      inputComment.current.focus();

      return;
    }

    // 확인 절차
    if (window.confirm(`real edit? ${id}`)) {
      onEdit(id, localComment);

      toggleIsEdit();
    }
  };

  return (
    <div className="reports-item">
      <div className="info">
        <span className="author">Author: {author}</span>
        <br />
        <span className="create-at">
          create_at: {new Date(created_date).toLocaleDateString()}
        </span>
      </div>
      {isEdit ? (
        <>
          <textarea
            ref={inputComment}
            value={localComment}
            onChange={handleChange}
          />

          <button onClick={handleEditQuit}>Cancle</button>
          <button onClick={handleEditSubmit}>Save Edit</button>
        </>
      ) : (
        <>
          <div className="content">
            <span>{comment}</span>
          </div>

          <button onClick={toggleIsEdit}>Edit</button>
          <button>Delete</button>
        </>
      )}
    </div>
  );
};

export default ReportsItems;
