"use client"

const DayView = ({ currentDate, onDateChange, appointments, onDayClick, onEditAppointment }) => {
  const today = new Date()
  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()
  const day = currentDate.getDate()

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

  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

  const navigateDay = (direction) => {
    const newDate = new Date(currentDate)
    newDate.setDate(newDate.getDate() + direction)
    onDateChange(newDate)
  }

  const handleDateInputChange = (e) => {
    const newDate = new Date(e.target.value)
    onDateChange(newDate)
  }

  const getAppointmentsForCurrentDate = () => {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
    return appointments.filter((apt) => apt.date === dateStr).sort((a, b) => a.time.localeCompare(b.time))
  }

  const isToday = today.getDate() === day && today.getMonth() === month && today.getFullYear() === year

  const dayAppointments = getAppointmentsForCurrentDate()

  return (
    <div className="calendar-container">
      {/* Date Navigation */}
      <div className="day-view-header">
        <button onClick={() => navigateDay(-1)} className="nav-button">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div className="day-view-date-info">
          <input
            type="date"
            value={`${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`}
            onChange={handleDateInputChange}
            className="date-input"
          />
          <div className={`day-name-text ${isToday ? "today" : ""}`}>{dayNames[currentDate.getDay()]}</div>
        </div>

        <button onClick={() => navigateDay(1)} className="nav-button">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Day Content */}
      <div className="day-content">
        <div className="day-content-header">
          <h3 className="day-title">
            Appointments for {monthNames[month]} {day}, {year}
          </h3>
          <button onClick={() => onDayClick(currentDate)} className="add-appointment-button">
            Add Appointment
          </button>
        </div>

        {dayAppointments.length === 0 ? (
          <div className="no-appointments">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <p>No appointments scheduled for this day</p>
            <button onClick={() => onDayClick(currentDate)} className="no-appointments-link">
              Schedule an appointment
            </button>
          </div>
        ) : (
          <div className="day-appointments">
            {dayAppointments.map((apt) => (
              <div key={apt.id} className="day-appointment-card" onClick={() => onEditAppointment(apt)}>
                <div className="appointment-card-content">
                  <div className="appointment-details">
                    <div className="patient-name">{apt.patient}</div>
                    <div className="doctor-name">Dr. {apt.doctor}</div>
                    <div className="appointment-time-detail">{apt.time}</div>
                  </div>
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default DayView
