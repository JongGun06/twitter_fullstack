import React from 'react';
import  './bookmark.css';
import LeftSidebar from '../LeftMain/LeftSidebar';
import CenterBookmark from './CenterBookmark';
import RightSidebar from '../RightMain/RightSidebar';

const Bookmark = () => {
    return (
        <div style={{display:"flex"}}>
            <div className="left-sidebar">
                <LeftSidebar />
            </div>
            <div style={{width:"30rem", marginRight:"1rem", marginLeft:"1rem"}}>
            <CenterBookmark/>
            </div>
            <div className="dn_rightblock">
                <RightSidebar />
            </div>
        </div>
    );
}

export default Bookmark;
