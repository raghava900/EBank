import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {userId: '', pin: '', showSubmitError: false, errorMsg: ''}

  onUserId = event => {
    this.setState({userId: event.target.value})
  }

  onPin = event => {
    this.setState({pin: event.target.value})
  }

  onSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onFailure = errorMsg => {
    console.log(errorMsg)
    this.setState({showSubmitError: true, errorMsg})
  }

  onAdd = async event => {
    event.preventDefault()
    const {userId, pin} = this.state
    const userDetails = {userId, pin}
    const url = 'https://apis.ccbp.in/ebank/login'

    const options = {
      method: 'POST',
      body: JSON.parse(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    // const jsonData = JSON.stringify(data)
    // const parsedData = JSON.parse(jsonData)
    // console.log(parsedData)

    if (response.ok === true) {
      this.onSuccess()
    } else {
      this.onFailure(response.error_msg)
    }
  }

  render() {
    const {userId, pin, showSubmitError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="container">
        <div className="login-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
            alt="website login"
            className="img"
          />
          <form onSubmit={this.onAdd} className="form-box">
            <h1 className="wish-heading">Welcome Back!</h1>
            <label htmlFor="userId" className="label">
              User ID
            </label>
            <input
              type="text"
              id="userId"
              value={userId}
              onChange={this.onUserId}
              placeholder="Enter User ID"
              className="input"
            />
            <label htmlFor="pin" className="label">
              PIN
            </label>
            <input
              id="pin"
              type="password"
              value={pin}
              onChange={this.onPin}
              placeholder="Enter PIN"
              className="input"
            />

            <button type="submit" className="button">
              Login
            </button>

            {showSubmitError && <p>{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
