import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, NavLink } from "react-router-dom"
import axios from "axios"

import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Badge from 'react-bootstrap/Badge'
import Spinner from 'react-bootstrap/Spinner'

import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import DownloadIcon from '@mui/icons-material/Download'
import LanguageIcon from '@mui/icons-material/Language'
import PersonIcon from '@mui/icons-material/Person'

import './Details.css'

function Details() {
  const [book, setBook] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const { id } = useParams()
  const navigate = useNavigate()

  function getDetails() {
    setLoading(true)
    setError("")

    axios.get(`https://gutendex.com/books/${id}`)
      .then(res => {
        setBook(res.data)
      })
      .catch(err => {
        console.log(err)
        setError("Book not found or something went wrong.")
      })
      .finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    getDetails()
  }, [id])

  function getAuthorName(book) {
    return book.authors && book.authors.length > 0
      ? book.authors[0].name
      : "Unknown author"
  }

  function getAuthorYears(book) {
    if (!book.authors || book.authors.length === 0) {
      return ""
    }

    const author = book.authors[0]

    if (author.birth_year && author.death_year) {
      return `${author.birth_year} - ${author.death_year}`
    }

    if (author.birth_year) {
      return `Born ${author.birth_year}`
    }

    return ""
  }

  function getCoverImage(book) {
    return (
      book.formats?.["image/jpeg"] ||
      "https://via.placeholder.com/300x450?text=No+Cover"
    )
  }

  function getReadLink(book) {
    return (
      book.formats?.["text/html"] ||
      book.formats?.["text/html; charset=utf-8"] ||
      book.formats?.["text/plain; charset=utf-8"] ||
      book.formats?.["text/plain"] ||
      book.formats?.["application/epub+zip"]
    )
  }

  return (
    <main className="details-page">
      <Container>
        <button className="details-back-btn" onClick={() => navigate("/books")}>
          <ArrowBackIcon />
          Back to Books
        </button>

        {loading && (
          <div className="details-loading">
            <Spinner animation="border" className="details-spinner" />
            <h3>Loading book details...</h3>
          </div>
        )}

        {error && (
          <div className="details-error">
            <h3>{error}</h3>

            <Button className="details-main-btn" onClick={() => navigate("/books")}>
              Go Back
            </Button>
          </div>
        )}

        {!loading && !error && book && (
          <section className="details-card">
            <div className="details-cover-area">
              <img
                src={getCoverImage(book)}
                alt={book.title}
                className="details-cover"
              />
            </div>

            <div className="details-info">
              <span className="details-label">Book Details</span>

              <h1>{book.title}</h1>

              <div className="details-meta">
                <Badge bg="light" text="dark" className="details-badge">
                  <PersonIcon className="details-badge-icon" />
                  {getAuthorName(book)}
                </Badge>

                <Badge bg="light" text="dark" className="details-badge">
                  <LanguageIcon className="details-badge-icon" />
                  {book.languages?.[0]?.toUpperCase() || "Unknown"}
                </Badge>

                <Badge bg="light" text="dark" className="details-badge">
                  <DownloadIcon className="details-badge-icon" />
                  {book.download_count || 0} downloads
                </Badge>
              </div>

              {getAuthorYears(book) && (
                <p className="details-author-years">
                  <strong>Author years:</strong> {getAuthorYears(book)}
                </p>
              )}

              <div className="details-section">
                <h3>Subjects</h3>

                {book.subjects && book.subjects.length > 0 ? (
                  <div className="subjects-list">
                    {book.subjects.slice(0, 8).map((subject, index) => (
                      <span key={index}>{subject}</span>
                    ))}
                  </div>
                ) : (
                  <p>No subjects available.</p>
                )}
              </div>

              <div className="details-section">
                <h3>Bookshelves</h3>

                {book.bookshelves && book.bookshelves.length > 0 ? (
                  <div className="subjects-list">
                    {book.bookshelves.slice(0, 6).map((item, index) => (
                      <span key={index}>{item}</span>
                    ))}
                  </div>
                ) : (
                  <p>No bookshelves available.</p>
                )}
              </div>

              <div className="details-actions">
                {getReadLink(book) ? (
                  <NavLink
                    to={`/books/${book.id}/read`}
                    className="details-read-btn"
                  >
                    <MenuBookIcon />
                    Read Online
                  </NavLink>
                ) : (
                  <span className="details-no-link">No reading link available</span>
                )}
                {/* 
                <Button className="details-main-btn" onClick={() => navigate("/books")}>
                  Go Back
                </Button> */}
              </div>
            </div>
          </section>
        )}
      </Container>
    </main>
  )
}

export default Details