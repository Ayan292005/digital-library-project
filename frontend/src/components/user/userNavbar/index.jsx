import React, { useContext } from 'react'

import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import BootstrapNavbar from 'react-bootstrap/Navbar'

import { NavLink } from "react-router-dom"

import FavoriteIcon from '@mui/icons-material/Favorite'
import AutoStoriesIcon from '@mui/icons-material/AutoStories'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'

import { favoriteContext } from '../../../context/FavoritesContext'
import { basketContext } from '../../../context/BasketContext'
import "./navbar.css"

function UserNavbar() {
  const { favorites } = useContext(favoriteContext)
  const { basket } = useContext(basketContext)

  return (
    <BootstrapNavbar expand="lg" className="user-navbar">
      <Container>
        <NavLink to="/" className="navbar-brand-custom">
          <div className="navbar-logo-icon">
            <AutoStoriesIcon />
          </div>

          <span>Book Library</span>
        </NavLink>

        <BootstrapNavbar.Toggle aria-controls="user-navbar-nav" className="navbar-toggler-custom" />

        <BootstrapNavbar.Collapse id="user-navbar-nav">
          <Nav className="me-auto navbar-links-custom">
            <NavLink
              to="/books"
              className={({ isActive }) =>
                isActive ? "navbar-link-custom active-navbar-link" : "navbar-link-custom"
              }
            >
              Books
            </NavLink>

            <NavLink
              to="/favorites"
              className={({ isActive }) =>
                isActive ? "navbar-link-custom active-navbar-link favorite-nav-link" : "navbar-link-custom favorite-nav-link"
              }
            >
              <FavoriteIcon className="favorite-nav-icon" />

              <span>Favorites</span>

              <span className="favorite-count">
                {favorites.length}
              </span>
            </NavLink>
          </Nav>

          {/* <Nav className="ms-auto">
            <NavLink
              to="/admin"
              className={({ isActive }) =>
                isActive ? "navbar-link-custom active-navbar-link admin-link" : "navbar-link-custom admin-link"
              }
            >
              <AdminPanelSettingsIcon className="admin-icon" />
              Admin
            </NavLink>
          </Nav> */}
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  )
}

export default UserNavbar