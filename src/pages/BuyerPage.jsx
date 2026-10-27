import { useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import BuyerDetails from "../components/BuyerDetails";
import FormInput from "../components/FormInput";
import PreferenceOptions from "../components/PreferenceOptions";
import Amenities from "../components/Amenities";
import PreferenceSummary from "../components/PreferenceSummary";

import useBuyerPreferences from "../hooks/useBuyerPreferences";
import { preferencesToParams, useBuyer } from "../context/BuyerContext";
import { fetchProperties } from "../store/buyerStore";

import {
  PROPERTY_TYPES,
  BHK_OPTIONS,
  FURNISHING_OPTIONS,
  AMENITY_OPTIONS
} from "../store/propertiesApi";


/* =========================================================
   BUYER PREFERENCES PAGE   (route: /buyer)

   Step 2 of the buyer journey:
     Sign Up  ->  Preferences (this page)  ->  Results

   - form handling : useForm + reusable FormInput / PreferenceOptions
   - global state  : buyer + preferences come from BuyerContext,
                     the city list comes from the Redux store
   - async state   : the cities load from the (mock) API with
                     loading and error handling
   - navigation    : on submit we navigate to /results with the
                     search written into the URL
========================================================= */

function BuyerPage() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { firstName } = useBuyer();

  const { items, status, error } = useSelector((state) => state.properties);

  const form = useBuyerPreferences({
    onSuccess: (preferences) =>
      navigate(`/results?${preferencesToParams(preferences)}`)
  });

  const { values, errors, getFieldProps, setFieldValue } = form;


  useEffect(() => {
    document.title = "NestWise | Your Preferences";
  }, []);

  // Load the cities once (the Results page shares the same data)
  useEffect(() => {
    if (status === "idle") dispatch(fetchProperties());
  }, [status, dispatch]);

  const cities = useMemo(
    () => [...new Set(items.map((property) => property.location))],
    [items]
  );

  const failedFieldCount = Object.keys(errors).length;


  return (

    <div className="nw-prefs">

      <header className="nw-prefs-head">

        <h1>
          {firstName
            ? `Welcome ${firstName}, let's find your home`
            : "Find Your Perfect Home"}
        </h1>

        <p>
          Tell us what you are looking for and we will show you the
          best matches.
        </p>

      </header>


      <div className="nw-prefs-layout">

        <form
          className="nw-prefs-form"
          onSubmit={form.handleSubmit}
          noValidate
        >

          <BuyerDetails getFieldProps={getFieldProps} />


          {/* Location + budget */}

          <div className="nw-form-card">

            <div className="nw-form-heading">
              <span>2</span>

              <div>
                <h2>Location &amp; Budget</h2>
                <p>Where do you want to live and what can you spend?</p>
              </div>
            </div>

            <FormInput
              label="Preferred City"
              options={cities}
              placeholder={
                status === "loading" || status === "idle"
                  ? "Loading cities..."
                  : "Select a city"
              }
              disabled={status !== "succeeded"}
              required
              {...getFieldProps("location")}
            />

            {status === "failed" && (
              <div className="nw-banner nw-banner-error" role="alert">
                <span>{error}</span>

                <button
                  type="button"
                  onClick={() => dispatch(fetchProperties())}
                >
                  Retry
                </button>
              </div>
            )}

            <div className="nw-form-row">

              <FormInput
                label="Minimum Budget (₹ / month)"
                type="number"
                min="0"
                placeholder="e.g. 10000"
                {...getFieldProps("minBudget")}
              />

              <FormInput
                label="Maximum Budget (₹ / month)"
                type="number"
                min="0"
                placeholder="e.g. 30000"
                required
                {...getFieldProps("maxBudget")}
              />

            </div>

          </div>


          {/* Property type, bedrooms, furnishing */}

          <div className="nw-form-card">

            <div className="nw-form-heading">
              <span>3</span>

              <div>
                <h2>Type of Home</h2>
                <p>Pick the kind of place that suits you.</p>
              </div>
            </div>

            <PreferenceOptions
              title="Property Type"
              options={PROPERTY_TYPES}
              value={values.type}
              setValue={(value) => setFieldValue("type", value)}
              error={getFieldProps("type").error}
              required
            />

            <PreferenceOptions
              title="Bedrooms"
              options={BHK_OPTIONS}
              value={values.bhk}
              setValue={(value) => setFieldValue("bhk", value)}
              error={getFieldProps("bhk").error}
              required
            />

            <PreferenceOptions
              title="Furnishing"
              options={FURNISHING_OPTIONS}
              value={values.furnishing}
              setValue={(value) => setFieldValue("furnishing", value)}
            />

          </div>


          <Amenities
            amenities={AMENITY_OPTIONS}
            selectedAmenities={values.amenities}
            onAmenityChange={form.handleAmenityChange}
          />


          {form.submitAttempted && failedFieldCount > 0 && (
            <div className="nw-banner nw-banner-error" role="alert">
              <span>
                Please fix {failedFieldCount}{" "}
                {failedFieldCount === 1 ? "field" : "fields"} highlighted above.
              </span>
            </div>
          )}


          <div className="nw-form-actions">

            <button type="submit" className="nw-btn nw-btn-primary">
              Find My Home →
            </button>

            <button
              type="button"
              className="nw-btn nw-btn-ghost"
              onClick={form.resetPreferences}
            >
              Clear preferences
            </button>

          </div>

          <p className="nw-skip">
            Not ready yet? <Link to="/results">Browse all homes</Link>
          </p>

        </form>


        <PreferenceSummary
          name={values.name}
          location={values.location}
          propertyType={values.type}
          bhk={values.bhk}
          minBudget={values.minBudget}
          maxBudget={values.maxBudget}
          furnishing={values.furnishing}
          selectedAmenities={values.amenities}
        />

      </div>

    </div>

  );
}

export default BuyerPage;