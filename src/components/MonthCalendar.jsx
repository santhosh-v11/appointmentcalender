"use client"

const MonthCalendar = ({ currentDate, onDateChange, appointments, onDayClick, onEditAppointment }) => {
  const today = new Date()
  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  const firstDayOfMonth = new Date(year, month, 1)
  const lastDayOfMonth = new Date(year, month + 1, 0)
  const firstDayOfWeek = firstDayOfMonth.getDay()
  const daysInMonth = lastDayOfMonth.getDate()

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate)
    newDate.setMonth(newDate.getMonth() + direction)
    onDateChange(newDate)
  }

  const getAppointmentsForDate = (day) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
    return appointments.filter((apt) => apt.date === dateStr)
  }

  const renderCalendarDays = () => {
    const days = []

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day" style={{ height: "8rem", padding: "0.5rem" }}></div>)
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dayAppointments = getAppointmentsForDate(day)
      const isToday = today.getDate() === day && today.getMonth() === month && today.getFullYear() === year

      days.push(
        <div
          key={day}
          className={`calendar-day ${isToday ? "today" : ""}`}
          onClick={() => onDayClick(new Date(year, month, day))}
        >
          <div className={`day-number ${isToday ? "today" : ""}`}>{day}</div>
          <div className="appointments-list">
            {dayAppointments.map((apt) => (
              <div
                key={apt.id}
                className="appointment-item"
                onClick={(e) => {
                  e.stopPropagation()
                  onEditAppointment(apt)
                }}
              >
                <div className="appointment-time">{apt.time}</div>
                <div className="appointment-patient">{apt.patient}</div>
              </div>
            ))}
          </div>
        </div>,
      )
    }

    return days
  }

  return (
    <div className="calendar-container">
      {/* Calendar Header */}
      <div className="calendar-header">
        <button onClick={() => navigateMonth(-1)} className="nav-button">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <h2 className="calendar-title">
          {monthNames[month]} {year}
        </h2>

        <button onClick={() => navigateMonth(1)} className="nav-button">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Day Names Header */}
      <div className="day-names-header">
        {dayNames.map((dayName) => (
          <div key={dayName} className="day-name">
            {dayName}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="calendar-grid">{renderCalendarDays()}</div>
    </div>
  )
}

export default MonthCalendar
