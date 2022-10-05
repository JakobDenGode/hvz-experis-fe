import React from "react";

function Heading({ title }) {
  return (
    <h2
      style={{
        color: "#808080",
        fontSize: "40px",
        fontWeight: "600",
        textAlign: "center",
      }}
    >
      {title}
    </h2>
  );
}

export default Heading;
