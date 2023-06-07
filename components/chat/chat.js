import { use, useEffect, useState } from "react";
import { database } from "../../firebase/firebaseconfig";
import { ref, set, child, get,push } from "firebase/database";
import axios from "axios";
const Chat = ({ currentuser }) => {
  const [userInfo, setUserInfo] = useState([]);
  useEffect(() => {
    getInfouser();
  }, []);
  const getInfouser = async () => {
    await axios
      .get(`http://localhost:8000/api/v1/user/${currentuser.email}`)
      .then((response) => {
        setUserInfo(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const participate= async(userid,username,email)=>{
    push(ref(database, `users/`), {
      username: username,
      userID:userid,
      email: email,
      status:1,
      timestampMessage:"0",
    });
  }
  return (
    <div className="">
      <button type="submit" className="bg-[#0a7cff] text-white rounded-full py-4 px-8 hover:bg-[#4d4cff]  transition-colors" onClick={()=>{participate(userInfo.id,userInfo.username,userInfo.email)}}>Tham gia chat</button>
    </div>
  );
};

export default Chat;
