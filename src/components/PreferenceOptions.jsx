/* Reusable single-choice group (property type, bedrooms, furnishing).
   Used three times on the preferences page. */

function PreferenceOptions({ title, options, value, setValue, error, required = false }) {
  return (
    <fieldset className="nw-fieldset">

      <legend>
        {title}
        {required && <span className="nw-required"> *</span>}
      </legend>

      <div className="nw-option-grid">

        {options.map((option) => (
          <label
            key={option}
            className={value === option ? "nw-option selected" : "nw-option"}
          >
            <input
              type="radio"
              name={title}
              value={option}
              checked={value === option}
              onChange={(e) => setValue(e.target.value)}
            />

            <span>{option}</span>
          </label>
        ))}

      </div>

      {error && (
        <p className="nw-error" role="alert">⚠ {error}</p>
      )}

    </fieldset>
  )
}

export default PreferenceOptions