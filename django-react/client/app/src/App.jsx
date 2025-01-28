import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [books, setBooks] = useState([])
  const [bookTitle, setBookTitle] = useState('')
  const [datePublished, setDatePublished] = useState('')

  useEffect(() => {
    fetchBooks()
  }, [])

  const fetchBooks = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/books/')
      const data = await response.json()
      setBooks(data)
    } catch (error) {
      console.log(error)
    }
  }

  const addBook = async () => {
    const bookData = {
      book_title: bookTitle,
      date_published: datePublished,
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/api/books/create/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookData),
      })

      const data = await response.json()
      setBooks((prev) => [...prev, data])
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <h1>Book Website</h1>

      <div className="input-section">
        <input
          type="text"
          name=""
          id=""
          placeholder="Book Title"
          onChange={(e) => setBookTitle(e.target.value)}
        />
        <input
          type="date"
          name=""
          id=""
          placeholder="Published Date"
          onChange={(e) => setDatePublished(e.target.value)}
        />
        <button onClick={addBook}>Add Book</button>
      </div>

      <div className="books-section">
        {books.map((book) => (
          <div className="book" key={book.id}>
            <h2>Title: {book.book_title}</h2>
            <p>Published: {book.date_published}</p>
          </div>
        ))}
      </div>
    </>
  )
}

export default App
