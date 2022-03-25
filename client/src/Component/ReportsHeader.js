import { useRef, useState } from "react";

const ReportsHeader = ({ onCreate }) => {
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

export default ReportsHeader;
