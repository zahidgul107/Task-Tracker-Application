import React, { useState } from 'react'
import { useSelector } from 'react-redux'

const AddTask = () => {
  const [successMessage, setSuccessMessage] = useState('')
  const [failMessage, setFailMessage] = useState('')
  const [errors, setErrors] = useState({
    title: '',
    description: '',
    dueDate: '',
    status: '',
  })
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [status, setStatus] = useState('')

  const saveOrUpdateTask = (e) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const task = Object.fromEntries(formData)

    console.log('task===', task)
  }

  function pageTitle() {
    if (true) {
      return <h2 className="text-center">Update Task</h2>
    } else {
      return <h2 className="text-center">Add Task</h2>
    }
  }
  return (
    <>
      <div className="container">
        <br /> <br />
        <div className="row">
          <div className="card col-md-6 offset-md-3 offset-md-3">
            {pageTitle()}
            <div className="row w-50 mx-auto">
              {failMessage && (
                <div
                  className=" col-md-12 m-4 alert alert-icon alert-danger border-danger alert-dismissible fade show text-center "
                  role="alert"
                  style={{ width: 'fit-content' }}
                >
                  {failMessage}
                </div>
              )}
              {successMessage && (
                <div
                  className=" col-md-12 m-4 alert alert-icon alert-success border-success alert-dismissible fade show text-center "
                  role="alert"
                  style={{ width: 'fitContent' }}
                >
                  {successMessage}
                </div>
              )}
            </div>
            <div className="card-body">
              <form onSubmit={saveOrUpdateTask}>
                <div className="mb-3">
                  <label className="form-label">Title</label>
                  <input
                    type="text"
                    className={`form-control ${
                      errors.title ? 'is-invalid' : ''
                    }`}
                    name="title"
                  />
                  {errors.title && (
                    <div className="invalid-feedback">{errors.title}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea
                    type="textarea"
                    className={`form-control ${
                      errors.description ? 'is-invalid' : ''
                    }`}
                    name="description"
                  />
                  {errors.description && (
                    <div className="invalid-feedback">{errors.description}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label className="form-label">Due Date</label>
                  <input
                    type="date"
                    className={`form-control ${
                      errors.dueDate ? 'is-invalid' : ''
                    }`}
                    name="dueDate"
                  />
                  {errors.dueDate && (
                    <div className="invalid-feedback">{errors.dueDate}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label className="form-label">Status</label>
                  <select
                    type="email"
                    className={`form-control ${
                      errors.status ? 'is-invalid' : ''
                    }`}
                    name="status"
                  >
                    <option value="">Select task status</option>
                    <option value="PENDING">PENDING</option>
                    <option value="IN_PROGRESS">IN_PROGRESS</option>
                    <option value="COMPLETED">COMPLETED</option>
                  </select>
                  {errors.status && (
                    <div className="invalid-feedback">{errors.status}</div>
                  )}
                </div>
                <button
                  type="submit"
                  className="btn btn-primary"
                  //  onClick={saveOrUpdateTask}
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddTask
