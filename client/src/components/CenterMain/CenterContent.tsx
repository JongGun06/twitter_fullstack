// CenterContent.tsx
import React, { useState } from "react";
import galery from "../../img/galery.png";
import { postApi } from "../../redux/services/PostAction";
import { useUser } from "../../firebase/UserContext";
import { IPost } from "../../redux/model/IPost";
import { userApi } from "../../redux/services/UserAction";
import CenterContentPosts from "./components_center_menu/CenterContentPosts";

const CenterContent: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [value, setValue] = useState("");
  const { user } = useUser();
  const { data: posts } = postApi.useGetPostsQuery();
  const { data: userData } = userApi.useGetUserQuery(user?.uid || "");
  const [createPost] = postApi.useCreatePostMutation();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files ? e.target.files[0] : null;
    if (selectedFile) {
      setFile(selectedFile);
      
    } else {
      console.log("No file selected");
    }
  };

  const currentDate = new Date();
  const options = {
    day: "2-digit",
    month: "long",
    year: "numeric",
  };

  const post_create = async () => {
    if (!user) {
      console.error("User not logged in");
      return;
    }

    const formData = new FormData();
    if (file) {
      formData.append("images", file);
    }
    formData.append("text", value);
    formData.append("author", user.uid);
    //@ts-ignore
    const formattedDate = currentDate.toLocaleDateString("ru-RU", options);
    formData.append("createDate", formattedDate);
    try {
      //@ts-ignore
      await createPost(formData).unwrap();
      setFile(null);
      setValue("");
    } catch (error) {
      console.error("Failed to create post:", error);
    }
  };

  return (
    <main className="center-content">
      <div
        className="for_you_block"
        style={{ display: "flex", justifyContent: "space-around" }}
      >
        <button className="active tab" style={{ fontSize: "15px" }}>
          Для вас
        </button>
        <button className="tab" style={{ fontSize: "15px" }}>
          Вы читаете
        </button>
      </div>

      <div className="container">
        {/* Поле ввода */}
        <div className="input-container">
          <textarea
            className="textarea"
            placeholder="Что происходит?!"
            rows={3}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>

        {/* Нижняя панель с кнопками */}
        <div className="controls-container">
          <label
            htmlFor="file-upload"
            style={{
              display: "inline-block",
              width: "20px",
              height: "20px",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundImage: `url(${galery})`,
              cursor: "pointer",
            }}
          >
            <input
              type="file"
              name="avatar"
              id="file-upload"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
          </label>

          <button onClick={post_create} className="publish-button">
            Опубликовать
          </button>
        </div>
      </div>
      {posts &&
        posts
          .slice()
          .reverse()
          .map((post: IPost) => (
            <CenterContentPosts post={post} userData={userData} user={user} />
          ))}
    </main>
  );
};

export default CenterContent;
