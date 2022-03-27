import React, { useState, useRef, useEffect } from "react";

/**
 * React.memo
 * ReportsItem Component 에서 onEdit, onDelete 를 할때마다 
 * ReportsHead Component 에서 리랜더링이 발생하고 있습니다.
 * 이유는 App.js의 data state가 바뀔때마다 App Component가 리랜더링 되기때문에 ReportsHeader Component
 * 에서 props으로 받아온 onCreate가 계속 다시 선언 되기 때문에 ReportsHeader 또한 계속 리랜더링이 되고 있던것입니다.
 * 
 * React.memo를 할때 useMemo 처럼 시작부분 부터 끝까지 감싸는 방법이 있지만 보통 코드는 50줄이 넘기 때문에
 * 마지막 exports default ReportsHeader 부분을 감싸줍니다.
 * 
 * 이렇게 한다고 리랜더링이 막히지 않습니다.
 * 이유는 onCreate가 계속 리랜더링이 되기 때문이죠 그럼 onCreate를 onMemo를 하는것이 아닌 onCallback 을 이용하여
 * onMemo 처럼 값으로 데이터를 반환 하는것이 아니라 onCallback을 이용하여 함수로 반환 시켜야 합니다.
 * 
 */


const ReportsHeader = ({ onCreate }) => {
  useEffect(() => {
    console.log('Rerender :: Reports Header');
  });

  // 여러개의 input 값을 객체로 만들어 관리하는 코드
  const [reportsData, setReportsData] = useState({
    author: "",
    comment: "",
    star: 1,
  });

  // input Element 들을 관리하기 위한 useRef
  const inputAuthor = useRef();
  const inputComment = useRef();

  // onChange 이벤트가 발생될때 마다 실행하여 setReportsData 함수가 호출되는 함수
  const handleChange = (e) => {
    setReportsData({
      ...reportsData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    if (reportsData.author.length < 3) {
      inputAuthor.current.focus();

      return;
    }

    if (reportsData.comment.length < 5) {
      inputComment.current.focus();

      return;
    }

    onCreate(reportsData.author, reportsData.comment, reportsData.star);

    // onCreate를 호출하고 난 뒤 input 영역을 초기화 해주고 있습니다.
    setReportsData({
      author: "",
      comment: "",
      star: 1,
    });
  };

  return (
    <header className="reports-header">
      <article className="reports-photo">
        <img
          className="photo"
          src="http://localhost:3000/images/photo-Icon.jpg"
          alt="oho"
        />
        <div className="star">
          <select name="star" value={reportsData.star} onChange={handleChange}>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
        </div>
      </article>
      <article className="reports-info">
        <input
          ref={inputAuthor}
          name="author"
          value={reportsData.author}
          onChange={handleChange}
          placeholder="Auchor"
        />
        <textarea
          ref={inputComment}
          name="comment"
          value={reportsData.comment}
          onChange={handleChange}
          placeholder="Comment"
        />
        <button onClick={handleSubmit}>Submit</button>
      </article>
    </header>
  );
};

export default React.memo(ReportsHeader);