"use client"

import { useState, useEffect } from "react"
import MonthCalendar from "./MonthCalendar"
import DayView from "./DayView"
import AppointmentForm from "./AppointmentForm"

const CalendarView = ({ appointments, onAppointmentsChange, onLogout, theme, toggleTheme }) => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [editingAppointment, setEditingAppointment] = useState(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkScreenSize()
    window.addEventListener("resize", checkScreenSize)
    return () => window.removeEventListener("resize", checkScreenSize)
  }, [])

  const handleDayClick = (date) => {
    setSelectedDate(date)
    setShowForm(true)
    setEditingAppointment(null)
  }

  const handleEditAppointment = (appointment) => {
    setEditingAppointment(appointment)
    setSelectedDate(new Date(appointment.date))
    setShowForm(true)
  }

  const handleSaveAppointment = (appointmentData) => {
    let newAppointments

    if (editingAppointment) {
      // Edit existing appointment
      newAppointments = appointments.map((apt) =>
        apt.id === editingAppointment.id ? { ...appointmentData, id: apt.id } : apt,
      )
    } else {
      // Add new appointment
      const newAppointment = {
        ...appointmentData,
        id: Date.now().toString(),
      }
      newAppointments = [...appointments, newAppointment]
    }

    onAppointmentsChange(newAppointments)
    setShowForm(false)
    setEditingAppointment(null)
  }

  const handleDeleteAppointment = (appointmentId) => {
    const newAppointments = appointments.filter((apt) => apt.id !== appointmentId)
    onAppointmentsChange(newAppointments)
    setShowForm(false)
    setEditingAppointment(null)
  }

  return (
    <div className="app-container">
      {/* Header */}
      <header className="app-header">
        <div className="header-content">
          <h1 className="app-title">Clinic Appointment Calendar</h1>
          
          <div className="header-actions">
            <button className="add-appointment-button hide-on-mobile" onClick={() => handleDayClick(new Date())} >Book an Appointment</button>  
            <button onClick={toggleTheme} className="theme-toggle-button" aria-label="Toggle theme">
              {theme === "light" ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-moon"
                >
                  <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-sun"
                >
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2" />
                  <path d="M12 20v2" />
                  <path d="M4.93 4.93l1.41 1.41" />
                  <path d="M17.66 17.66l1.41 1.41" />
                  <path d="M2 12h2" />
                  <path d="M20 12h2" />
                  <path d="M4.93 19.07l1.41-1.41" />
                  <path d="M17.66 6.34l1.41-1.41" />
                </svg>
              )}
            </button>
            <button onClick={onLogout} className="logout-button">
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        {isMobile ? (
          <DayView
            currentDate={currentDate}
            onDateChange={setCurrentDate}
            appointments={appointments}
            onDayClick={handleDayClick}
            onEditAppointment={handleEditAppointment}
          />
        ) : (
          <MonthCalendar
            currentDate={currentDate}
            onDateChange={setCurrentDate}
            appointments={appointments}
            onDayClick={handleDayClick}
            onEditAppointment={handleEditAppointment}
          />
        )}
      </main>

      {/* Appointment Form Modal */}
      {showForm && (
        <AppointmentForm
          selectedDate={selectedDate}
          editingAppointment={editingAppointment}
          onSave={handleSaveAppointment}
          onCancel={() => {
            setShowForm(false)
            setEditingAppointment(null)
          }}
          onDelete={handleDeleteAppointment}
        />
      )}
    </div>
  )
}

export default CalendarView
