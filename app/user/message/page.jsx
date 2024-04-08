"use client";

import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import ConversationInternal from "@/components/conversationInternal/ConversationInternal";
import ChatBox from "@/components/chatBox/ChatBox";
import Image from "next/image";
import { io } from "socket.io-client";
import { useSocket } from "@/context/SocketContext";
import { useSearchParams } from "next/navigation";

const Message = () => {
  const { data: session } = useSession();
  const user = session?.user;
  const scrollRef = useRef();
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [currentChat, setCurrentChat] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true); // New loading state

  const params = useSearchParams();
  const chatId = params.get("chatid");
  const member1 = params.get("member1");
  const member2 = params.get("member2");

  const socket = useSocket();
  useEffect(() => {
    if (chatId) {
      const conv = {
        _id: chatId,
        members: [member1, member2],
      };
      setCurrentChat(conv);
    }
  }, [chatId]);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const response = await fetch(`/api/conversation/${user?.id}`);
        const data = await response.json();
        setConversations(data);
        setLoading(false); // Set loading to false after conversations are fetched
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [user?.id]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        if (currentChat) {
          // Only fetch messages if currentChat exists
          const response = await fetch(`/api/message/${currentChat?._id}`);
          const data = await response.json();
          setMessages(data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const receiverId = currentChat.members.find(
      (member) => member !== user?.id
    );

    socket.emit("sendMessage", {
      senderId: user.id,
      receiverId,
      text: newMessage,
    });
    try {
      const response = await fetch("/api/message/", {
        method: "POST",
        body: JSON.stringify({
          sender: user?.id,
          text: newMessage,
          conversationId: currentChat._id,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessages([...messages, data]);
        setNewMessage("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white sm:px-14 dark:bg-black dark:border-black">
      <h1 className="mb-2 pt-8 pb-5 pl-4 font-extrabold text-4xl text-primary dark:text-white">
        Messages
      </h1>
      <div class="h-[calc(100vh-186px)] overflow-hidden sm:h-[calc(100vh-174px)] rounded-2xl">
        <div class="h-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark xl:flex">
          <div class="hidden h-full flex-col xl:flex xl:w-1/4">
            {/* ====== Chat List Start  */}
            <div class="sticky border-b border-stroke px-6 py-7.5 dark:border-strokedark">
              <h3 class="text-lg font-medium text-black dark:text-white 2xl:text-xl">
                Previous Conversations
                <span class="rounded-md border-[.5px] border-stroke bg-gray-2 px-2 py-0.5 text-base font-medium text-black dark:border-strokedark dark:bg-boxdark-2 dark:text-white 2xl:ml-4">
                  7
                </span>
              </h3>
            </div>
            <div class="flex max-h-full flex-col overflow-auto p-5">
              <form class="sticky mb-7">
                <input
                  type="text"
                  class="w-full rounded border border-stroke bg-gray-2 py-2.5 pl-5 pr-10 text-sm outline-none focus:border-primary dark:border-strokedark dark:bg-boxdark-2"
                  placeholder="Search..."
                />
                <button class="absolute right-4 top-1/2 -translate-y-1/2">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M8.25 3C5.3505 3 3 5.3505 3 8.25C3 11.1495 5.3505 13.5 8.25 13.5C11.1495 13.5 13.5 11.1495 13.5 8.25C13.5 5.3505 11.1495 3 8.25 3ZM1.5 8.25C1.5 4.52208 4.52208 1.5 8.25 1.5C11.9779 1.5 15 4.52208 15 8.25C15 11.9779 11.9779 15 8.25 15C4.52208 15 1.5 11.9779 1.5 8.25Z"
                      fill="#637381"
                    ></path>
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M11.957 11.958C12.2499 11.6651 12.7247 11.6651 13.0176 11.958L16.2801 15.2205C16.573 15.5133 16.573 15.9882 16.2801 16.2811C15.9872 16.574 15.5124 16.574 15.2195 16.2811L11.957 13.0186C11.6641 12.7257 11.6641 12.2508 11.957 11.958Z"
                      fill="#637381"
                    ></path>
                  </svg>
                </button>
              </form>
              <div class="no-scrollbar max-h-full space-y-2.5 overflow-auto">
                {/* <!-- Chat List Item --> */}
                {/* <ConversationInternal /> */}
                {conversations &&
                  conversations.map((c) => (
                    <div onClick={() => setCurrentChat(c)}>
                      <ConversationInternal
                        conversation={c}
                        currentUser={user}
                      />
                    </div>
                  ))}
              </div>
            </div>
            {/* <!-- ====== Chat List End --> */}
          </div>
          {/* {user != null && ( */}
          <div class="flex h-full flex-col border-l border-stroke dark:border-strokedark xl:w-3/4">
            {" "}
            <div class="sticky flex items-center justify-between border-b border-stroke px-6 py-4.5 dark:border-strokedark">
              <div class="flex items-center">
                <div class="mr-4.5 h-13 w-full max-w-13 overflow-hidden rounded-full">
                  <Image
                    width={112}
                    height={112}
                    src={"/images/user/user-01.png"}
                    alt="profile"
                    class="h-full w-full object-cover object-center"
                  />
                </div>
                <div>
                  <h5 class="font-medium text-black dark:text-white">
                    {user?.firstname} {user?.middlename}
                  </h5>
                  <p class="text-sm font-medium">Reply to message</p>
                </div>
              </div>
            </div>
            <div class="no-scrollbar max-h-full space-y-3.5 overflow-auto px-6 py-7.5">
              {messages.map((m) => (
                <div ref={scrollRef}>
                  {/* {console.log("sender id", m.sender)} */}
                  <ChatBox
                    message={m}
                    own={m.sender === user?.id}
                    currentUser={user}
                  />
                </div>
              ))}
            </div>
            <div class="sticky bottom-0 border-t border-stroke bg-white px-6 py-5 dark:border-strokedark dark:bg-boxdark">
              <form
                onSubmit={handleSubmit}
                class="flex items-center justify-between space-x-4.5"
              >
                <div class="relative w-full">
                  <input
                    type="text"
                    placeholder="Type something here"
                    class="h-13 w-full rounded-md border border-stroke bg-gray pl-5 pr-19 font-medium text-black placeholder-body outline-none focus:border-primary dark:border-strokedark dark:bg-boxdark-2 dark:text-white"
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  />
                </div>
                <button
                  type="submit"
                  class="flex h-13 w-full max-w-13 items-center justify-center rounded-md bg-primary text-white hover:bg-opacity-90"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M22 2L11 13"
                      stroke="white"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                    <path
                      d="M22 2L15 22L11 13L2 9L22 2Z"
                      stroke="white"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                  </svg>
                </button>
              </form>
            </div>
          </div>
          {/* )} */}
          {/* <!-- ====== Chat Box Start --> */}

          {/* <!-- ====== Chat Box End --> */}
        </div>
      </div>
    </div>
  );
};

export default Message;
