import { useRef, useState } from "react";

const ReportsHeader = ({onCreate}) => {
  const [reportsData, setReportsData] = useState({
    author: "",
    comment: "",
    star: 1,
  });

  const inputAuthor = useRef();
  const inputComment = useRef();
  const inputStar = useRef();

  const handleChange = (e) => {
    setReportsData({
      ...reportsData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    if(reportsData.author.length < 3) {
      inputAuthor.current.focus();

      return;
    } 
    
    if(reportsData.comment.length < 5) {
      inputComment.current.focus();

      return;
    }

    onCreate(reportsData.author, reportsData.comment, reportsData.star);

    setReportsData({
      author: "",
      comment: "",
      star: 1
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
          <select 
            ref={inputStar}
            name="star" 
            value={reportsData.star} 
            onChange={handleChange}
          >
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
