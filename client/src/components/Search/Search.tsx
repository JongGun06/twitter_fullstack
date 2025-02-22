import React from "react";
import LeftSidebar from "../LeftMain/LeftSidebar";
import RightSidebar from "../RightMain/RightSidebar";
import CenterSearch from "../CenterMain/CenterSearch"
const Search: React.FC = () => {
  return (
    <div style={{display:"flex"}}>
      <div className="left-sidebar">
      <LeftSidebar />
      </div>
        <CenterSearch/>
      <div className="dn_rightblock">
        <RightSidebar />
      </div>
    </div>
  );
};

export default Search;
