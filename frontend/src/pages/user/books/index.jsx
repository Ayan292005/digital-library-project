import React, { useContext, useEffect, useState } from 'react'
import axios from "axios"
import { NavLink } from 'react-router-dom'

import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Badge from 'react-bootstrap/Badge'
import Spinner from 'react-bootstrap/Spinner'

import { IconButton } from '@mui/material'

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import SearchIcon from '@mui/icons-material/Search'
import AutoStoriesIcon from '@mui/icons-material/AutoStories'
import DownloadIcon from '@mui/icons-material/Download'
import LanguageIcon from '@mui/icons-material/Language'

import { favoriteContext } from '../../../context/FavoritesContext'

import './books.css'

const DBurl = "https://gutendex.com/books"
const BOOKS_PER_PAGE = 32

function Books() {
  const [data, setData] = useState([])
  const [originalData, setOriginalData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const [nextPage, setNextPage] = useState(null)
  const [previousPage, setPreviousPage] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const [searchValue, setSearchValue] = useState("")
  const [activeSearchValue, setActiveSearchValue] = useState("")
  const [pageInput, setPageInput] = useState("")

  const { favorites, setFavorites } = useContext(favoriteContext)

  function createPageUrl(pageNumber = 1, searchText = activeSearchValue) {
    const params = new URLSearchParams()

    if (searchText.trim() !== "") {
      params.set("search", searchText.trim())
    }

    if (pageNumber > 1) {
      params.set("page", pageNumber)
    }

    const queryString = params.toString()

    return queryString ? `${DBurl}?${queryString}` : DBurl
  }

  function getPagesCache() {
    const cachedPages = localStorage.getItem("gutendexPagesCache")
    return cachedPages ? JSON.parse(cachedPages) : {}
  }

  function savePageToCache(url, pageData) {
    const cachedPages = getPagesCache()

    cachedPages[url] = pageData

    localStorage.setItem("gutendexPagesCache", JSON.stringify(cachedPages))
  }

  function saveCurrentView(url, pageNumber, currentSearchValue) {
    localStorage.setItem("gutendexCurrentUrl", url)
    localStorage.setItem("gutendexCurrentPage", pageNumber)
    localStorage.setItem("gutendexSearchValue", currentSearchValue)
  }

  function setBooksFromPage(pageData) {
    setData(pageData.results)
    setOriginalData(pageData.results)
    setNextPage(pageData.next)
    setPreviousPage(pageData.previous)
    setCurrentPage(pageData.pageNumber)
    setTotalPages(pageData.totalPages)
    setPageInput("")
  }

  function getData(url = DBurl, pageNumber = 1, options = {}) {
    const {
      forceRefresh = false,
      searchText = activeSearchValue,
    } = options

    setError("")

    if (!forceRefresh) {
      const cachedPages = getPagesCache()
      const cachedPage = cachedPages[url]

      if (cachedPage) {
        setBooksFromPage(cachedPage)
        saveCurrentView(url, cachedPage.pageNumber, searchText)
        return
      }
    }

    setLoading(true)

    axios.get(url)
      .then(res => {
        const totalPageCount = Math.ceil(res.data.count / BOOKS_PER_PAGE)

        const pageData = {
          results: res.data.results,
          next: res.data.next,
          previous: res.data.previous,
          count: res.data.count,
          totalPages: totalPageCount,
          pageNumber: pageNumber,
        }

        setBooksFromPage(pageData)
        savePageToCache(url, pageData)
        saveCurrentView(url, pageNumber, searchText)
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
    const currentUrl = localStorage.getItem("gutendexCurrentUrl")
    const cachedSearchValue = localStorage.getItem("gutendexSearchValue")

    if (cachedSearchValue) {
      setSearchValue(cachedSearchValue)
      setActiveSearchValue(cachedSearchValue)
    }

    if (currentUrl) {
      getData(currentUrl, 1, {
        searchText: cachedSearchValue || "",
      })
    } else {
      getData(DBurl, 1, {
        searchText: "",
      })
    }
  }

  useEffect(() => {
    getCachedData()
  }, [])

  function handleSearchSubmit(e) {
    e.preventDefault()

    const trimmedValue = searchValue.trim()

    if (trimmedValue === "") {
      clearSearch()
      return
    }

    setActiveSearchValue(trimmedValue)

    const searchUrl = createPageUrl(1, trimmedValue)

    getData(searchUrl, 1, {
      searchText: trimmedValue,
    })

    window.scrollTo(0, 0)
  }

  function clearSearch() {
    setSearchValue("")
    setActiveSearchValue("")

    const firstPageUrl = createPageUrl(1, "")

    getData(firstPageUrl, 1, {
      searchText: "",
    })

    window.scrollTo(0, 0)
  }

  function goToNextPage() {
    if (nextPage) {
      getData(nextPage, currentPage + 1, {
        searchText: activeSearchValue,
      })

      window.scrollTo(0, 0)
    }
  }

  function goToPreviousPage() {
    if (previousPage && currentPage > 1) {
      getData(previousPage, currentPage - 1, {
        searchText: activeSearchValue,
      })

      window.scrollTo(0, 0)
    }
  }

  function goToPage(e) {
    e.preventDefault()

    const selectedPage = Number(pageInput)

    if (!selectedPage || selectedPage < 1 || selectedPage > totalPages) {
      setError(`Please enter a page number from 1 to ${totalPages}.`)
      setPageInput("")
      return
    }

    if (selectedPage === currentPage) {
      setPageInput("")
      return
    }

    const pageUrl = createPageUrl(selectedPage, activeSearchValue)

    getData(pageUrl, selectedPage, {
      searchText: activeSearchValue,
    })

    window.scrollTo(0, 0)
  }

  function refreshData() {
    localStorage.removeItem("gutendexPagesCache")
    localStorage.removeItem("gutendexCurrentUrl")
    localStorage.removeItem("gutendexCurrentPage")
    localStorage.removeItem("gutendexSearchValue")

    setSearchValue("")
    setActiveSearchValue("")
    setData([])
    setOriginalData([])
    setNextPage(null)
    setPreviousPage(null)
    setCurrentPage(1)
    setTotalPages(1)
    setPageInput("")

    getData(DBurl, 1, {
      forceRefresh: true,
      searchText: "",
    })

    window.scrollTo(0, 0)
  }

  function resetSorting() {
    setData(originalData)
  }

  function handleSortByName() {
    const sortedBooks = [...data].sort((a, b) =>
      a.title.localeCompare(b.title)
    )

    setData(sortedBooks)
  }

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

  function getAuthorName(book) {
    return book.authors && book.authors.length > 0
      ? book.authors[0].name
      : "Unknown author"
  }

  function getCoverImage(book) {
    return (
      book.formats?.["image/jpeg"] ||
      "https://via.placeholder.com/300x450?text=No+Cover"
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
          <form className="library-search-box" onSubmit={handleSearchSubmit}>
            <SearchIcon className="text-slate-500" />

            <input
              type="search"
              placeholder="Search by title or author..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="library-search-input"
            />

            <Button type="submit" className="library-btn library-btn-green">
              Search
            </Button>

            {searchValue && (
              <Button
                type="button"
                className="library-btn library-btn-gray"
                onClick={clearSearch}
              >
                Clear
              </Button>
            )}
          </form>

          <div className="toolbar-buttons">
            <Button className="library-btn library-btn-green" onClick={handleSortByName}>
              Sort by name
            </Button>

            <Button className="library-btn library-btn-gray" onClick={resetSorting}>
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

          <form className="page-number page-jump-form" onSubmit={goToPage}>
            <span>Page</span>

            <input
              type="number"
              min="1"
              max={totalPages}
              value={pageInput}
              onChange={(e) => setPageInput(e.target.value)}
              onFocus={() => setPageInput(currentPage)}
              placeholder={currentPage}
              className="page-jump-input"
            />

            <span>of {totalPages}</span>
          </form>

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

        {!loading && !error && data.length > 0 && (
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

                  <div className="d-flex gap-2 mb-3 flex-wrap">
                    <Badge bg="light" text="dark" className="book-badge">
                      <LanguageIcon className="badge-icon" />
                      {product.languages?.[0]?.toUpperCase() || "Unknown"}
                    </Badge>

                    <Badge bg="light" text="dark" className="book-badge">
                      <DownloadIcon className="badge-icon" />
                      {product.download_count || 0}
                    </Badge>
                  </div>

                  <Card.Title className="book-title">
                    {product.title}
                  </Card.Title>

                  <Card.Text className="book-author">
                    {getAuthorName(product)}
                  </Card.Text>

                  <div className="book-actions">
                    <NavLink
                      to={`/books/${product.id}`}
                      className="library-btn library-btn-green details-link"
                    >
                      Details
                    </NavLink>

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

            <form className="page-number page-jump-form" onSubmit={goToPage}>
              <span>Page</span>

              <input
                type="number"
                min="1"
                max={totalPages}
                value={pageInput}
                onChange={(e) => setPageInput(e.target.value)}
                onFocus={() => setPageInput(currentPage)}
                placeholder={currentPage}
                className="page-jump-input"
              />

              <span>of {totalPages}</span>
            </form>

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