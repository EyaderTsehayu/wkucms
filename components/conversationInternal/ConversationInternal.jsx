import React from "react";
import Image from "next/image";

const ConversationInternal = () => {
  return (
    <div>
      <div class="flex cursor-pointer items-center rounded px-4 py-2 hover:bg-gray-2 dark:hover:bg-strokedark">
        {/* <!-- Chat List Item --> */}
        <div class="relative mr-3.5 h-11 w-full max-w-11 rounded-full">
          <Image
            width={112}
            height={112}
            src={"/images/user/user-01.png"}
            alt="profile"
            class="h-full w-full object-cover object-center"
          />
          <span class="absolute bottom-0 right-0 block h-3 w-3 rounded-full border-2 border-gray-2 bg-success"></span>
        </div>
        <div class="w-full">
          <h5 class="text-sm font-medium text-black dark:text-white">
            Henry Dholi
          </h5>
          <p class="text-sm font-medium">I cam across your profile and...</p>
        </div>
      </div>
    </div>
  );
};

export default ConversationInternal;
