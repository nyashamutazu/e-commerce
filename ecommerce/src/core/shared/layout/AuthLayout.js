import React from "react";

const AuthLayout = ({ title = "Authentication", className, children }) => (
  <div>
    <div className="layout__column layout__column--2">
      <div className="layout__row">
        <h2 className="h2">{title}</h2>
        <div className={className}>{children}</div>
      </div>
    </div>
  </div>
);

export default AuthLayout;
