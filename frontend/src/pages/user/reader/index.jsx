import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

import Container from 'react-bootstrap/Container'
import Spinner from 'react-bootstrap/Spinner'
import Button from 'react-bootstrap/Button'

import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'

import './Reader.css'

function Reader() {
  const [book, setBook] = useState(null)
  const [readLink, setReadLink] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const { id } = useParams()
  const navigate = useNavigate()

  function getHtmlLink(book) {
    if (!book.formats) return null

    const htmlFormat = Object.entries(book.formats).find(([key]) =>
      key.startsWith("text/html")
    )

    return htmlFormat ? htmlFormat[1] : null
  }

  function getTextLink(book) {
    if (!book.formats) return null

    const textFormat = Object.entries(book.formats).find(([key]) =>
      key.startsWith("text/plain")
    )

    return textFormat ? textFormat[1] : null
  }

  function getBook() {
    setLoading(true)
    setError("")

    axios.get(`https://gutendex.com/books/${id}`)
      .then(res => {
        const bookData = res.data
        setBook(bookData)

        const htmlLink = getHtmlLink(bookData)
        const textLink = getTextLink(bookData)

        if (htmlLink) {
          setReadLink(htmlLink)
        } else if (textLink) {
          setReadLink(textLink)
        } else {
          setError("Reading version is not available for this book.")
        }
      })
      .catch(err => {
        console.log(err)
        setError("Could not load this book. Please try again later.")
      })
      .finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    getBook()
  }, [id])

  return (
    <main className="reader-page">
      <Container fluid className="reader-container">
        <button className="reader-back-btn" onClick={() => navigate(`/books/${id}`)}>
          <ArrowBackIcon />
          Back to Details
        </button>

        {loading && (
          <div className="reader-loading">
            <Spinner animation="border" className="reader-spinner" />
            <h3>Loading book...</h3>
          </div>
        )}

        {error && !loading && (
          <div className="reader-error">
            <h3>{error}</h3>

            <Button className="reader-dark-btn" onClick={() => navigate("/books")}>
              Back to Books
            </Button>
          </div>
        )}

        {!loading && !error && book && readLink && (
          <>
            <section className="reader-header">
              <div className="reader-icon">
                <MenuBookIcon />
              </div>

              <div>
                <span>Reading now</span>
                <h1>{book.title}</h1>
                <p>{book.authors?.[0]?.name || "Unknown author"}</p>
              </div>

              <a
                href={readLink}
                target="_blank"
                rel="noopener noreferrer"
                className="reader-open-link"
              >
                <OpenInNewIcon />
                Open original
              </a>
            </section>

            <section className="reader-frame-wrapper">
              <iframe
                src={readLink}
                title={book.title}
                className="reader-frame"
              />
            </section>
          </>
        )}
      </Container>
    </main>
  )
}

export default Reader