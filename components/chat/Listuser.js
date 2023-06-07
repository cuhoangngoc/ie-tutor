import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useEffect, useState } from "react";
import { ref, set, child, get, onValue, off } from "firebase/database";
import { database } from "../../firebase/firebaseconfig";
const Listuser = ({ allUser, currentuser }) => {
  const [lastmessage, setLastmessage] = useState([]);
  const ShowMessage = () => {
    useEffect(() => {
      setLastmessage([]);
      const messageRef = ref(database, `conversations/`);
      onValue(messageRef, (snapshot) => {
        if (snapshot.exists()) {
          setLastmessage(Object.values(snapshot.val()));
        } else {
          console.log("No data available");
        }
      });
      return () => {
        off(messageRef);
      };
    }, [allUser]);
  };
  ShowMessage();
  return (
    <div className="h-screen overflow-y-scroll p-2">
      {allUser.length > 0 ? (
        allUser.sort((a, b) => {
          if (a.timestampMessage == "") {
            a.timestampMessage = "0";
          }
          if (b.timestampMessage == "") {
            b.timestampMessage = "0";
          }
          return b.timestampMessage - a.timestampMessage;
        }) &&
        allUser.map((data, key) => (
          <Link key={key} href={`/chat/t/${data.userID}`}>
            <div className="relative mt-2 flex flex-row rounded-md hover:bg-slate-400 p-2">
              {/* <div className="avatar mr-2"> */}
  
                  <div className=" rounded-full bg-neutral-focus text-neutral-content w-20 h-20 text-center mr-2" >
                    <span className="text-[10px] ">{data.username}</span>
                  </div>
              
                {/* <div className="placeholder w-24 ">
                 
                </div> */}
              {/* </div> */}
              <div className="my-auto">
                <h3 className="font-bold">{data.username}</h3>
                {lastmessage.map((dataend, key) =>
                  (dataend.participants.user1 == data.userID &&
                    dataend.participants.user2 == currentuser.id) ||
                  (dataend.participants.user1 == currentuser.id &&
                    dataend.participants.user2 == data.userID) ? (
                    dataend.participants.lastMessage ? (
                      dataend.participants.lastMessage.sender ==
                      currentuser.id ? (
                        <p key={key}>
                          You:{" "}
                          {dataend.participants.lastMessage.content.length > 20
                            ? dataend.participants.lastMessage.content.slice(
                                0,
                                20
                              ) + "..."
                            : dataend.participants.lastMessage.content}
                        </p>
                      ) : (
                        <p key={key}>
                          {dataend.participants.lastMessage.content.length > 20
                            ? dataend.participants.lastMessage.content.slice(
                                0,
                                20
                              ) + "..."
                            : dataend.participants.lastMessage.content}
                        </p>
                      )
                    ) : (
                      <p key={key}></p>
                    )
                  ) : (
                    <p key={key}></p>
                  )
                )}
              </div>
              {/* <div className="absolute right-0 text-end">
                {data.status == 1 ? (
                  <div className="m-auto h-3 w-3  rounded-full bg-[#31c100] text-center"></div>
                ) : (
                  <div className="m-auto h-3 w-3  rounded-full bg-slate-300 text-end"></div>
                )}
              </div> */}
            </div>
          </Link>
        ))
      ) : (
        <div>Waiting</div>
      )}
    </div>
  );
};

export default Listuser;
