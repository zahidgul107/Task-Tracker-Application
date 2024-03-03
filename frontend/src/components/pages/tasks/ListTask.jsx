import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import './index.css'
import { getPagTasks, searchTask } from '../../../services/TaskService'
import { useDispatch, useSelector } from 'react-redux'
import {
  clearMessages,
  deleteTask,
  getAllTasks,
  removeTask,
} from '../../../features/taskList/taskListSlice'

const ListTasks = () => {
  const [dueDate, setDueDate] = useState('')
  const [status, setStatus] = useState(null)
  const navigate = useNavigate()

  const { taskList, isLoading, errorMessage, successMessage, failMessage } =
    useSelector((store) => store.tasks)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllTasks())
  }, [])

  useEffect(() => {
    let timer
    if (errorMessage) {
      timer = setInterval(() => {
        dispatch(getAllTasks())
      }, 30000)
    }

    return () => clearInterval(timer)
  }, [errorMessage, dispatch])

  useEffect(() => {
    let timer
    if (successMessage || failMessage) {
      timer = setTimeout(() => {
        dispatch(clearMessages())
      }, 3000)
    }
    return () => {
      clearTimeout(timer)
    }
  }, [successMessage, failMessage, dispatch])

  const updateTask = (id) => {
    navigate(`/updateTask/${id}`)
  }

  if (isLoading) {
    return (
      <div id="preloader">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    )
  }

  const generatePageNumbers = () => {
    const maxPagesOnEachSide = 1
    const startPage = Math.max(1, taskList.currentPage - maxPagesOnEachSide)
    const endPage = Math.min(
      taskList.totalPages,
      taskList.currentPage + maxPagesOnEachSide
    )

    const pages = []
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i)
    }
    return pages
  }

  return (
    <>
      {errorMessage ? (
        <div>
          <div
            class="modal fade show d-block mt-5"
            id="exampleModal"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
            role="dialog"
          >
            <div class="modal-dialog modal-sm">
              <svg
                class="bi flex-shrink-0 me-2"
                width="24"
                height="24"
                role="img"
                aria-label="Danger:"
              >
                <use xlink:href="#exclamation-triangle-fill" />
              </svg>
              <div
                class="modal-content text-danger text-center"
                style={{ color: '#D63301', backgroundColor: '#FFCCBA' }}
              >
                <div class="modal-body">{errorMessage}</div>
                <div class="d-flex justify-content-center m-1 p-2">
                  <div class="spinner-border" role="status">
                    <span class="visually-hidden">Loading...</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="container">
          <h2 className="text-light text-center">List of taskList</h2>
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
                style={{ width: 'fit-content' }}
              >
                {successMessage}
              </div>
            )}
          </div>
          <div className="row">
            <div className="card ms-3 border-0 d-flex mb-2 text-center col-md-2 p-2">
              <strong className="fw-bold">
                Total taskList :{' '}
                <strong className="badge badge-success p-2 rounded-circle fw-bold text-black">
                  {taskList.totalItems}
                </strong>
              </strong>
            </div>
          </div>
          <div className="card table-success mb-2 form p-4 border-0 shadow-lg">
            <form>
              <div className="row">
                <div className="form-group col-md-6">
                  <label>Status</label>{' '}
                  <select
                    className="form-select form-control"
                    aria-label="Default select example"
                    value={status}
                    onChange={(e) =>
                      setStatus(e.target.value === '' ? null : e.target.value)
                    }
                  >
                    <option value="">Select task status</option>
                    <option value="PENDING">PENDING</option>
                    <option value="IN_PROGRESS">IN_PROGRESS</option>
                    <option value="COMPLETED">COMPLETED</option>
                  </select>
                </div>

                <div className="form-group col-md-6">
                  <label>Due Date</label>{' '}
                  <input
                    type="date"
                    className="form-control picker"
                    placeholder="Enter From Date"
                    onChange={(e) => setDueDate(e.target.value)}
                  />
                </div>
              </div>

              <div className="row">
                <div className="container text-center mt-3">
                  {/* <button
                    type="submit"
                    className="btn btn-outline-primary"
                    onClick={search}
                  >
                    Search
                  </button> */}
                </div>
              </div>
            </form>
          </div>
          <table className="table table-hover table-responsive-sm table-success table-striped">
            <thead>
              <tr>
                <th scope="col">Task Title</th>
                <th scope="col">Task Description</th>
                <th scope="col">Task Due Date</th>
                <th scope="col">Task Status</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {taskList?.pagTaskList?.map((task) => (
                <tr key={task.id}>
                  <td>{task.title}</td>
                  <td>{task.description}</td>
                  <td>{task.dueDate}</td>
                  <td>{task.status}</td>
                  <td>
                    <a className="me-2" onClick={() => updateTask(task.id)}>
                      <i
                        className="fa fa-edit text-success"
                        data-bs-toggle="tooltip"
                        data-bs-placement="bottom"
                        data-bs-title="Update Bill "
                      ></i>
                    </a>
                    <a
                      type="button"
                      onClick={() => dispatch(deleteTask(task.id))}
                    >
                      <i
                        className="fa fa-trash text-danger"
                        data-bs-toggle="tooltip"
                        data-bs-placement="bottom"
                        data-bs-title="Delete Bill"
                      ></i>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>{' '}
          */
          {/* pagination */}
          /*{' '}
          {taskList.totalPages > 1 && (
            <div className="offset-md-4 col-md-8 mb-5">
              <ul className="pagination">
                <li className="page-item">
                  <button className="page-link" onClick={() => onPageChange(1)}>
                    First
                  </button>
                </li>

                <li className="page-item">
                  <button
                    className="pe-3 page-link"
                    onClick={() => onPageChange(taskList.currentPage - 1)}
                    disabled={taskList.currentPage <= 1}
                  >
                    {'<<'}
                  </button>
                </li>
                {generatePageNumbers().map((i) => (
                  <li className="page-item" key={i}>
                    <button
                      className={`page-link ${
                        taskList.currentPage === i ? 'active' : ''
                      }`}
                      onClick={() => onPageChange(i)}
                    >
                      {i}
                    </button>
                  </li>
                ))}

                <li className="page-item">
                  <button
                    className="pe-3 page-link"
                    onClick={() => onPageChange(taskList.currentPage + 1)}
                    disabled={taskList.currentPage >= taskList.totalPages}
                  >
                    {'>>'}
                  </button>
                </li>

                <li className="page-item">
                  <button
                    className="page-link"
                    onClick={() => onPageChange(taskList.totalPages)}
                    disabled={taskList.currentPage >= taskList.totalPages}
                  >
                    Last
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default ListTasks
