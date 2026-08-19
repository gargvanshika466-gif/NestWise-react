function PreferenceOptions({ title, options, value, setValue }) {
  return (
    <div className="section">
      <h3>{title}</h3>

      {options.map((option) => (
        <label key={option}>
          <input
            type="radio"
            value={option}
            checked={value === option}
            onChange={(e) => setValue(e.target.value)}
          />
          {option}
        </label>
      ))}
    </div>
  )
}

export default PreferenceOptions