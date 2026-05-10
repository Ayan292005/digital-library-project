import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import FavotiteProvider from './context/FavoritesContext.jsx'
import BasketProvider from './context/BasketContext.jsx'
import ThemeProvider from './context/ThemeContext.jsx'

createRoot(document.getElementById('root')).render(
    <BasketProvider>
        <FavotiteProvider>
            <ThemeProvider>
                <App />
            </ThemeProvider>
        </FavotiteProvider>
    </BasketProvider>



)
