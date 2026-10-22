import "./MyProperties.css";

function MyProperties() {
  return (
    <section className="my-properties">

      <div className="properties-header">
        <h1>My Properties</h1>

        <p>
          Manage all your listed properties from here.
        </p>
      </div>


      <div className="empty-properties">

        <h2>No Properties Listed</h2>

        <p>
          You haven't published any property yet.
        </p>

        <button>
          + Publish Your First Property
        </button>

      </div>

    </section>
  );
}

export default MyProperties;
