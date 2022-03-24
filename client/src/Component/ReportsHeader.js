import { useState } from "react";

const ReportsHeader = () => {
  const [author, setAuthor] = useState("");
  const [comment, setComment] = useState("");

  const handleSubmit = () => {
    console.log(author, comment);
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
          <select>
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
          value={author}
          onChange={(e) => { setAuthor(e.target.value); }}
          placeholder="Auchor"
        />
        <textarea
          value={comment}
          onChange={(e) => { setComment(e.target.value); }}
          placeholder="Comment"
        />
        <button onClick={handleSubmit}>Submit</button>
      </article>
    </header>
  );
};

export default ReportsHeader;
