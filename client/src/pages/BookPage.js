import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function BookPage() {
  let { bookName } = useParams();
  bookName = decodeURIComponent(bookName);
  const [bookInfo, setBookInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookInfo = async () => {
      try {
        const response = await fetch(`http://localhost:1234/api/book/${bookName}`);
        if (!response.ok) {
          throw new Error('Book not found');
        }
        const data = await response.json();
        setBookInfo(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookInfo();
  }, [bookName]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Books</h1>
      {bookInfo ? (
        <>
          <div>{bookInfo.name}</div>
          <div>{bookInfo.author}</div>
          <div>{bookInfo.pages}</div>
        </>
      ) : (
        <div>Book not found</div>
      )}
    </div>
  );
}

export default BookPage;
