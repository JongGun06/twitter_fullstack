import React from 'react';
import RightSidebar from '../RightMain/RightSidebar';
import LeftSidebar from '../LeftMain/LeftSidebar';
import ProfileOtherUsers from '../CenterMain/ProfileOtherUsers';

const ProfileUserOther = () => {
    return (
        <div>
      
    <div style={{display:"flex"}}>
      <div className="left-sidebar">
      <LeftSidebar />
      </div>
        <ProfileOtherUsers/>
      <div className="dn_rightblock">
        <RightSidebar />
      </div>
    
        </div>
        </div>
    );
}

export default ProfileUserOther;
