import React, { useState, useEffect } from "react";
import LeftSidebar from "../LeftMain/LeftSidebar";
import RightSidebar from "../RightMain/RightSidebar";
import { useParams } from "react-router-dom";
import { userApi } from "../../redux/services/UserAction";
import "./sub.css";

const Subscribe = () => {
  const { id } = useParams();
  const { data: currentUser, isLoading: isCurrentUserLoading } = userApi.useGetUserQuery(id ?? "");

  const [targetUserId, setTargetUserId] = useState(""); 
  const { data: targetUser, isLoading: isTargetUserLoading } = userApi.useGetUserQuery(targetUserId, {
    skip: !targetUserId,
  });

  const [updateUser] = userApi.useUpdateUserMutation();
  const [isUnsubscribing, setIsUnsubscribing] = useState(false);

  const handleUnsubscribe = (userToUnsubscribe) => {
    if (!currentUser || isCurrentUserLoading) return;
    setTargetUserId(userToUnsubscribe.user); 
    setIsUnsubscribing(true);
  };

  useEffect(() => {
    const performUnsubscribe = async () => {
      if (!currentUser || !targetUser || isTargetUserLoading) return;

      try {
        const updatedSubscriptions = currentUser.subscriptions && currentUser.subscriptions.filter(
          (sub) => sub.user !== targetUser.googleId 
        );
        await updateUser({
          _id: currentUser._id,
          subscriptions: updatedSubscriptions,
        });

        const updatedSubscribers = targetUser.subscribers && targetUser.subscribers.filter(
          (sub) => sub.user !== currentUser.googleId 
        );
        await updateUser({
          _id: targetUser._id,
          subscribers: updatedSubscribers,
        });
      } catch (error) {
        console.error("Ошибка при отписке:", error);
      } finally {
        setIsUnsubscribing(false);
        setTargetUserId(""); 
      }
    };

    if (targetUserId && !isTargetUserLoading) {
      performUnsubscribe();
    }
  }, [targetUserId, targetUser, isTargetUserLoading, currentUser, updateUser]);

  if (isCurrentUserLoading) return <div>Загрузка...</div>;

  return (
    <div style={{ display: "flex" }}>
      <div className="left-sidebar">
        <LeftSidebar />
      </div>
      <div
        style={{
          width: "30rem",
          marginRight: "1rem",
          marginLeft: "1rem",
          marginTop: "1.5rem",
        }}
      >
        {currentUser?.subscriptions?.map((user) => (
          <div
            key={user._id}
            className="subscriptions"
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "10px",
              marginTop: "15px",
              marginBottom: "15px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <img
                style={{ width: "3.2rem", borderRadius: "50%" }}
                src={user.avatar}
                alt={user.name}
              />
              <p>{user.name}</p>
            </div>
            <button
              onClick={() => handleUnsubscribe(user)}
              disabled={isUnsubscribing || isTargetUserLoading}
            >
              {isUnsubscribing || isTargetUserLoading ? "Отписка..." : "Отписаться"}
            </button>
          </div>
        ))}
      </div>
      <div className="dn_rightblock">
        <RightSidebar />
      </div>
    </div>
  );
};

export default Subscribe;