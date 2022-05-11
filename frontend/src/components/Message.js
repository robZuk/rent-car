import React from "react";

function Message({ variant, children }) {
  return (
    <div className={`alert ${variant} my-4`} role="alert">
      {children}
    </div>
  );
}

Message.defaultProps = {
  variant: "alert-info",
};

export default Message;
