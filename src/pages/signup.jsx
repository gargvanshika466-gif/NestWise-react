import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Signup() {

  const [role, setRole] = useState('')
  const navigate = useNavigate()

  const handleSellerAccount = () => {
    navigate('/list-property')
  }

  return (
    <div className="signup-page">

      <div className="signup-card">

        <h1>Create Account</h1>

        <p>Join NestWise today</p>

        <h3>Choose your account type</h3>

        <div className="role-options">

          <div className="role-card">

            <div className="role-icon">🏠</div>

            <h2>Buyer</h2>

            <p>
              Find your perfect home on NestWise.
            </p>

            <button onClick={() => setRole('buyer')}>
              Continue as Buyer
            </button>

            <p className="login-text">
              Already have an account?
              <Link to="/login"> Login</Link>
            </p>

          </div>


          <div className="role-card">

            <div className="role-icon">🏢</div>

            <h2>Seller</h2>

            <p>
              List your property on NestWise.
            </p>

            <button onClick={() => setRole('seller')}>
              Continue as Seller
            </button>

          </div>

        </div>


        {role === 'buyer' && (

          <div className="signup-form">

            <h2>Buyer Information</h2>

            <input
              type="text"
              placeholder="Full Name"
            />

            <input
              type="email"
              placeholder="Email"
            />

            <input
              type="password"
              placeholder="Password"
            />

            <input
              type="password"
              placeholder="Confirm Password"
            />

            <input
              type="text"
              placeholder="Phone Number"
            />

            <button className="create-account-btn">
              Create Buyer Account
            </button>

          </div>

        )}


        {role === 'seller' && (

          <div className="signup-form">

            <h2>Seller Information</h2>

            <input
              type="text"
              placeholder="Full Name"
            />

            <input
              type="email"
              placeholder="Email"
            />

            <input
              type="password"
              placeholder="Password"
            />

            <input
              type="password"
              placeholder="Confirm Password"
            />

            <input
              type="text"
              placeholder="Phone Number"
            />

            <button
              className="create-account-btn"
              onClick={handleSellerAccount}
            >
              Create Seller Account
            </button>

          </div>

        )}

      </div>

    </div>
  )
}

export default Signup