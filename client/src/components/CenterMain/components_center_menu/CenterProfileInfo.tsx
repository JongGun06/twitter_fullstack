import React, { FC } from 'react';
import { IUser } from '../../../redux/model/IUser';
import '../centerContent.css';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks/redux';
import { setActive } from '../../../redux/reducer/ActiveButtonProfile';
import { useNavigate } from 'react-router-dom';


interface CenterProfileInfoType {
    userr: IUser | undefined
}

const CenterProfileInfo:FC<CenterProfileInfoType> = ({userr}) => {
  const active = useAppSelector(state => state.activeSlice.active); 
  let dispatch = useAppDispatch()
  let navigate = useNavigate()

  function buttonAction(e) {
    dispatch(setActive(e.target.textContent))
  
  }
  

  function subs() {
    navigate(`/sub/${userr?.googleId}`)
  }
  function subs2() {
    navigate(`/sub2/${userr?.googleId}`)
  }


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
                <span style={{cursor:"pointer"}} onClick={subs}>{userr?.subscriptions?.length} в читаемых</span>
                <span style={{cursor:"pointer"}} onClick={subs2}>{userr?.subscribers?.length} читателей</span>
              </div>
            </div>
            <div className="profile-tabs">
              <button onClick={(e) => buttonAction(e)} className={`tab ${active === "Посты" ? "active": null}`} >Посты</button>
              <button onClick={(e) => buttonAction(e)}  className={`tab ${active === "Репосты" ? "active": null}`}>Репосты</button>
              <button onClick={(e) => buttonAction(e)}  className={`tab ${active === "Избранное" ? "active": null}`}>Избранное</button>
            </div>
          </div>
        </div>
    );
}

export default CenterProfileInfo;
