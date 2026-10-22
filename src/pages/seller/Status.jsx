import "./Status.css";

function Status() {
  return (
    <section className="property-status">

      <div className="status-header">
        <h1>Property Status</h1>

        <p>
          Track the status of your listed properties.
        </p>
      </div>


      <div className="status-cards">

        <div className="status-card">
          <h3>Published</h3>
          <p>0 Properties</p>
        </div>

        <div className="status-card">
          <h3>Pending</h3>
          <p>0 Properties</p>
        </div>

        <div className="status-card">
          <h3>Draft</h3>
          <p>0 Properties</p>
        </div>

      </div>

    </section>
  );
}

export default Status;
