import React, { useContext } from 'react'

import { favoriteContext } from '../../../context/FavoritesContext'

import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Badge from 'react-bootstrap/Badge'

import HeartBrokenIcon from '@mui/icons-material/HeartBroken'
import FavoriteIcon from '@mui/icons-material/Favorite'
import AutoStoriesIcon from '@mui/icons-material/AutoStories'
import DownloadIcon from '@mui/icons-material/Download'
import LanguageIcon from '@mui/icons-material/Language'
import MenuBookIcon from '@mui/icons-material/MenuBook'

import { IconButton } from '@mui/material'

import './favorites.css'
import { NavLink } from 'react-router-dom'

function Favorites() {
  const { favorites, setFavorites } = useContext(favoriteContext)

  function handleDeleteFavorite(id) {
    const deleteFavorite = favorites.filter(favorite => favorite.id !== id)
    setFavorites(deleteFavorite)
  }

  function clearAllFavorites() {
    setFavorites([])
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
    <main className="favorites-page">
      <section className="favorites-hero">
        <Container>
          <div className="favorites-hero-content">
            <div className="favorites-icon-box">
              <FavoriteIcon />
            </div>

            <div>
              <span className="favorites-label">
                Your personal collection
              </span>

              <h1>Favorite Books</h1>

              <p>
                Keep your favorite classic books in one place and return to them anytime.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <Container>
        {favorites.length === 0 ? (
          <div className="favorites-empty">
            <div className="empty-icon">
              <AutoStoriesIcon />
            </div>

            <h2>Your Favorites List is Empty</h2>

            <p>
              You have not added any books yet. Go to the books page and save the ones you like.
            </p>

            <Button href="/books" className="favorites-main-btn">
              Browse Books
            </Button>
          </div>
        ) : (
          <>
            <div className="favorites-top">
              <div>
                <h2>Your Favorites List</h2>

                <p>
                  {favorites.length} saved {favorites.length === 1 ? "book" : "books"}
                </p>
              </div>

              <Button className="clear-btn" onClick={clearAllFavorites}>
                Clear all
              </Button>
            </div>

            <Row className="favorites-row">
              {favorites.map(favorite => (
                <Col lg={3} md={4} sm={6} key={favorite.id} className="mb-4">
                  <Card className="favorite-book-card">
                    <div className="favorite-cover-box">
                      <Card.Img
                        variant="top"
                        src={getCoverImage(favorite)}
                        alt={favorite.title}
                        loading="lazy"
                        className="favorite-cover"
                      />
                    </div>

                    <div className="favorite-badges">
                      <Badge bg="light" text="dark" className="favorite-badge">
                        <LanguageIcon className="favorite-badge-icon" />
                        {favorite.languages?.[0]?.toUpperCase() || "Unknown"}
                      </Badge>

                      <Badge bg="light" text="dark" className="favorite-badge">
                        <DownloadIcon className="favorite-badge-icon" />
                        {favorite.download_count || 0}
                      </Badge>
                    </div>

                    <Card.Title className="favorite-title">
                      {favorite.title}
                    </Card.Title>

                    <Card.Text className="favorite-author">
                      {getAuthorName(favorite)}
                    </Card.Text>

                    <div className="favorite-actions">
                      {getReadLink(favorite) ? (
                        <NavLink
                          to={`/books/${favorite.id}/read`}
                          className="details-read-btn"
                        >
                          <MenuBookIcon />
                          Read
                        </NavLink>
                      ) : (
                        <span className="no-read-link">
                          No link
                        </span>
                      )}

                      <IconButton onClick={() => handleDeleteFavorite(favorite.id)}>
                        <HeartBrokenIcon className="delete-favorite-icon" />
                      </IconButton>
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
          </>
        )}
      </Container>
    </main>
  )
}

export default Favorites