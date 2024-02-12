import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function BookSubmitForm() {
  const [book, setBook] = useState({
    name: '',
    author: '',
    pages: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook(prevBook => ({
      ...prevBook,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:1234/api/book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(book)
      });
      if (response.ok) {
        console.log('Book submitted successfully');
        // clear form and process success
        setBook({name: '', author: '', pages: ''});
        navigate(`/book/${encodeURIComponent(book.name)}`);
      } else {
        console.error('Submission failed');
        // Process error
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input id="name" name="name" type="text" value={book.name} onChange={handleChange} placeholder="Book Name" />
        <input id="author" name="author" type="text" value={book.author} onChange={handleChange} placeholder="Author" />
        <input id="pages" name="pages" type="number" value={book.pages} onChange={handleChange} placeholder="Pages" />
        <input id="submit" type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default BookSubmitForm;
