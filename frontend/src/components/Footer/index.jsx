import React from 'react'

import AutoStoriesIcon from '@mui/icons-material/AutoStories'
import GitHubIcon from '@mui/icons-material/GitHub'
import EmailIcon from '@mui/icons-material/Email'

import './Footer.css'

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-brand">
          <div className="footer-logo">
            <AutoStoriesIcon />
          </div>

          <div  className='footer-box'>
            <h3 className='mb-4'>Book Library</h3>
            <p>Discover classic books and read them online.</p>
          </div>
        </div>

        <div className="footer-right" >
          <div className="footer-socials" >
            <a
              href="https://github.com/Ayan292005"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-link"
            >
              <GitHubIcon />
            </a>

            <a
              href="mailto:ayan.ahundova@gmail.com"
              className="footer-social-link"
            >
              <EmailIcon />
            </a>
          </div>

          <p className="footer-copy">
            © {new Date().getFullYear()} Book Library. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer