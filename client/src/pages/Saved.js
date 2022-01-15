import { useEffect, useState } from "react";
import BookItem from "../components/BookItem";

const Saved = () => {
  const [storedBooks, setStoredBooks] = useState([]);

  async function deleteBooks(id) {
    try {
      await fetch(`http://localhost:3001/api/book/delete/${id}`, {
        method: `DELETE`,
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetch(`http://localhost:3001/api/book`, {
      method: `GET`,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((data) => data.json())
      .then((data) => {
        console.log(data);
        setStoredBooks(data);
      });
  }, []);

  return (
    <div id="large-container">
      <ul id="result-container">
        {storedBooks.map((item) => {
          return (
            <BookItem key={item.id} book={item} buttonFunction={deleteBooks} />
          );
        })}
      </ul>
    </div>
  );
};

export default Saved;
