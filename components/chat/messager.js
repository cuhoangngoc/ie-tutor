import { useEffect, useState, useRef } from "react";
import { database, storage } from "../../firebase/firebaseconfig";
import {
  ref,
  set,
  child,
  get,
  update,
  push,
  onValue,
  off,
} from "firebase/database";
import {
  ref as stref,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import EmojiPicker from "emoji-picker-react";
import { BsFillEmojiSmileFill } from "react-icons/bs";
import { AiOutlineSend } from "react-icons/ai";
import { BsFileImage } from "react-icons/bs";
import moment from "moment";
import axios from "axios";
const Messager = ({ param, userInfo, stateNewRoom }) => {
  const [message, setMessage] = useState("");
  const [appearMessage, setSppearMessage] = useState([]);
  const [Roomid, setRoomid] = useState("");
  const [inforParner, setInforParner] = useState([]);
  const [isGetRoomIdCompleted, setIsGetRoomIdCompleted] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [fileUpload, setFileupload] = useState("");
  const [linkFileUpload, setLinkFileUpload] = useState("");
  const [getKeyuserParam, setGetKeyuserParam] = useState("");
  const [testMessage, setTestMessage] = useState([]);
  const containerRef = useRef();
  console.log(inforParner)
  useEffect(() => {
    containerRef.current.scrollTop = containerRef.current.scrollHeight;
  }, [appearMessage]);
  useEffect(() => {
    getInfouser();
  }, [param]);
  const getInfouser = async () => {
    fetch(`http://localhost:8000/api/v1/userId/${param}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Can not find user with email ${user.email}`);
        }
        return response.json();
      })
      .then((data) => {
        setInforParner(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    const getKey = async () => {
      const conversationsRef = ref(database, "conversations");

      get(conversationsRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            const conversations = snapshot.val();
            const conversationKeys = Object.keys(conversations);
            conversationKeys.forEach((key) => {
              const conversation = conversations[key];
              if (conversation.participants) {
                if (
                  (conversation.participants.user1 === userInfo.id &&
                    conversation.participants.user2 === param) ||
                  (conversation.participants.user1 === param &&
                    conversation.participants.user2 === userInfo.id)
                ) {
                  setRoomid(key);
                  setIsGetRoomIdCompleted(true);
                }
              }
            });
          } else {
            console.log("No conversations available");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    };
    //getKey
    getKey();
  }, [param, userInfo, stateNewRoom]);

  useEffect(() => {
    const getkeyUserFirebase = async () => {
      const keyUserFirebase = ref(database, "users");
      get(keyUserFirebase)
        .then((snapshot) => {
          if (snapshot.exists()) {
            const Users = snapshot.val();
            const userKeys = Object.keys(Users);
            userKeys.forEach((key) => {
              const user = Users[key];
              if (user.userID == param) {
                setGetKeyuserParam(key);
              }
            });
          } else {
            console.log("No user available");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    };
    getkeyUserFirebase();
  }, [param, userInfo]);

  const SendMessager = async (message, senderid, timestamp) => {
    const postData = {
      content: message,
      sender: senderid,
      timestamp: timestamp,
    };
    const updates = {};
    updates[`/conversations/${Roomid}` + "/messages/" + timestamp] = postData;
    const chatRef = ref(database, `/conversations/${Roomid}/participants/`);
    update(chatRef, {
      lastMessage: {
        content: message,
        sender: senderid,
        timestamp: timestamp,
      },
    });
    //update timestampMessage
    const timestampMessage = ref(database, `/users/${getKeyuserParam}`);
    update(timestampMessage, {
      timestampMessage: timestamp,
    });
    return update(ref(database), updates);
  };
  // const updateIsread = () => {
  //   const messageRef = ref(database, `conversations/${Roomid}`);
  //     onValue(messageRef, (snapshot) => {
  //       if (snapshot.exists()) {
  //         console.log( Object.values(snapshot.val()))
  //       } else {
  //         console.log("No data available");
  //       }
  //     });
  //     return () => {
  //       off(messageRef);
  //     };
  // };
  // updateIsread()
  const ShowMessage = () => {
    useEffect(() => {
      if (isGetRoomIdCompleted) {
        setSppearMessage([]);
        const messageRef = ref(database, `conversations/${Roomid}/messages`);
        onValue(messageRef, (snapshot) => {
          if (snapshot.exists()) {
            setSppearMessage(Object.values(snapshot.val()));
          } else {
            console.log("No data available");
          }
        });
        return () => {
          off(messageRef);
        };
      }
    }, [Roomid]);
  };
  ShowMessage();
  //test

  //test

  const onEmojiclick = (emojiObject) => {
    setMessage(...(message + emojiObject.emoji));
    setShowPicker(false);
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      SendMessager(message, userInfo.id, Date.now());
      setMessage("");
    }
  };
  const handleFileClick = () => {
    const uploadInput = document.getElementById("uploadInput");
    uploadInput.click();
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFileupload(file.name);
    const storageRef = stref(storage, `${Roomid}/${fileUpload}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          SendMessager(downloadURL, userInfo.id, Date.now());
        });
      }
    );
  };
  const followLink = (e) => {
    e.target.value;
    window.open(event.target.innerText, "_blank");
  };
  return (
    <div className="flex h-screen w-full flex-col p-2">
      <div className="flex flex-row shadow-lg">
        {inforParner && inforParner.picture ? (
          <div className="w-20 rounded-full">
            <img src={inforParner.picture} />
          </div>
        ) : (
          <div className="placeholder avatar w-20">
            <div className="w-20 rounded-full bg-neutral-focus text-neutral-content">
              <span className="text-[10px]">{inforParner.username}</span>
            </div>
          </div>
        )}
        <div className="my-auto ml-2 text-3xl font-bold">
          {" "}
          {inforParner.username}
        </div>
        <div className="my-auto ml-2">
          <img
            className="max-h-[50px] max-w-[50px] rounded-full"
            src="https://media1.giphy.com/media/3pZipqyo1sqHDfJGtz/giphy.gif?cid=ecf05e47tzuz99j6z34muffsp1xlgef2a2hp1a6p5i21etgu&ep=v1_gifs_search&rid=giphy.gif&ct=g"
          />
        </div>
      </div>
      <div className=" relative h-full overflow-y-scroll" ref={containerRef}>
        <div className="">
          {appearMessage.map((data, key) =>
            data.sender === userInfo.id ? (
              <div className="chat chat-end" key={key}>
                <div className="chat-image avatar">
                  {userInfo.picture ? (
                    <div className="w-10 rounded-full">
                      <img src={userInfo.picture} />
                    </div>
                  ) : (
                    <div className="placeholder avatar w-10">
                      <div className="w-10 rounded-full bg-neutral-focus text-neutral-content">
                        <span className="text-[10px]">{userInfo.username}</span>
                      </div>
                    </div>
                  )}
                </div>
                <div className="chat-header">
                  Bạn
                  <time className="text-xs opacity-50">
                    {" " + moment(data.timestamp).format("YYYY-MM-DD HH:mm")}
                  </time>
                </div>
                <div className="chat-bubble">
                  {data.content.includes("https://") ? (
                    <a
                      className="cursor-pointer underline"
                      onClick={(event) => {
                        followLink(event);
                      }}
                    >
                      {data.content}
                    </a>
                  ) : (
                    data.content
                  )}
                </div>
                <div className="chat-footer opacity-50">Delivered</div>
              </div>
            ) : (
              <div className="chat chat-start" key={key}>
                <div className="chat-image avatar">
                  {inforParner.picture ? (
                    <div className="w-10 rounded-full">
                      <img src={inforParner.picture} />
                    </div>
                  ) : (
                    <div className="placeholder avatar w-10">
                      <div className="w-10 rounded-full bg-neutral-focus text-neutral-content">
                        <span className="text-[10px]">
                          {inforParner.username}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
                <div className="chat-header">
                  {inforParner.username}
                  <time className="text-xs opacity-50">
                    {" " + moment(data.timestamp).format("YYYY-MM-DD HH:mm")}
                  </time>
                </div>
                <div className="chat-bubble">
                  {data.content.includes("https://") ? (
                    <a
                      className="cursor-pointer underline"
                      onClick={(event) => {
                        followLink(event);
                      }}
                    >
                      {data.content}
                    </a>
                  ) : (
                    data.content
                  )}
                </div>
                <div className="chat-footer opacity-50">Seen</div>
              </div>
            )
          )}
        </div>
        {showPicker && (
          <div className="button-0 absolute right-0">
            <EmojiPicker onEmojiClick={onEmojiclick}></EmojiPicker>
          </div>
        )}
      </div>
      <div className="flex flex-row justify-between ">
        <input
          type="text"
          placeholder="type here"
          className="mr-6 w-full rounded-xl border border-black"
          value={message}
          onKeyDown={handleKeyDown}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        ></input>
        <BsFileImage
          className="mr-6 h-8 w-8 text-[#0084ff]"
          onClick={handleFileClick}
        ></BsFileImage>
        <input
          type="file"
          id="uploadInput"
          className="hidden"
          onChange={(e) => {
            handleFileChange(e);
          }}
        />
        <div className="items-center">
          <BsFillEmojiSmileFill
            className="mr-6 h-8  w-8 justify-self-center text-[#0084ff]"
            onClick={() => {
              setShowPicker(!showPicker);
            }}
          ></BsFillEmojiSmileFill>
        </div>
        <button
          type="submit"
          onClick={() => {
            SendMessager(message, userInfo.id, Date.now());
            setMessage("");
          }}
        >
          <AiOutlineSend className="h-8 w-8 text-[#0084ff]" />
        </button>
      </div>
    </div>
  );
};

export default Messager;
