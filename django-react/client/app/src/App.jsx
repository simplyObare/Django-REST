import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [books, setBooks] = useState([])
  const [bookTitle, setBookTitle] = useState('')
  const [datePublished, setDatePublished] = useState('')

  const [newTitle, setNewTitle] = useState('')

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

  const updateTitle = async (pk, datePublished) => {
    const bookData = {
      book_title: newTitle,
      date_published: datePublished,
    }

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/books/${pk}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookData),
      })

      const data = await response.json()
      setBooks((prev) =>
        prev.map((book) => {
          if (book.id === pk) {
            return data
          } else {
            return book
          }
        })
      )
    } catch (error) {
      console.log(error)
    }
  }

  const deleteBook = async (pk) => {
    try {
      await fetch(`http://127.0.0.1:8000/api/books/${pk}`, {
        method: 'DELETE',
      })

      setBooks((prev) => prev.filter((book) => book.id !== pk))
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <h1>Book Website</h1>

      <div>
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

              <div className="new-section">
                <input
                  type="text"
                  placeholder="New Title"
                  onChange={(e) => setNewTitle(e.target.value)}
                />
                <button
                  onClick={() => updateTitle(book.id, book.date_published)}
                >
                  Update
                </button>
              </div>

              <div className="delete-section">
                <button onClick={() => deleteBook(book.id)}>DELETE</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default App
