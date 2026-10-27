/* =========================================================
   FORM HANDLING

   1. validators   - small reusable rules, each returns an
                     error message or "" when the value is fine
   2. useForm      - reusable hook that keeps values, touched
                     fields and errors for any form
========================================================= */

import { useCallback, useMemo, useState } from "react";


/* ---------- 1. Validation rules ---------- */

export const MAX_BUDGET_LIMIT = 500000;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_PATTERN = /^[6-9]\d{9}$/;
const NAME_PATTERN = /^[A-Za-z][A-Za-z\s.'-]*$/;

const text = (value) => String(value ?? "");

// Today as YYYY-MM-DD in the user's own timezone
export function todayISO(offsetDays = 0) {
  const date = new Date();
  date.setDate(date.getDate() + offsetDays);

  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${date.getFullYear()}-${month}-${day}`;
}

export const validators = {

  name(value) {
    const name = text(value).trim();

    if (!name) return "Name is required.";
    if (name.length < 2) return "Name must be at least 2 characters.";
    if (name.length > 50) return "Name must be 50 characters or fewer.";
    if (!NAME_PATTERN.test(name)) return "Name can only contain letters and spaces.";

    return "";
  },

  email(value) {
    const email = text(value).trim();

    if (!email) return "Email is required.";
    if (!EMAIL_PATTERN.test(email)) return "Enter a valid email, e.g. name@example.com.";

    return "";
  },

  // 10-digit Indian mobile number
  phone(value, required = false) {
    const phone = text(value).replace(/\s+/g, "");

    if (!phone) return required ? "Phone number is required." : "";
    if (!PHONE_PATTERN.test(phone)) return "Enter a valid 10-digit mobile number.";

    return "";
  },

  password(value) {
    const password = text(value);

    if (!password) return "Password is required.";
    if (password.length < 8) return "Password must be at least 8 characters.";
    if (!/[A-Za-z]/.test(password) || !/\d/.test(password)) {
      return "Password must contain a letter and a number.";
    }

    return "";
  },

  confirmPassword(value, password) {
    if (!text(value)) return "Please confirm your password.";
    if (value !== password) return "Passwords do not match.";

    return "";
  },

  // Visit date: required, not in the past, within the next 90 days
  visitDate(value) {
    if (!value) return "Choose a visit date.";
    if (value < todayISO()) return "The visit date cannot be in the past.";
    if (value > todayISO(90)) return "Choose a date within the next 90 days.";

    return "";
  }
};

// Returns { minBudget?, maxBudget? } - an empty object means the budget is valid
export function validateBudget(min, max) {
  const errors = {};

  if (min !== "" && (Number.isNaN(Number(min)) || Number(min) < 0)) {
    errors.minBudget = "Minimum budget must be a positive number.";
  }

  if (max !== "" && (Number.isNaN(Number(max)) || Number(max) <= 0)) {
    errors.maxBudget = "Maximum budget must be greater than zero.";
  } else if (max !== "" && Number(max) > MAX_BUDGET_LIMIT) {
    errors.maxBudget = `Maximum budget cannot exceed ₹${MAX_BUDGET_LIMIT.toLocaleString("en-IN")}.`;
  }

  if (
    !errors.minBudget && !errors.maxBudget &&
    min !== "" && max !== "" && Number(min) > Number(max)
  ) {
    errors.maxBudget = "Minimum budget cannot be greater than maximum budget.";
  }

  return errors;
}


/* ---------- 2. useForm ----------

   const form = useForm({
     initialValues: { name: "" },
     validate: (values) => ({ name: values.name ? "" : "Required" }),
     onSubmit: (values) => console.log(values)
   });

   <FormInput label="Name" {...form.getFieldProps("name")} />

   - errors are only SHOWN for a field after the user leaves it
     (touched) or after the first submit attempt
   - onSubmit only runs when there are no errors
   - "validate" must return an object like { fieldName: "message" };
     fields with no error can be left out or set to ""
*/

export default function useForm({ initialValues, validate, onSubmit }) {

  const [values, setValues] = useState(initialValues);
  const [touched, setTouched] = useState({});
  const [submitAttempted, setSubmitAttempted] = useState(false);

  // Derived on every render, so errors are never out of date
  const errors = useMemo(() => {
    const found = validate(values);

    return Object.fromEntries(
      Object.entries(found).filter(([, message]) => Boolean(message))
    );
  }, [validate, values]);

  const isValid = Object.keys(errors).length === 0;


  // For text inputs: typing does not mark the field as touched
  const handleChange = useCallback((event) => {
    const { name, value } = event.target;
    setValues((previous) => ({ ...previous, [name]: value }));
  }, []);

  const handleBlur = useCallback((event) => {
    const { name } = event.target;

    setTouched((previous) =>
      previous[name] ? previous : { ...previous, [name]: true }
    );
  }, []);

  // For pills, radios and checkboxes: value can also be an updater function
  const setFieldValue = useCallback((name, value) => {
    setValues((previous) => ({
      ...previous,
      [name]: typeof value === "function" ? value(previous[name]) : value
    }));

    setTouched((previous) =>
      previous[name] ? previous : { ...previous, [name]: true }
    );
  }, []);


  const showError = (name) =>
    touched[name] || submitAttempted ? errors[name] || "" : "";

  // Spread straight onto <FormInput />
  function getFieldProps(name) {
    return {
      name,
      value: values[name] ?? "",
      onChange: handleChange,
      onBlur: handleBlur,
      error: showError(name)
    };
  }

  function handleSubmit(event) {
    if (event) event.preventDefault();

    setSubmitAttempted(true);

    if (!isValid) return false;

    if (onSubmit) onSubmit(values);

    return true;
  }

  function reset(nextValues = initialValues) {
    setValues(nextValues);
    setTouched({});
    setSubmitAttempted(false);
  }

  return {
    values,
    errors,
    isValid,
    submitAttempted,
    getFieldProps,
    setFieldValue,
    handleChange,
    handleBlur,
    handleSubmit,
    reset
  };
}