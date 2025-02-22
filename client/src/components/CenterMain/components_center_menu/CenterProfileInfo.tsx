import React, { FC } from 'react';
import { IUser } from '../../../redux/model/IUser';
import '../centerContent.css';
import home_icon from "../../../img/home_icon.png";


interface CenterProfileInfoType {
    userr: IUser | undefined
}

const CenterProfileInfo:FC<CenterProfileInfoType> = ({userr}) => {
    return (
        <div>
            <div className="profile-card">
            <div className="profile-banner" />
            <div className="profile-avatar-wrapper">
              <img
                className="profile-avatar"
                src={userr?.avatar}
                alt="Avatar"
              />
            </div>
            <div className="profile-info">
              <h2 className="profile-name">{userr?.name}</h2>
              <p className="profile-username">{userr?.email}</p>
              <div className="profile-meta">
                <span>📅 Регистрация: {userr?.registrationDate}</span>
              </div>
              <div className="profile-followers">
                <span>{userr?.subscriptions?.length} в читаемых</span>
                <span>{userr?.subscribers?.length} читателей</span>
              </div>
            </div>
            <div className="profile-tabs">
              <button className="tab active">Посты</button>
              <button className="tab">Репосты</button>
              <button className="tab">Избранное</button>
            </div>
          </div>
        </div>
    );
}

export default CenterProfileInfo;
