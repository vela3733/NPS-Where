import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const linkStyle = {
  margin: "1rem",
  textDecoration: "none",
  color: 'indigo',
};

const Navbar = ({handleClick, isLoggedIn}) => (
  <div>
    <nav>
    <img className="logo" src="logo.png"  />

      {isLoggedIn ? (
        <div className="navLinks">
          {/* The navbar will show these links after you log in */}
          <Link className="link" to="/home" style={linkStyle} >Home</Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      ) : (
        <div className="navLinks">
          {/* The navbar will show these links before you log in */}
          <Link to="/login" style={linkStyle} >Login</Link>
          <Link to="/signup" style={linkStyle} >Sign Up</Link>
          <Link to="/home" style={linkStyle} >Home</Link>

        </div>
      )}
    </nav>
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.auth.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)
