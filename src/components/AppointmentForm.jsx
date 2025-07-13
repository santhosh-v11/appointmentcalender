"use client"

import { useState, useEffect } from "react"

const AppointmentForm = ({ selectedDate, editingAppointment, onSave, onCancel, onDelete }) => {
  const [formData, setFormData] = useState({
    patient: "",
    doctor: "",
    time: "",
    date: "",
  })

  const patients = [
    "John Smith",
    "Mary Johnson",
    "Robert Brown",
    "Patricia Davis",
    "Michael Wilson",
    "Linda Moore",
    "William Taylor",
    "Elizabeth Anderson",
    "David Thomas",
    "Jennifer Jackson",
  ]

  const doctors = ["Anderson", "Brown", "Davis", "Johnson", "Miller", "Smith", "Taylor", "Wilson"]

  const timeSlots = [
    "08:00",
    "08:30",
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
  ]

  useEffect(() => {
    if (editingAppointment) {
      setFormData(editingAppointment)
    } else if (selectedDate) {
      const year = selectedDate.getFullYear()
      const month = selectedDate.getMonth()
      const day = selectedDate.getDate()
      const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`

      setFormData({
        patient: "",
        doctor: "",
        time: "",
        date: dateStr,
      })
    }
  }, [selectedDate, editingAppointment])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formData.patient && formData.doctor && formData.time && formData.date) {
      onSave(formData)
    }
  }

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const formatDate = (dateStr) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-body">
          <div className="modal-header">
            <h2 className="modal-title">{editingAppointment ? "Edit Appointment" : "New Appointment"}</h2>
            <button onClick={onCancel} className="close-button">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="form-container">
            {/* Date Display */}
            <div className="form-group">
              <label className="form-label">Date</label>
              <div className="date-display">{formatDate(formData.date)}</div>
            </div>

            {/* Patient Selection */}
            <div className="form-group">
              <label className="form-label">Patient *</label>
              <select
                value={formData.patient}
                onChange={(e) => handleInputChange("patient", e.target.value)}
                className="form-select"
                required
              >
                <option value="">Select a patient</option>
                {patients.map((patient) => (
                  <option key={patient} value={patient}>
                    {patient}
                  </option>
                ))}
              </select>
            </div>

            {/* Doctor Selection */}
            <div className="form-group">
              <label className="form-label">Doctor *</label>
              <select
                value={formData.doctor}
                onChange={(e) => handleInputChange("doctor", e.target.value)}
                className="form-select"
                required
              >
                <option value="">Select a doctor</option>
                {doctors.map((doctor) => (
                  <option key={doctor} value={doctor}>
                    Dr. {doctor}
                  </option>
                ))}
              </select>
            </div>

            {/* Time Selection */}
            <div className="form-group">
              <label className="form-label">Time *</label>
              <select
                value={formData.time}
                onChange={(e) => handleInputChange("time", e.target.value)}
                className="form-select"
                required
              >
                <option value="">Select a time</option>
                {timeSlots.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>

            {/* Form Actions */}
            <div className="form-actions">
              <div className="form-actions-left">
                {editingAppointment && (
                  <button type="button" onClick={() => onDelete(editingAppointment.id)} className="delete-button">
                    Delete
                  </button>
                )}
              </div>
              <div className="form-actions-right">
                <button type="button" onClick={onCancel} className="cancel-button">
                  Cancel
                </button>
                <button type="submit" className="save-button">
                  {editingAppointment ? "Update" : "Save"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AppointmentForm
