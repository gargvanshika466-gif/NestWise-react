import { useCallback } from "react"

import useForm, { validators, validateBudget } from "./useForm"
import { initialPreferences, useBuyer } from "../context/BuyerContext"


/* ---------- Validation for the whole preferences form ---------- */

export function validateBuyerPreferences(values) {

  const errors = {
    name: validators.name(values.name),
    email: validators.email(values.email),
    phone: validators.phone(values.phone),   // optional field
  }

  if (!values.location) errors.location = "Please choose a city."
  if (!values.type) errors.type = "Please choose a property type."
  if (!values.bhk) errors.bhk = "Please choose the number of bedrooms."

  if (values.maxBudget === "") {
    errors.maxBudget = "Maximum budget is required."
  }

  // minBudget / maxBudget range errors
  Object.assign(errors, validateBudget(values.minBudget, values.maxBudget))

  return errors
}


/* ---------- Hook used by the Buyer preferences page ----------

   - reads the saved profile + preferences from BuyerContext
   - validates with useForm
   - on a valid submit, saves everything back to BuyerContext
     and calls onSuccess() so the page can navigate to the results
*/

function useBuyerPreferences({ onSuccess } = {}) {

  const {
    buyer,
    preferences,
    saveBuyer,
    updatePreferences,
    resetPreferences: clearSavedPreferences,
  } = useBuyer()


  const form = useForm({

    initialValues: {
      name: buyer.name,
      email: buyer.email,
      phone: buyer.phone,

      location: preferences.location,
      type: preferences.type,
      bhk: preferences.bhk,
      furnishing: preferences.furnishing,
      amenities: preferences.amenities,
      minBudget: preferences.minBudget,
      maxBudget: preferences.maxBudget,
    },

    validate: validateBuyerPreferences,

    onSubmit(values) {

      saveBuyer({
        name: values.name.trim(),
        email: values.email.trim(),
        phone: values.phone.trim(),
      })

      const savedPreferences = {
        ...initialPreferences,
        location: values.location,
        type: values.type,
        bhk: values.bhk,
        furnishing: values.furnishing,
        amenities: values.amenities,
        minBudget: values.minBudget,
        maxBudget: values.maxBudget,
      }

      updatePreferences(savedPreferences)

      if (onSuccess) onSuccess(savedPreferences)
    },
  })

  const { setFieldValue, reset, values } = form


  const handleAmenityChange = useCallback((amenity) => {

    setFieldValue("amenities", (previousAmenities) =>
      previousAmenities.includes(amenity)
        ? previousAmenities.filter((item) => item !== amenity)
        : [...previousAmenities, amenity]
    )

  }, [setFieldValue])


  // Clears the search choices but keeps the buyer's own details
  const resetPreferences = useCallback(() => {

    clearSavedPreferences()

    reset({
      name: values.name,
      email: values.email,
      phone: values.phone,

      location: "",
      type: "",
      bhk: "",
      furnishing: "",
      amenities: [],
      minBudget: "",
      maxBudget: "",
    })

  }, [clearSavedPreferences, reset, values.name, values.email, values.phone])


  return {
    ...form,
    handleAmenityChange,
    resetPreferences,
  }
}

export default useBuyerPreferences