import React, { createContext, useEffect, useState } from 'react'

export const ThemeContext = createContext()

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light"
  })

  function toggleTheme() {
    setTheme(prevTheme => prevTheme === "light" ? "dark" : "light")
  }

  useEffect(() => {
    localStorage.setItem("theme", theme)
    document.body.setAttribute("data-theme", theme)
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeProvider