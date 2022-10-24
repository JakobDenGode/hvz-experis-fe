import React from "react";

function Heading({ title }) {
  return (
    <h2
      style={{
        color: "white",
        fontSize: "40px",
        fontWeight: "600",
        textAlign: "center",
        padding: "20px",
        background: "black",
      }}
    >
      {title}
    </h2>
  );
}

export default Heading;
