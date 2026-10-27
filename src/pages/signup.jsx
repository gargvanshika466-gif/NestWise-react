import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import FormInput from "../components/FormInput";
import useForm, { validators } from "../hooks/useForm";
import { useBuyer } from "../context/BuyerContext";


// Validation rules for the buyer sign up form
function validateBuyerSignup(values) {
  return {
    name: validators.name(values.name),
    email: validators.email(values.email),
    phone: validators.phone(values.phone, true),
    password: validators.password(values.password),
    confirmPassword: validators.confirmPassword(
      values.confirmPassword,
      values.password
    )
  };
}

function Signup() {

  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const { saveBuyer } = useBuyer();

  const buyerForm = useForm({

    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: ""
    },

    validate: validateBuyerSignup,

    onSubmit(values) {

      // Saved in BuyerContext (and localStorage as "buyerData")
      saveBuyer({
        name: values.name.trim(),
        email: values.email.trim(),
        phone: values.phone.trim()
      });

      // Next step of the buyer journey: choose preferences
      navigate("/buyer");

    }

  });


  const handleSellerAccount = () => {

    navigate("/list-property");

  };


  return (
    <div className="signup-page">

        <div className="signup-left">

          <div className="signup-left-content">

            <h2 className="signup-brand">NestWise</h2>

            <h1>Join NestWise</h1>

            <p>
              Create your account and start your journey
              to finding the perfect home or listing your
              property.
            </p>

            <div className="signup-stats">

              <div className="stat-item">
                <span className="stat-number">500+</span>
                <span className="stat-label">Properties Listed</span>
              </div>

              <div className="stat-item">
                <span className="stat-number">1000+</span>
                <span className="stat-label">Happy Students</span>
              </div>

              <div className="stat-item">
                <span className="stat-number">50+</span>
                <span className="stat-label">Areas Covered</span>
              </div>

            </div>

          </div>

        </div>

        <div className="signup-right">

          <div className="signup-card">

            <div className="signup-header-icon">✨</div>

            <h1>Create Account</h1>

            <p>Choose your account type to get started</p>

            <h3>I want to...</h3>

            <div className="role-options">

              <div
                className={
                  "role-card" +
                  (role === "buyer" ? " role-active" : "")
                }
                onClick={() => setRole("buyer")}
              >

                <div className="role-icon">
                  🏠
                </div>

                <h2>Buy a Home</h2>

                <p>
                  Search and find your perfect home
                  on NestWise.
                </p>

                <button>
                  Continue as Buyer
                </button>

              </div>


              <div
                className={
                  "role-card" +
                  (role === "seller" ? " role-active" : "")
                }
                onClick={() => setRole("seller")}
              >

                <div className="role-icon">
                  🏢
                </div>

                <h2>Sell / List</h2>

                <p>
                  List your property and reach
                  thousands of students.
                </p>

                <button>
                  Continue as Seller
                </button>

              </div>

            </div>


            {role === "buyer" && (

              <form
                className="signup-form"
                onSubmit={buyerForm.handleSubmit}
                noValidate
              >

                <h2>
                  <span className="form-icon">📋</span>
                  Buyer Information
                </h2>


                <FormInput
                  icon="👤"
                  type="text"
                  placeholder="Full Name"
                  autoComplete="name"
                  {...buyerForm.getFieldProps("name")}
                />

                <FormInput
                  icon="📧"
                  type="email"
                  placeholder="Email Address"
                  autoComplete="email"
                  {...buyerForm.getFieldProps("email")}
                />

                <FormInput
                  icon="🔒"
                  type="password"
                  placeholder="Password"
                  autoComplete="new-password"
                  {...buyerForm.getFieldProps("password")}
                />

                <FormInput
                  icon="🔒"
                  type="password"
                  placeholder="Confirm Password"
                  autoComplete="new-password"
                  {...buyerForm.getFieldProps("confirmPassword")}
                />

                <FormInput
                  icon="📱"
                  type="tel"
                  placeholder="Phone Number"
                  autoComplete="tel"
                  inputMode="numeric"
                  {...buyerForm.getFieldProps("phone")}
                />


                <button
                  type="submit"
                  className="create-account-btn"
                >
                  Create Buyer Account →
                </button>

              </form>

            )}


            {role === "seller" && (

              <div className="signup-form">

                <h2>
                  <span className="form-icon">📋</span>
                  Seller Information
                </h2>

                <div className="input-group">
                  <span className="input-icon">👤</span>
                  <input
                    type="text"
                    placeholder="Full Name"
                  />
                </div>

                <div className="input-group">
                  <span className="input-icon">📧</span>
                  <input
                    type="email"
                    placeholder="Email Address"
                  />
                </div>

                <div className="input-group">
                  <span className="input-icon">🔒</span>
                  <input
                    type="password"
                    placeholder="Password"
                  />
                </div>

                <div className="input-group">
                  <span className="input-icon">🔒</span>
                  <input
                    type="password"
                    placeholder="Confirm Password"
                  />
                </div>

                <div className="input-group">
                  <span className="input-icon">📱</span>
                  <input
                    type="text"
                    placeholder="Phone Number"
                  />
                </div>

                <button
                  className="create-account-btn"
                  onClick={handleSellerAccount}
                >
                  Create Seller Account →
                </button>

              </div>

            )}

            <p className="login-redirect">
              Already have an account?
              <Link to="/login"> Login here</Link>
            </p>

          </div>

        </div>

    </div>
  );
}

export default Signup;