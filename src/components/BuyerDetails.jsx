import FormInput from "./FormInput";

/* Step 1 of the preferences form: who is searching.
   Every field comes from useForm's getFieldProps(), so the
   validation messages are handled by the reusable FormInput. */

function BuyerDetails({ getFieldProps }) {
  return (
    <div className="nw-form-card">

      <div className="nw-form-heading">
        <span>1</span>

        <div>
          <h2>Basic Details</h2>
          <p>Tell us a little about yourself.</p>
        </div>
      </div>

      <div className="nw-form-row">

        <FormInput
          label="Your Name"
          placeholder="e.g. Aarav Sharma"
          autoComplete="name"
          required
          {...getFieldProps("name")}
        />

        <FormInput
          label="Email Address"
          type="email"
          placeholder="name@example.com"
          autoComplete="email"
          required
          {...getFieldProps("email")}
        />

      </div>

      <FormInput
        label="Phone Number"
        type="tel"
        placeholder="10-digit mobile number"
        autoComplete="tel"
        inputMode="numeric"
        hint="Optional. Used only when you request a visit."
        {...getFieldProps("phone")}
      />

    </div>
  )
}

export default BuyerDetails