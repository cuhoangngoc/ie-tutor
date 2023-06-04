import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import Chat from "../../../components/chat/chat";
import Listuser from "../../../components/chat/Listuser";
import { useState, useEffect, use } from "react";
import { database } from "../../../firebase/firebaseconfig";
import { ref, set, child, get, update, push, onValue } from "firebase/database";
import Search from "../../../components/chat/search";
import { useRouter } from "next/router";
import axios from "axios";
import Messager from "../../../components/chat/messager";
import Layout from '../../../components/Layout/Layout';
const UserMessage = ({ user }) => {
  const param = useRouter();
  const { userMessage } = param.query;
  const [BackupUser, setBackupUser] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [Alluser, setAlluser] = useState([]);
  const [userInfo, setUserInfo] = useState([]);
  const [checkRoom, setCheckRoom] = useState([]);
  const [isCheckRoomCompleted, setIsCheckRoomCompleted] = useState(false);
  const [isGetUserInfoCompleted, setIsGetUserInfoCompleted] = useState(false);
  const [isCreatRoomCompleted,setIsCreatRoomCompleted]=useState(false);
  useEffect(() => {
    setAlluser(
      BackupUser.filter((data) => data.username.includes(searchValue))
    );
  }, [user, searchValue]);
  useEffect(() => {
    if (isCheckRoomCompleted && isGetUserInfoCompleted) {
      if (checkRoom.length === 0) {
        createRoom();
      }
    }
  }, [checkRoom]);
  useEffect(() => {
    getInfouser();
  }, []);
  useEffect(() => {
    getalluser();
  }, [userMessage]);

  useEffect(() => {
    if (isGetUserInfoCompleted) {
      const checkroom = () => {
        const dbRef = ref(database);
        get(child(dbRef, `conversations/`))
          .then((snapshot) => {
            if (snapshot.exists()) {
              setCheckRoom(
                Object.values(snapshot.val()).filter((data) => {
                  if (
                    (data.participants.user1 === userInfo.id &&
                      data.participants.user2 === userMessage) ||
                    (data.participants.user1 === userMessage &&
                      data.participants.user2 === userInfo.id)
                  ) {
                    return data;
                  }
                })
              );
            } else {
              console.log("No data available");
            }
            setIsCheckRoomCompleted(true);
          })
          .catch((error) => {
            console.error(error);
          });
      };
      checkroom();
    }
    // checkroom();
  }, [isGetUserInfoCompleted, userMessage]);

  const getInfouser = async () => {
    await axios
      .get(`http://localhost:8000/api/v1/user/${user.email}`)
      .then((response) => {
        setUserInfo(response.data);
        setIsGetUserInfoCompleted(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getalluser = () => {
    const dbRef = ref(database);
    onValue(
      child(dbRef, "users/"),
      (snapshot) => {
        if (snapshot.exists()) {
          setBackupUser(
            Object.values(snapshot.val()).filter(
              (data) => data.email != user.email
            )
          );
        } else {
          console.log("No data available");
        }
      },
      {
        onlyOnce: false,
      }
    );
  };
  const createRoom = async () => {
    const postData = {
      user1: userInfo.id,
      user2: userMessage,
    };
    const newPostKey = push(child(ref(database), "conversations")).key;
    const updates = {};
    updates["/conversations/" + newPostKey + "/participants"] = postData;
    setIsCreatRoomCompleted(true);
    return update(ref(database), updates);
  };

  return (
    <Layout>
    <div>
      <div className="flex flex-row ">
        <div className="w-[30%] shadow-lg">
          <div>
            <h3 className="text-4xl font-bold">Chats</h3>
          </div>
          <div className="p-2">
            <input
              type="text"
              placeholder="Search here"
              className="input-bordered input-primary input w-full max-w-xs"
              value={searchValue}
              onChange={(e) => {
                setSearchValue(e.target.value);
              }}
            />
          </div>
          <Listuser
            allUser={Alluser.length == 0 ? BackupUser : Alluser}
            currentuser={userInfo}
          ></Listuser>
        </div>
        <div className="w-full shadow-lg">
          <Messager param={userMessage} userInfo={userInfo} stateNewRoom={isCreatRoomCompleted}></Messager>
        </div>
      </div>
    </div>
    </Layout>
  );
};

export default withPageAuthRequired(UserMessage);
