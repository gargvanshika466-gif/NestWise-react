import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="login-page">

        <div className="login-left">

          <div className="login-left-content">

            <h2 className="login-brand">NestWise</h2>

            <h1>Welcome Back!</h1>

            <p>
              Login to access your saved properties,
              preferences, and continue your home search.
            </p>

            <div className="login-features">

              <div className="login-feature">
                <span className="feature-icon">🔍</span>
                <span>Smart property matching</span>
              </div>

              <div className="login-feature">
                <span className="feature-icon">💰</span>
                <span>Budget-friendly options</span>
              </div>

              <div className="login-feature">
                <span className="feature-icon">✅</span>
                <span>Verified listings only</span>
              </div>

            </div>

          </div>

        </div>

        <div className="login-right">

          <div className="login-card">

            <div className="login-icon">🔑</div>

            <h1>Login</h1>

            <p className="login-text">
              Enter your credentials to continue
            </p>

            <form>

              <label>Email Address</label>
              <div className="input-group">
                <span className="input-icon">📧</span>
                <input
                  type="email"
                  placeholder="Enter your email"
                />
              </div>

              <label>Password</label>
              <div className="input-group">
                <span className="input-icon">🔒</span>
                <input
                  type="password"
                  placeholder="Enter your password"
                />
              </div>

              <button type="submit" className="login-submit">
                Login →
              </button>

            </form>

            <p className="signup-text">
              Don't have an account?
              <Link to="/signup"> Create one</Link>
            </p>

          </div>

        </div>

      </div>
  );
}

export default Login;