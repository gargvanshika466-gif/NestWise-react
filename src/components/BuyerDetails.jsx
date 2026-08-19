function BuyerDetails({
  name,
  email,
  setName,
  setEmail,
}) {
  return (
    <div className="buyer-card">

      <div className="section-heading">
        <span>01</span>

        <div>
          <h2>Basic Details</h2>
          <p>Tell us a little about yourself.</p>
        </div>
      </div>

      <div className="form-row">

        <div className="form-group">

          <label>Your Name</label>

          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

        </div>


        <div className="form-group">

          <label>Email Address</label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

        </div>

      </div>

    </div>
  )
}

export default BuyerDetails