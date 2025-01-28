import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [books, setBooks] = useState([])

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

  return (
    <>
      <h1>Book Website</h1>

      <div className="input-section">
        <input type="text" name="" id="" placeholder="Book Title" />
        <input type="date" name="" id="" placeholder="Published Date" />
        <button>Add Book</button>
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
