import Header from "./Header";
import SideMenu from "./SideMenu";
import React, { useState, useMemo } from "react";
import { SideBarContext } from "../../utils";

const Layout = () => {
  const [drawerWidth, setDrawerWidth] = useState(200);
  const contextValue = useMemo(
    () => ({ setDrawerWidth, drawerWidth }),
    [setDrawerWidth, drawerWidth]
  );
  return (
    <SideBarContext.Provider value={contextValue}>
      <Header />
      <SideMenu />
    </SideBarContext.Provider>
  );
};

export default Layout;
