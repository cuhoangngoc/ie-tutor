import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import Chat from "../../components/chat/chat";
import Listuser from "../../components/chat/Listuser";
import { useState, useEffect } from "react";
import { database } from "../../firebase/firebaseconfig";
import { ref, set, child, get, onValue } from "firebase/database";
import Search from "../../components/chat/search";
import axios, { all } from "axios";
import Image from "next/image";
import logo from "../../public/imgs/logo/logo-100.png";
import Layout from '../../components/Layout/Layout';
const Index = ({ user }) => {
  const [BackupUser, setBackupUser] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [Alluser, setAlluser] = useState([]);
  const [userInfo, setUserInfo] = useState([]);
  const [checkRegister, SetCheckRegister] = useState([]);
  useEffect(() => {
    setAlluser(
      BackupUser.filter((data) => data.username.includes(searchValue))
    );
  }, [user, searchValue]);

  useEffect(() => {
    getalluser();
  }, [user]);

  useEffect(() => {
    getInfouser();
  }, []);
  const getInfouser = async () => {
    await axios
      .get(`http://localhost:8000/api/v1/user/${user.email}`)
      .then((response) => {
        setUserInfo(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getalluser = () => {
    const dbRef = ref(database);
    onValue(
      child(dbRef, `users/`),
      (snapshot) => {
        if (snapshot.exists()) {
          setBackupUser(
            Object.values(snapshot.val()).filter(
              (data) => data.email != user.email
            )
          );
          SetCheckRegister(
            Object.values(snapshot.val()).filter(
              (data) => data.email == user.email
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
  return (
    <Layout>
    <div className="">
      {checkRegister.length != 0 ? (
        <div className="flex flex-row">
          <div className="w-[30%] shadow-lg">
            <div className="">
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
          <div className="m-auto h-screen w-full bg-[#f0f2f5]">
            <h2 className="text-center text-3xl font-bold">
              Select a chat or start a new conversation
            </h2>
          </div>
        </div>
      ) : (
        <div className="flex h-screen items-center justify-center">
          <div className="m-auto text-center">
            <div className="flex flex-row justify-center">
              <Image
                src={logo}
                className="w-30 mr-3 text-center "
                alt="IE Tutor Logo"
                priority
              />
            </div>
            <h2 className="my-10 text-3xl font-bold text-black">
              Connect with your favourite people
            </h2>
            <Chat currentuser={user}></Chat>
            <a className="text-[#0a7cff]">Switch accounts </a>
          </div>
        </div>
      )}
    </div>
    </Layout>
  );
};

export default withPageAuthRequired(Index);
