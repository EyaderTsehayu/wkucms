"use client";
import { useState, useRef, useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { rejectReasonSchema } from "@/validations/registrationValidation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";

const RejectionMessageBox = ({ selectedUser }) => {
  const { data: session } = useSession();
  const user = session?.user;
  const receiverId = selectedUser[0]?._userId;
  //console.log("user in rejection session", user);
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
    setValue,
  } = useForm({ resolver: yupResolver(rejectReasonSchema) });
  const dropdownRef = useRef(null);
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [newMessage, setNewMessage] = useState("");

  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // useEffect(() => {
  //   const getConversations = async () => {
  //     try {
  //       const response = await fetch(`/api/conversation/${user?.userId}`);
  //       const data = await response.json();
  //       setConversations(data);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   getConversations();
  // }, [user?.id]);

  // console.log("conversations normal", conversations);
  // const filteredConversations = conversations.filter((conversation) => {
  //   console.log("Members array for conversation:", conversation.members);
  //   return conversation.members.includes(receiverId);
  // });
  // console.log("conversations filtered", filteredConversations);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const response = await fetch(`/api/conversation/${user?.id}`);
        const data = await response.json();
        setConversations(data);
      } catch (err) {
        console.log(err);
      }
    };

    getConversations();
  }, [user?.id]);

  useEffect(() => {
    if (conversations.length > 0) {
      // Filter conversations based on receiverId
      const filteredConversations = conversations.filter((conversation) => {
        console.log("Members array for conversation:", conversation.members);
        return conversation.members.includes(receiverId);
      });

      //console.log("conversations filtered", filteredConversations);

      if (filteredConversations.length > 0) {
        // Set the first filtered conversation as the current chat
        setCurrentChat(filteredConversations[0]);
      } else {
        // Create a new conversation and set it as the current chat
        // Your logic to create a new conversation goes here
        // ...
        // After creating the conversation, fetch conversations again
        // getConversations();
      }
    }
  }, [conversations, receiverId]);

  // Now you can use 'currentChat' in other useEffects or parts of your component
  // ...
  useEffect(() => {
    const getMessages = async () => {
      try {
        const response = await fetch(`/api/message/${currentChat?._id}`);
        const data = await response.json();
        setMessages(data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  // console.log("messages inside the current chat", messages);
  const onSubmit = async (data) => {
    // const receiverId = currentChat.members.find(
    //   (member) => member !== user?.id
    // );
    // socket.current.emit("sendMessage", {
    //   senderId: user.id,
    //   receiverId,
    //   text: newMessage,
    // });
    try {
      const response = await fetch("/api/message/", {
        method: "POST",
        body: JSON.stringify({
          sender: user?.id,
          text: data.rejectionReason,
          conversationId: currentChat._id,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessages([...messages, data]);
        console.log("rejected successfully");
        reset();
      }
    } catch (error) {
      console.log(error);
    }
    //console.log("data from rejection", data.rejectionReason);
  };

  return (
    <div class="w-full max-w-142.5 rounded-lg bg-white py-6 px-6  dark:bg-boxdark md:py-8 md:px-8.5">
      <div className="flex flex-row place-content-between justify-center items-center">
        <div className="flex flex-col items-center ">
          <h3 className="pb-2  text-center text-lg font-bold text-black dark:text-white sm:text-2xl">
            Rejection reason
          </h3>
          <span class="mx-auto mb-6 inline-block h-1 w-22.5 rounded bg-primary"></span>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-2 flex flex-col gap-5.5 sm:flex-row">
          <div className="w-full ">
            <textarea
              className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
              type="text"
              name="rejectionReason"
              id="rejectionReason"
              cols="40"
              rows="5"
              placeholder="write you reason here ..."
              {...register("rejectionReason")}
            />
            <p>{errors.rejectionReason?.message}</p>
          </div>
        </div>

        <div class="-mx-3 mt-4 flex flex-wrap gap-y-4">
          <div class="w-full px-3 2xsm:w-1/2">
            <button
              type="submit"
              class="block w-full rounded border border-primary bg-primary p-3 text-center font-medium text-white transition hover:bg-opacity-90"
            >
              Send
            </button>
          </div>

          <div class="w-full px-3 2xsm:w-1/2">
            <button class="block w-full rounded border border-stroke bg-gray p-3 text-center font-medium text-black transition hover:border-meta-1 hover:bg-meta-1 hover:text-white dark:border-strokedark dark:bg-meta-4 dark:text-white dark:hover:border-meta-1 dark:hover:bg-meta-1">
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
export default RejectionMessageBox;
