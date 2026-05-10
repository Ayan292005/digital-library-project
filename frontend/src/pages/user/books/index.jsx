import React, { useContext, useEffect, useState } from 'react'
import axios from "axios"

import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Badge from 'react-bootstrap/Badge'
import Spinner from 'react-bootstrap/Spinner'

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import SearchIcon from '@mui/icons-material/Search'
import AutoStoriesIcon from '@mui/icons-material/AutoStories'
import DownloadIcon from '@mui/icons-material/Download'
import LanguageIcon from '@mui/icons-material/Language'
import { IconButton } from '@mui/material'

import { favoriteContext } from '../../../context/FavoritesContext'

import './books.css'
import { NavLink } from 'react-router-dom'

const DBurl = "https://gutendex.com/books"

function Books() {
  const [data, setData] = useState([])
  const [originalData, setOriginalData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const [nextPage, setNextPage] = useState(null)
  const [previousPage, setPreviousPage] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)

  const { favorites, setFavorites } = useContext(favoriteContext)

  function handleAddFavorite(product) {
    const findFavorite = favorites.find(favorite => favorite.id === product.id)

    if (findFavorite) {
      const filteredFavorites = favorites.filter(favorite => favorite.id !== product.id)
      setFavorites(filteredFavorites)
    } else {
      setFavorites([...favorites, product])
    }
  }

  function isFavorite(product) {
    return favorites.some(favorite => favorite.id === product.id)
  }

  function getData(url = DBurl, pageNumber = 1) {
    setLoading(true)
    setError("")

    axios.get(url)
      .then(res => {
        setData(res.data.results)
        setOriginalData(res.data.results)
        setNextPage(res.data.next)
        setPreviousPage(res.data.previous)
        setCurrentPage(pageNumber)

        localStorage.setItem("gutendexBooks", JSON.stringify(res.data.results))
        localStorage.setItem("gutendexNextPage", res.data.next)
        localStorage.setItem("gutendexPreviousPage", res.data.previous)
        localStorage.setItem("gutendexCurrentPage", pageNumber)
      })
      .catch(err => {
        console.log(err)
        setError("Something went wrong. Please try again later.")
      })
      .finally(() => {
        setLoading(false)
      })
  }

  function getCachedData() {
    const cachedBooks = localStorage.getItem("gutendexBooks")
    const cachedNextPage = localStorage.getItem("gutendexNextPage")
    const cachedPreviousPage = localStorage.getItem("gutendexPreviousPage")
    const cachedCurrentPage = localStorage.getItem("gutendexCurrentPage")

    if (cachedBooks) {
      const books = JSON.parse(cachedBooks)

      setData(books)
      setOriginalData(books)
      setNextPage(cachedNextPage && cachedNextPage !== "null" ? cachedNextPage : null)
      setPreviousPage(cachedPreviousPage && cachedPreviousPage !== "null" ? cachedPreviousPage : null)
      setCurrentPage(cachedCurrentPage ? Number(cachedCurrentPage) : 1)
    } else {
      getData()
    }
  }

  function goToNextPage() {
    if (nextPage) {
      getData(nextPage, currentPage + 1)
      window.scrollTo(0, 0)
    }
  }

  function goToPreviousPage() {
    if (previousPage && currentPage > 1) {
      getData(previousPage, currentPage - 1)
      window.scrollTo(0, 0)
    }
  }

  function refreshData() {
    localStorage.removeItem("gutendexBooks")
    localStorage.removeItem("gutendexNextPage")
    localStorage.removeItem("gutendexPreviousPage")
    localStorage.removeItem("gutendexCurrentPage")

    setData([])
    setOriginalData([])
    setNextPage(null)
    setPreviousPage(null)
    setCurrentPage(1)

    getData(DBurl, 1)
  }

  useEffect(() => {
    getCachedData()
  }, [])


  function handleSearch(e) {
    const value = e.target.value.toLowerCase().trim()

    if (value === "") {
      setData(originalData)
    } else {
      const filteredBooks = originalData.filter(book =>
        book.title.toLowerCase().trim().includes(value) ||
        getAuthorName(book).toLowerCase().trim().includes(value)
      )

      setData(filteredBooks)
    }
  }

  function handleSortByName() {
    const sortedBooks = [...data].sort((a, b) =>
      a.title.localeCompare(b.title)
    )

    setData(sortedBooks)
  }

  function getAuthorName(book) {
    return book.authors && book.authors.length > 0
      ? book.authors[0].name
      : "Unknown author"
  }

  function getCoverImage(book) {
    return (
      book.formats["image/jpeg"] ||
      "https://via.placeholder.com/300x450?text=No+Cover"
    )
  }

  function getReadLink(book) {
    return (
      book.formats["text/html"] ||
      book.formats["text/html; charset=utf-8"] ||
      book.formats["text/plain; charset=utf-8"] ||
      book.formats["text/plain"] ||
      book.formats["application/epub+zip"]
    )
  }

  return (
    <div className="library-page">
      <section className="library-hero">
        <Container>
          <AutoStoriesIcon className="hero-icon" />

          <h1 className="text-4xl md:text-5xl font-extrabold mb-3">
            Online Book Library
          </h1>

          <p className="text-base md:text-lg max-w-2xl mx-auto opacity-90">
            Discover classic books, read them online, and save your favorite titles.
          </p>
        </Container>
      </section>

      <Container>
        <div className="library-toolbar">
          <div className="library-search-box">
            <SearchIcon className="text-slate-500" />

            <input
              type="search"
              placeholder="Search by title or author..."
              onChange={handleSearch}
              className="library-search-input"
            />
          </div>

          <div className="d-flex gap-2 flex-wrap">
            <Button className="library-btn library-btn-green" onClick={handleSortByName}>
              Sort by name
            </Button>

            <Button className="library-btn library-btn-gray" onClick={() => setData(originalData)}>
              Reset
            </Button>

            <Button className="library-btn library-btn-dark" onClick={refreshData}>
              Refresh
            </Button>
          </div>
        </div>

        <div className="pagination-box">
          <Button
            className="library-btn library-btn-green"
            onClick={goToPreviousPage}
            disabled={!previousPage || loading}
          >
            Previous
          </Button>

          <div className="page-number">
            Page {currentPage}
          </div>

          <Button
            className="library-btn library-btn-green"
            onClick={goToNextPage}
            disabled={!nextPage || loading}
          >
            Next
          </Button>
        </div>

        {error && (
          <div className="error-box">
            <h4>{error}</h4>
          </div>
        )}

        {loading && (
          <div className="loading-box">
            <Spinner animation="border" className="loading-spinner" />

            <h4 className="mt-4 text-slate-700">
              Loading books...
            </h4>
          </div>
        )}

        {!loading && !error && data.length === 0 && (
          <div className="empty-box">
            <h3 className="text-2xl font-bold">No books found</h3>

            <p className="text-slate-500 mt-2">
              Try another title or author name.
            </p>
          </div>
        )}

        {!loading && !error && (
          <Row className="mt-8">
            {data.map(product => (
              <Col lg={3} md={4} sm={6} key={product.id} className="mb-4">
                <Card className="book-card">
                  <div className="book-cover-box">
                    <Card.Img
                      variant="top"
                      src={getCoverImage(product)}
                      alt={product.title}
                      loading="lazy"
                      className="book-cover"
                    />
                  </div>

                  <div className="flex gap-2 mb-3 flex-wrap">
                    <Badge bg="light" text="dark" className="book-badge">
                      <LanguageIcon className="badge-icon" />
                      {product.languages?.[0]?.toUpperCase() || "Unknown"}
                    </Badge>

                    <Badge bg="light" text="dark" className="book-badge">
                      <DownloadIcon className="badge-icon" />
                      {product.download_count}
                    </Badge>
                  </div>

                  <Card.Title className="book-title">
                    {product.title}
                  </Card.Title>

                  <Card.Text className="book-author">
                    {getAuthorName(product)}
                  </Card.Text>

                  <div className="book-actions">
                    <NavLink to={`/books/${product.id}`} className="library-btn library-btn-green details-link">Details</NavLink>
                    <IconButton onClick={() => handleAddFavorite(product)}>
                      {isFavorite(product) ? (
                        <FavoriteIcon className="favorite-icon" />
                      ) : (
                        <FavoriteBorderIcon className="favorite-icon" />
                      )}
                    </IconButton>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        )}

        {!loading && !error && data.length > 0 && (
          <div className="pagination-box bottom-pagination">
            <Button
              className="library-btn library-btn-green"
              onClick={goToPreviousPage}
              disabled={!previousPage || loading}
            >
              Previous
            </Button>

            <div className="page-number">
              Page {currentPage}
            </div>

            <Button
              className="library-btn library-btn-green"
              onClick={goToNextPage}
              disabled={!nextPage || loading}
            >
              Next
            </Button>
          </div>
        )}
      </Container>
    </div>
  )
}

export default Books