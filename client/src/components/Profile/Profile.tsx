import React from 'react';
import LeftSidebar from "../LeftMain/LeftSidebar";
import RightSidebar from "../RightMain/RightSidebar";
import CenterProfile from '../CenterMain/CenterProfile';

const Profile = () => {
    return (
        <div style={{display:"flex"}}>
      <div className="left-sidebar">
      <LeftSidebar />
      </div>
        <div className="center-content">
        <CenterProfile/>
        </div>
      <div className="dn_rightblock">
        <RightSidebar />
      </div>
    </div>
    );
}

export default Profile;
