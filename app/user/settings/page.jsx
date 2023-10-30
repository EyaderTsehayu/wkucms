"use client";

import PersonalInfo from "@/components/setting/PersonalInfo";
import ChangePassword from "@/components/setting/ChangePassword";
import ChangeProfilePic from "@/components/setting/ChangeProfilePic";

const Setting = () => {
  return (
    <div className="my-12">
      <div className="mx-auto max-w-fit">
        <div className="grid grid-cols-12 gap-8">
          <PersonalInfo />
          <ChangePassword />
          <ChangeProfilePic />
        </div>
      </div>
    </div>
  );
};

export default Setting;
