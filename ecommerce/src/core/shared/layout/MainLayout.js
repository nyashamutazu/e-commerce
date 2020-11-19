import React from "react";

const MainLayout = ({
  title = "Title",
  description = "Descripton",
  className,
  children
}) => (<div>
    <div className="banner">
        <h2 className="h2">{title}</h2>
        <p>{description}</p>
    </div>
    <div className={className}>{children}</div>
</div>);

export default MainLayout;
