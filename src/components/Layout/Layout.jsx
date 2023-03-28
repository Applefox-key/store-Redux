import React from "react";
import Filters from "../Filters/Filters";
import Items from "../Items/Items";

function Layout() {
  return (
    <div className="content">
      <Filters />
      <Items />
    </div>
  );
}

export default Layout;
