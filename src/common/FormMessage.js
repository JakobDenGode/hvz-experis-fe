import React from "react";

function FormMessage({ children, styling }) {
  return <div className={styling}>{children}</div>;
}

export default FormMessage;
