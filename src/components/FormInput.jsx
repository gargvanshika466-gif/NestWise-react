import { useId } from "react";

/* =========================================================
   REUSABLE FORM FIELD

   One component for every field in the buyer flow.
   It renders a label, the control, and the error / hint text,
   and wires up the accessibility attributes.

   - text, email, number, tel, password, date ...  -> <input>
   - pass  options={[...]}                         -> <select>
   - pass  icon="📧"                               -> the icon-style
     input used on the Sign Up page
========================================================= */

function FormInput({
  label,
  name,
  type = "text",
  value,
  onChange,
  onBlur,
  error,
  hint,
  required = false,
  options,
  placeholder,
  icon,
  ...rest
}) {

  const id = useId();
  const fieldId = `${id}-${name}`;
  const messageId = `${fieldId}-message`;

  const sharedProps = {
    id: fieldId,
    name,
    value,
    onChange,
    onBlur,
    "aria-invalid": error ? "true" : "false",
    "aria-describedby": error || hint ? messageId : undefined,
    "aria-label": label ? undefined : placeholder,
    className: [icon ? "" : "nw-input", error ? "invalid" : ""]
      .filter(Boolean)
      .join(" "),
    ...rest
  };

  const control = options ? (
    <select {...sharedProps}>
      <option value="">{placeholder || "Select an option"}</option>

      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  ) : (
    <input type={type} placeholder={placeholder} {...sharedProps} />
  );

  return (
    <div className={icon ? "nw-field-wrap" : "nw-field"}>

      {label && (
        <label htmlFor={fieldId}>
          {label}
          {required && <span className="nw-required"> *</span>}
        </label>
      )}

      {icon ? (
        <div className="input-group">
          <span className="input-icon">{icon}</span>
          {control}
        </div>
      ) : (
        control
      )}

      {error ? (
        <p id={messageId} className="nw-error" role="alert">
          ⚠ {error}
        </p>
      ) : hint ? (
        <p id={messageId} className="nw-hint">{hint}</p>
      ) : null}

    </div>
  );
}

export default FormInput;