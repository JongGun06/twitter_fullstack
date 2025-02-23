import React, { useState } from "react";
import galery from "../../img/galery.png";
import { chatApi } from "../../redux/services/ChatAction";
import sendicon from '../../img/sendicon.png'
import './message.css'
import { useAppSelector } from "../../redux/hooks/redux";

const CreateMessage = ({ user }) => {
  const [file, setFile] = useState<File | null>(null);
  const messageInfo = useAppSelector(state => state.messageSlice.messageInfo);
  const [value, setValue] = useState<string>('');
  let [createChat] = chatApi.useCreateMessageMutation();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files ? e.target.files[0] : null;
    if (selectedFile) {
      setFile(selectedFile);
    } else {
      console.log("No file selected");
    }
  };

  const currentDate = new Date();
  const options: { day: string; month: string; year: string } = {
    day: "2-digit",
    month: "long",
    year: "numeric",
  };
  const post_create = async () => {
    const formData = new FormData();
    if (file) {
      formData.append("img", file);     
    }
    //@ts-ignore
    formData.append("text", value === '' ? '1' : value);
    formData.append("idd", messageInfo);  
    formData.append("author", user);
    //@ts-ignore
    const formattedDate = currentDate.toLocaleDateString("ru-RU", options);
    formData.append("createDate", formattedDate);
    try {
      //@ts-ignore
      await createChat(formData).unwrap();
      setFile(null)
      setValue('')
    } catch (error) {
      console.log("Failed to create post:", error);
    }
  };
  
  

  return (
    <div style={{position:"fixed",bottom:"5%"}}>
      <div className="sendmessage">
      <img style={{width:"1.5rem",cursor:"pointer"}} src={sendicon} onClick={post_create}/>
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
        <input placeholder="напишите сообщение" value={value} type="text" onChange={(e) => setValue(e.target.value)} />

        
      </div>
    </div>
  );
};

export default CreateMessage;
