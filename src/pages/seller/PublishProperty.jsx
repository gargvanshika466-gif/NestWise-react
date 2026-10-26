import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSeller } from "../../Content/SellerContext";
import "./PublishProperty.css";

const EMPTY_FORM = {
  title: "",
  type: "",
  listingType: "rent",
  rent: "",
  salePrice: "",
  securityDeposit: "",
  description: "",
  image: "",
  city: "",
  location: "",
  address: "",
  landmark: "",
  bedrooms: "",
  bathrooms: "",
  area: "",
  furnishing: "",
  floor: "",
};

function PublishProperty({ editData = null, onEditDone = null }) {

  const navigate = useNavigate();

  const { addProperty, updateProperty } = useSeller();

  const isEdit = editData !== null;

  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState(
    editData ? { ...EMPTY_FORM, ...editData } : { ...EMPTY_FORM }
  );
  const [imagePreview, setImagePreview] = useState(
    editData ? editData.image : ""
  );

  const [errors, setErrors] = useState({});
  function handleChange(e) {

    const name = e.target.name;
    const value = e.target.value;

    setFormData({
      ...formData,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: "",
    });
  }
  function changeListingType(type) {

    setFormData({
      ...formData,
      listingType: type,
    });

    setErrors({
      ...errors,
      rent: "",
      salePrice: "",
    });
  }
  function handleImageChange(e) {

    const file = e.target.files[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();

    reader.onload = function () {

      setImagePreview(reader.result);

      setFormData({
        ...formData,
        image: reader.result,
      });

    };

    reader.readAsDataURL(file);
  }
  function validateStep1() {

    const newErrors = {};

    if (formData.title.trim() === "") {
      newErrors.title = "Property title is required.";
    }

    if (formData.type === "") {
      newErrors.type = "Property type is required.";
    }

    if (
      formData.listingType === "rent" &&
      formData.rent === ""
    ) {
      newErrors.rent = "Monthly rent is required.";
    }

    if (
      formData.listingType === "sale" &&
      formData.salePrice === ""
    ) {
      newErrors.salePrice = "Sale price is required.";
    }

    return newErrors;
  }
  function validateStep2() {

    const newErrors = {};

    if (formData.city.trim() === "") {
      newErrors.city = "City is required.";
    }

    if (formData.location.trim() === "") {
      newErrors.location = "Area / Locality is required.";
    }

    return newErrors;
  }


  function handleNext() {

    let newErrors = {};

    if (step === 1) {
      newErrors = validateStep1();
    }

    if (step === 2) {
      newErrors = validateStep2();
    }

    if (Object.keys(newErrors).length > 0) {

      setErrors(newErrors);

      return;
    }

    setErrors({});

    setStep(step + 1);
  }

  function handleBack() {

    setErrors({});

    setStep(step - 1);
  }


  function handleSaveDraft() {

    const errors = validateStep1();

    if (Object.keys(errors).length > 0) {

      setErrors(errors);
      setStep(1);

      return;
    }

    if (isEdit) {

      updateProperty(editData.id, {
        ...formData,
        status: "Draft",
      });

      if (onEditDone) {
        onEditDone();
      }

    } else {

      addProperty({
        ...formData,
        status: "Draft",
      });

    }

    navigate("/seller/properties");
  }


  
  function handlePublish() {

    const step1Errors = validateStep1();
    const step2Errors = validateStep2();

    const allErrors = {
      ...step1Errors,
      ...step2Errors,
    };

    if (Object.keys(allErrors).length > 0) {

      setErrors(allErrors);

      if (Object.keys(step1Errors).length > 0) {
        setStep(1);
      } else {
        setStep(2);
      }

      return;
    }


    if (isEdit) {

      updateProperty(editData.id, {
        ...formData,
        status: "Published",
      });

      if (onEditDone) {
        onEditDone();
      }

    } else {

      addProperty({
        ...formData,
        status: "Published",
      });

    }

    navigate("/seller/properties");
  }


  function handleCancel() {

    if (onEditDone) {

      onEditDone();

    } else {

      navigate("/seller/dashboard");

    }
  }



  return (
    <section className="publish-property">

      <div className="publish-header">

        <h1>
          {isEdit ? "Edit Property" : "Publish Property"}
        </h1>

        <p>
          {isEdit
            ? "Update your property details below."
            : "Fill in your property details and publish your listing."}
        </p>

      </div>
       {step === 1 && (

        <div className="form-section">

          <h2>Basic Information</h2>

          <div className="form-grid">


            {/* TITLE */}

            <div className="form-group full">

              <label>Property Title *</label>

              <input
                type="text"
                name="title"
                placeholder="e.g. Spacious 2BHK Apartment"
                value={formData.title}
                onChange={handleChange}
              />

              {errors.title && (
                <span className="field-error">
                  {errors.title}
                </span>
              )}

            </div>


            {/* PROPERTY TYPE */}

            <div className="form-group">

              <label>Property Type *</label>

              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
              >

                <option value="">Select Type</option>
                <option value="Apartment">Apartment</option>
                <option value="House">House</option>
                <option value="PG">PG</option>
                <option value="Studio">Studio</option>

              </select>

              {errors.type && (
                <span className="field-error">
                  {errors.type}
                </span>
              )}

            </div>


            {/* RENT / SALE */}

            <div className="form-group">

              <label>Listing Type *</label>

              <div className="listing-type-toggle">

                <button
                  type="button"
                  className={
                    formData.listingType === "rent"
                      ? "listing-type-btn listing-type-active"
                      : "listing-type-btn"
                  }
                  onClick={() => changeListingType("rent")}
                >
                  🏠 For Rent
                </button>

                <button
                  type="button"
                  className={
                    formData.listingType === "sale"
                      ? "listing-type-btn listing-type-active"
                      : "listing-type-btn"
                  }
                  onClick={() => changeListingType("sale")}
                >
                  🏷️ For Sale
                </button>

              </div>

            </div>
             {formData.listingType === "rent" ? (

              <div className="form-group">

                <label>Monthly Rent (₹) *</label>

                <input
                  type="number"
                  name="rent"
                  placeholder="e.g. 15000"
                  value={formData.rent}
                  onChange={handleChange}
                />

                {errors.rent && (
                  <span className="field-error">
                    {errors.rent}
                  </span>
                )}

              </div>

            ) : (

              <div className="form-group">

                <label>Sale Price (₹) *</label>

                <input
                  type="number"
                  name="salePrice"
                  placeholder="e.g. 8500000"
                  value={formData.salePrice}
                  onChange={handleChange}
                />

                {errors.salePrice && (
                  <span className="field-error">
                    {errors.salePrice}
                  </span>
                )}

              </div>

            )}

            {formData.listingType === "rent" && (

              <div className="form-group">

                <label>Security Deposit (₹)</label>

                <input
                  type="number"
                  name="securityDeposit"
                  placeholder="e.g. 30000"
                  value={formData.securityDeposit}
                  onChange={handleChange}
                />

              </div>

            )}
            <div className="form-group full">

              <label>Description</label>

              <textarea
                name="description"
                rows="4"
                placeholder="Describe your property..."
                value={formData.description}
                onChange={handleChange}
              />

            </div>

          </div>

        </div>

      )}



      {step === 2 && (

        <div className="form-section">

          <h2>Photos & Location</h2>

          <div className="form-grid">


            {/* IMAGE */}

            <div className="form-group full">

              <label>Property Image</label>

              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />

              {imagePreview && (

                <img
                  src={imagePreview}
                  alt="Property"
                  className="image-preview"
                />

              )}

            </div>


            {/* CITY */}

            <div className="form-group">

              <label>City *</label>

              <input
                type="text"
                name="city"
                placeholder="e.g. Ludhiana"
                value={formData.city}
                onChange={handleChange}
              />

              {errors.city && (
                <span className="field-error">
                  {errors.city}
                </span>
              )}

            </div>


            {/* LOCATION */}

            <div className="form-group">

              <label>Area / Locality *</label>

              <input
                type="text"
                name="location"
                placeholder="e.g. Model Town"
                value={formData.location}
                onChange={handleChange}
              />

              {errors.location && (
                <span className="field-error">
                  {errors.location}
                </span>
              )}

            </div>


            {/* ADDRESS */}

            <div className="form-group full">

              <label>Full Address</label>

              <input
                type="text"
                name="address"
                placeholder="Street, House No., etc."
                value={formData.address}
                onChange={handleChange}
              />

            </div>


            {/* LANDMARK */}

            <div className="form-group full">

              <label>Nearby Landmark</label>

              <input
                type="text"
                name="landmark"
                placeholder="e.g. Near Civil Hospital"
                value={formData.landmark}
                onChange={handleChange}
              />

            </div>

          </div>

        </div>

      )}



      {step === 3 && (

        <div className="form-section">

          <h2>Property Details</h2>

          <div className="form-grid">


            {/* BEDROOMS */}

            <div className="form-group">

              <label>Bedrooms</label>

              <input
                type="number"
                name="bedrooms"
                placeholder="e.g. 2"
                value={formData.bedrooms}
                onChange={handleChange}
              />

            </div>


            {/* BATHROOMS */}

            <div className="form-group">

              <label>Bathrooms</label>

              <input
                type="number"
                name="bathrooms"
                placeholder="e.g. 2"
                value={formData.bathrooms}
                onChange={handleChange}
              />

            </div>


            {/* AREA */}

            <div className="form-group">

              <label>Area (sq.ft)</label>

              <input
                type="number"
                name="area"
                placeholder="e.g. 1200"
                value={formData.area}
                onChange={handleChange}
              />

            </div>


            {/* FLOOR */}

            <div className="form-group">

              <label>Floor</label>

              <input
                type="text"
                name="floor"
                placeholder="e.g. 3rd Floor"
                value={formData.floor}
                onChange={handleChange}
              />

            </div>


            {/* FURNISHING */}

            <div className="form-group full">

              <label>Furnishing</label>

              <select
                name="furnishing"
                value={formData.furnishing}
                onChange={handleChange}
              >

                <option value="">Select Furnishing</option>
                <option value="Fully Furnished">
                  Fully Furnished
                </option>
                <option value="Semi Furnished">
                  Semi Furnished
                </option>
                <option value="Unfurnished">
                  Unfurnished
                </option>

              </select>

            </div>

          </div>

        </div>

      )}
      <div className="form-actions">

        <button
          type="button"
          className="btn-cancel"
          onClick={handleCancel}
        >
          {isEdit ? "← Cancel" : "Cancel"}
        </button>


        <div className="form-actions-right">
          {step > 1 && (

            <button
              type="button"
              className="btn-back"
              onClick={handleBack}
            >
              ← Back
            </button>

          )}


       

          {step < 3 && (

            <button
              type="button"
              className="btn-next"
              onClick={handleNext}
            >
              Next →
            </button>

          )}



          {step === 3 && (

            <>

              <button
                type="button"
                className="btn-draft"
                onClick={handleSaveDraft}
              >
                💾 Save as Draft
              </button>


              <button
                type="button"
                className="btn-publish"
                onClick={handlePublish}
              >
                 {isEdit ? "Save Changes" : "Publish Property"}
              </button>

            </>

          )}

        </div>

      </div>

    </section>
  );
}

export default PublishProperty;
