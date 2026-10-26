import { useParams, useNavigate } from "react-router-dom";
import { useSeller } from "../../Content/SellerContext";
import PublishProperty from "./PublishProperty";

function EditProperty() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { properties } = useSeller();

  const property = properties.find((p) => String(p.id) === String(id));

  if (!property) {
    return (
      <section style={{ padding: "40px", textAlign: "center" }}>
        <h2 style={{ color: "#2d2d4e" }}>Property Not Found</h2>
        <p style={{ color: "#777" }}>This property does not exist.</p>
        <button
          onClick={() => navigate("/seller/properties")}
          style={{
            marginTop: "16px",
            padding: "10px 22px",
            background: "#7c5ac7",
            color: "white",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            fontFamily: "inherit",
            fontSize: "14px",
          }}
        >
          ← Back to My Properties
        </button>
      </section>
    );
  }

  return (
    <PublishProperty
      editData={property}
      onEditDone={() => navigate("/seller/properties")}
    />
  );
}

export default EditProperty;
