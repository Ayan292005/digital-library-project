import React from 'react'
import { NavLink } from 'react-router-dom'

import AutoStoriesIcon from '@mui/icons-material/AutoStories'
import SearchIcon from '@mui/icons-material/Search'
import FavoriteIcon from '@mui/icons-material/Favorite'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks'

import './Home.css'

function Home() {
  return (
    <main className="home-page">
      <section className="home-top-banner">
        <div className="banner-content">
          <div className="banner-text">
            <span className="banner-label">Free online reading</span>

            <h1>
              Your personal space for timeless books
            </h1>

            <p>
              Browse classic literature, open books online, and collect your favorite reads in one beautiful library.
            </p>

            <NavLink to="/books" className="banner-btn">
              Start Reading
              <ArrowForwardIcon />
            </NavLink>
          </div>

          <div className="banner-image-area">
            <div className="floating-circle circle-one"></div>
            <div className="floating-circle circle-two"></div>

            <div className="animated-book-photo">
              <div className="book-photo-header">
                <LibraryBooksIcon />
                <span>Digital Library</span>
              </div>

              <div className="book-photo-cover">
                <MenuBookIcon />
              </div>

              <div className="book-photo-lines">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="home-hero">
        <div className="home-hero-content">
          <div className="home-badge">
            <AutoStoriesIcon />
            <span>Online Book Library</span>
          </div>

          <h1>
            Discover, read and save your favorite books online
          </h1>

          <p>
            Explore a collection of classic books, search by title or author,
            read books online, and keep your favorites in one place.
          </p>

          <div className="home-actions">
            <NavLink to="/books" className="home-primary-btn">
              Explore Books
              <ArrowForwardIcon />
            </NavLink>

            <NavLink to="/favorites" className="home-secondary-btn">
              My Favorites
            </NavLink>
          </div>
        </div>

        <div className="home-hero-card">
          <div className="book-preview book-preview-main">
            <MenuBookIcon />
            <h3>Classic Library</h3>
            <p>Read timeless books online for free.</p>
          </div>

          <div className="book-preview small-card search-card">
            <SearchIcon />
            <span>Search books</span>
          </div>

          <div className="book-preview small-card favorite-card">
            <FavoriteIcon />
            <span>Save favorites</span>
          </div>
        </div>
      </section>

      <section className="home-features">
        <div className="feature-card">
          <div className="feature-icon">
            <SearchIcon />
          </div>

          <h3>Search Books</h3>
          <p>
            Find books by title or author and browse different pages of results.
          </p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">
            <MenuBookIcon />
          </div>

          <h3>Read Online</h3>
          <p>
            Open available books and read them directly from your browser.
          </p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">
            <FavoriteIcon />
          </div>

          <h3>Save Favorites</h3>
          <p>
            Add books to your favorites list and return to them later.
          </p>
        </div>
      </section>
    </main>
  )
}

export default Home