import Cookies from 'js-cookie'

import './index.css'

const Home = props => {
  const {history} = props
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    history.replace('/ebank/login')
  }
  return (
    <div className="home-container">
      <div className="header">
        <img
          src="https://assets.ccbp.in/frontend/react-js/ebank-logo-img.png"
          alt="website logo"
          className="website-logo"
        />
        <button type="button" className="btn" onClick={onClickLogout}>
          Logout
        </button>
      </div>{' '}
      <div className="container12">
        <h1 className="heading">Your Flexibility, Our Excellence</h1>
        <img
          src="https://assets.ccbp.in/frontend/react-js/ebank-digital-card-img.png"
          alt="digital card"
          className="img1"
        />
      </div>
    </div>
  )
}

export default Home
