import React from "react";

function Heading({ title }) {
  return (
    <h2
      className="custom-heading"
      style={{
        color: "white",
        fontSize: "40px",
        fontWeight: "600",
        textAlign: "center",
        padding: "20px",
      }}
    >
      {title}
    </h2>
  );
}

export default Heading;
