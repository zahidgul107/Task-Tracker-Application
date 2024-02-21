import { NavLink, useNavigate } from 'react-router-dom'
import AuthService from '../../services/auth.service'

const Header = () => {
  const navigate = useNavigate()

  const isAuth = AuthService.getCurrentUser()

  function handleLogout() {
    AuthService.logout()
    navigate('/')
  }

  return (
    <nav className="navbar navbar-dark navbar-expand-lg bg-dark border-bottom border-body sticky-top">
      <a className="navbar-brand">Task Tracker</a>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          {isAuth && (
            <NavLink
              className="nav-item active text-light text-decoration-none"
              to="/dashboard"
            >
              Dashboard <span className="sr-only">(current)</span>
            </NavLink>
          )}
          {!isAuth && (
            <li className="nav-item">
              <NavLink className="nav-link" to="/register">
                Sign Up
              </NavLink>
            </li>
          )}
          {!isAuth && (
            <li className="nav-item">
              <NavLink className="nav-link" to="/login">
                Sign In
              </NavLink>
            </li>
          )}
        </ul>
        {isAuth && (
          <span className="nav-item navbar-text ms-3">
            <NavLink
              className="nav-link mx-end"
              to="/login"
              onClick={handleLogout}
            >
              Logout
            </NavLink>
          </span>
        )}
      </div>
    </nav>
  )
}

export default Header
