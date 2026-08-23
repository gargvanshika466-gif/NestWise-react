import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Signup() {

  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const [buyer, setBuyer] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: ""
  });


  function handleBuyerChange(e) {

    setBuyer({
      ...buyer,
      [e.target.name]: e.target.value
    });

  }


  function handleBuyerSignup(e) {

    e.preventDefault();


    if (
      !buyer.name ||
      !buyer.email ||
      !buyer.password ||
      !buyer.confirmPassword ||
      !buyer.phone
    ) {

      alert("Please fill all details.");
      return;

    }


    if (
      buyer.password !==
      buyer.confirmPassword
    ) {

      alert("Passwords do not match.");
      return;

    }


    localStorage.setItem(
      "buyerData",
      JSON.stringify({
        name: buyer.name,
        email: buyer.email,
        phone: buyer.phone
      })
    );


    navigate("/results");

  }


  const handleSellerAccount = () => {

    navigate("/list-property");

  };


  return (

    <div className="signup-page">

      <div className="signup-card">

        <h1>Create Account</h1>

        <p>Join NestWise today</p>

        <h3>Choose your account type</h3>


        <div className="role-options">


          <div className="role-card">

            <div className="role-icon">
              🏠
            </div>

            <h2>Buyer</h2>

            <p>
              Find your perfect home on NestWise.
            </p>

            <button
              onClick={() => setRole("buyer")}
            >
              Continue as Buyer
            </button>

            <p className="login-text">
              Already have an account?
              <Link to="/login"> Login</Link>
            </p>

          </div>


          <div className="role-card">

            <div className="role-icon">
              🏢
            </div>

            <h2>Seller</h2>

            <p>
              List your property on NestWise.
            </p>

            <button
              onClick={() => setRole("seller")}
            >
              Continue as Seller
            </button>

          </div>

        </div>


        {role === "buyer" && (

          <form
            className="signup-form"
            onSubmit={handleBuyerSignup}
          >

            <h2>Buyer Information</h2>


            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={buyer.name}
              onChange={handleBuyerChange}
            />


            <input
              type="email"
              name="email"
              placeholder="Email"
              value={buyer.email}
              onChange={handleBuyerChange}
            />


            <input
              type="password"
              name="password"
              placeholder="Password"
              value={buyer.password}
              onChange={handleBuyerChange}
            />


            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={buyer.confirmPassword}
              onChange={handleBuyerChange}
            />


            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={buyer.phone}
              onChange={handleBuyerChange}
            />


            <button
              type="submit"
              className="create-account-btn"
            >
              Create Buyer Account
            </button>

          </form>

        )}


        {role === "seller" && (

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

  );
}

export default Signup;