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
        <h2 style={{ color: "#4A3428", fontFamily: "'Fraunces', Georgia, serif" }}>Property Not Found</h2>
        <p style={{ color: "#756A63" }}>This property does not exist.</p>
        <button
          onClick={() => navigate("/seller/properties")}
          style={{
            marginTop: "16px",
            padding: "11px 22px",
            background: "#B85C38",
            color: "#FFFDFC",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontFamily: "inherit",
            fontSize: "14px",
            fontWeight: 700,
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
