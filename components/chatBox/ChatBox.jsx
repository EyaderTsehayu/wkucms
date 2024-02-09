import React from "react";
import Image from "next/image";

const ChatBox = () => {
  return (
    <>
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
            <h5 class="font-medium text-black dark:text-white">Henry Dholi</h5>
            <p class="text-sm font-medium">Reply to message</p>
          </div>
        </div>
      </div>
      <div class="no-scrollbar max-h-full space-y-3.5 overflow-auto px-6 py-7.5">
        <div class="max-w-125">
          <p class="mb-2.5 text-sm font-medium">Andri Thomas</p>
          <div class="mb-2.5 rounded-2xl rounded-tl-none bg-gray px-5 py-3 dark:bg-boxdark-2">
            <p class="font-medium">
              I want to make an appointment tomorrow from 2:00 to 5:00pm?
            </p>
          </div>
          <p class="text-xs font-medium">1:55pm</p>
        </div>
        <div class="ml-auto max-w-125">
          <div class="mb-2.5 rounded-2xl rounded-br-none bg-primary px-5 py-3">
            <p class="font-medium text-white">
              Hello, Thomas! I will check the schedule and inform you
            </p>
          </div>
          <p class="text-right text-xs font-medium">1:55pm</p>
        </div>{" "}
      </div>
    </>
  );
};

export default ChatBox;
