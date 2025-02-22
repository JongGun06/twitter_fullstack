import React from "react";
import LeftSidebar from "../LeftMain/LeftSidebar";
import CenterContent from "../CenterMain/CenterContent";
import RightSidebar from "../RightMain/RightSidebar";
import '../../App.css'

const Main: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-black text-white" style={{display:"flex", justifyContent:"space-between", width: "100%"}}>
      <div className="left-sidebar">
      <LeftSidebar />  
      </div>
      <CenterContent />
      <div className="dn_rightblock">
      <RightSidebar />
      </div>
    </div>
  );
};

export default Main;
