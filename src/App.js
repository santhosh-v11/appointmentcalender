"use client"
import "./App.css"
import { useState, useEffect } from "react"
import LoginPage from "./components/LoginPage"
import CalendarView from "./components/CalendarView"

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [appointments, setAppointments] = useState([])
  const [theme, setTheme] = useState("light") // 'light' or 'dark'

  useEffect(() => {
    // Check if user is already logged in
    const authStatus = localStorage.getItem("clinicAuth")
    if (authStatus === "true") {
      setIsAuthenticated(true)
    }

    // Load appointments from localStorage
    const savedAppointments = localStorage.getItem("clinicAppointments")
    if (savedAppointments) {
      setAppointments(JSON.parse(savedAppointments))
    }

    // Load theme from localStorage
    const savedTheme = localStorage.getItem("clinicTheme")
    if (savedTheme) {
      setTheme(savedTheme)
      document.body.classList.toggle("dark-mode", savedTheme === "dark")
    } else {
      // Default to light mode or system preference
      const prefersDarkMode = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
      const initialTheme = prefersDarkMode ? "dark" : "light"
      setTheme(initialTheme)
      document.body.classList.toggle("dark-mode", initialTheme === "dark")
      localStorage.setItem("clinicTheme", initialTheme)
    }
  }, [])

  useEffect(() => {
    // Update body class when theme changes
    document.body.classList.toggle("dark-mode", theme === "dark")
    localStorage.setItem("clinicTheme", theme)
  }, [theme])

  const handleLogin = (success) => {
    if (success) {
      setIsAuthenticated(true)
      localStorage.setItem("clinicAuth", "true")
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem("clinicAuth")
  }

  const saveAppointments = (newAppointments) => {
    setAppointments(newAppointments)
    localStorage.setItem("clinicAppointments", JSON.stringify(newAppointments))
  }

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"))
  }

  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} theme={theme} toggleTheme={toggleTheme} />
  }

  return (
    <CalendarView
      appointments={appointments}
      onAppointmentsChange={saveAppointments}
      onLogout={handleLogout}
      theme={theme}
      toggleTheme={toggleTheme}
    />
  )
}

export default App
