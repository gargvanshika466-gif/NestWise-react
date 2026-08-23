import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ListProperty() {
    const [step, setStep] = useState(1);
    const navigate = useNavigate();

    const handleNext = () => {
        setStep(step + 1);
    };

    const handleBack = () => {
        setStep(step - 1);
    };

    const goToHome = () => {
        navigate("/");
    };

    return (
        <div className="list-property-page">

            <h1>List Your Property</h1>

            <div className="property-steps">
                <span className={step >= 1 ? "active-step" : ""}>
                    1. Basic Information
                </span>

                <span className={step >= 2 ? "active-step" : ""}>
                    2. Photos & Location
                </span>

                <span className={step >= 3 ? "active-step" : ""}>
                    3. Property Details
                </span>
            </div>

            {step === 1 && (
                <div className="property-card">

                    <h2>Basic Information</h2>

                    <label>Property Title</label>
                    <input
                        type="text"
                        placeholder="Enter property title"
                    />

                    <label>Property Type</label>
                    <select>
                        <option>Apartment</option>
                        <option>Independent House</option>
                        <option>PG</option>
                        <option>Hostel</option>
                        <option>Room</option>
                    </select>

                    <label>Monthly Rent</label>
                    <input
                        type="number"
                        placeholder="Enter monthly rent"
                    />

                    <label>Security Deposit</label>
                    <input
                        type="number"
                        placeholder="Enter security deposit"
                    />

                    <label>Description</label>
                    <textarea
                        placeholder="Describe your property"
                    ></textarea>

                    <button onClick={handleNext}>
                        Continue →
                    </button>

                </div>
            )}

            {step === 2 && (
                <div className="property-card">

                    <h2>Photos & Location</h2>

                    <label>Property Photos</label>

                    <div className="photo-upload">
                        <p>📷 Add Property Photos</p>
                        <p>Upload photos of your property</p>

                        <input type="file" />
                    </div>

                    <label>City</label>
                    <input
                        type="text"
                        placeholder="Enter city"
                    />

                    <label>Area / Locality</label>
                    <input
                        type="text"
                        placeholder="Enter area or locality"
                    />

                    <label>Address</label>
                    <input
                        type="text"
                        placeholder="Enter property address"
                    />

                    <label>Nearby Landmark</label>
                    <input
                        type="text"
                        placeholder="Example: Near Chitkara University"
                    />

                    <button onClick={handleBack}>
                        ← Back
                    </button>

                    <button onClick={handleNext}>
                        Continue →
                    </button>

                </div>
            )}

            {step === 3 && (
                <div className="property-card">

                    <h2>Property Details</h2>

                    <label>Bedrooms</label>
                    <input
                        type="number"
                        placeholder="Number of bedrooms"
                    />

                    <label>Bathrooms</label>
                    <input
                        type="number"
                        placeholder="Number of bathrooms"
                    />

                    <label>Balconies</label>
                    <input
                        type="number"
                        placeholder="Number of balconies"
                    />

                    <label>Area (sq.ft.)</label>
                    <input
                        type="number"
                        placeholder="Example: 1200"
                    />

                    <label>Furnishing</label>
                    <select>
                        <option>Fully Furnished</option>
                        <option>Semi Furnished</option>
                        <option>Unfurnished</option>
                    </select>

                    <label>Floor</label>
                    <input
                        type="text"
                        placeholder="Example: 2nd Floor"
                    />

                    <button onClick={handleBack}>
                        ← Back
                    </button>

                    <button onClick={handleNext}>
                        Publish Property
                    </button>

                </div>
            )}

            {step === 4 && (
                <div className="property-published">

                    <div className="success-icon">
                        ✓
                    </div>

                    <h2>Property Published!</h2>

                    <p>
                        Your property is now live and visible to students.
                    </p>

                    <button>
                        View My Listing
                    </button>

                    <button onClick={goToHome}>
                        Go to Dashboard
                    </button>

                </div>
            )}

        </div>
    );
}

export default ListProperty;