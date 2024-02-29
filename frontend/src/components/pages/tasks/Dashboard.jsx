import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './index.css'
import { getCount } from '../../../services/DashboardService'
import EventBus from '../../../utils/EventBus'
import { useDispatch, useSelector } from 'react-redux'

const Dashboard = () => {
  const { tasksCount } = useSelector((store) => store.dashboard)
  console.log('taskcount====', tasksCount)
  const dispatch = useDispatch()
  //const [tasksCount, setTasksCount] = useState('')
  const [message, setMessage] = useState('')

  const dispatchh = (error) => {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    setMessage(message)

    if (error.response && error.response.status === 401) {
      EventBus.dispatch('logout')
    }
  }

  useEffect(() => {
    //  dashboardCount()
    dispatch(getCount())
  }, [])

  function dashboardCount() {
    getCount()
      .then((response) => {
        const { tasksCount } = response.data
        tasksCount ? setTasksCount(tasksCount) : setTasksCount(0)
      })
      .catch((error) => {
        dispatchh(error)
      })
  }
  return (
    <div className="container mt-5">
      <div className="row column1">
        <div className="col-md-6">
          <Link to="/addTask">
            <div className="full counter_section margin_bottom_30">
              <div className="couter_icon">
                <span>
                  <i className="fa fa-file-text yellow_color"></i>
                </span>
              </div>
              <div className="counter_no">
                <div>
                  <p className="total_no"></p>
                  <p className="head_couter text-warning fw-bold">Add Task</p>
                </div>
              </div>
            </div>
          </Link>
        </div>
        <div className="col-md-6">
          <Link to="/tasks">
            <div className="full counter_section margin_bottom_30">
              <div className="couter_icon">
                <div>
                  <i className="fa fa-list orange_color"></i>
                </div>
              </div>
              <div className="counter_no">
                <div>
                  <p className="total_no text-info font-weight-bold">
                    {tasksCount.tasksCount}
                  </p>
                  <p className="head_couter text-warning fw-bold">View Tasks</p>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
