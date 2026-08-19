function Login() {
  return (
    <div className="login-page">

      <div className="login-card">

        <h1>Welcome Back</h1>

        <p className="login-text">
          Login to continue to NestWise
        </p>

        <form>

          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
          />

          <button type="submit" className="login-submit">
            Login
          </button>

        </form>

        <p className="signup-text">
          Don't have an account?
          <span> Sign Up</span>
        </p>

      </div>

    </div>
  )
}

export default Login