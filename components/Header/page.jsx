import Link from "next/link";
import DarkModeSwitcher from "./DarkModeSwitcher";
import DropdownMessage from "./DropdownMessage";
import DropdownNotification from "./DropdownNotification";
import DropdownUser from "./DropdownUser";
import Image from "next/image";

import { usePathname } from "next/navigation";

const Header = (props) => {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-999 flex w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
      <div className="flex flex-grow items-center justify-between px-4 py-2 shadow-2 md:px-6 2xl:px-11">
        <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
          {/* <!-- Hamburger Toggle BTN --> */}

          <button
            aria-controls="sidebar"
            onClick={(e) => {
              e.stopPropagation();
              props.setSidebarOpen(!props.sidebarOpen);
            }}
            className="z-99999 block rounded-sm border border-stroke bg-white p-1.5 shadow-sm dark:border-strokedark dark:bg-boxdark lg:hidden"
          >
            <span className="relative block h-5.5 w-5.5 cursor-pointer">
              <span className="du-block absolute right-0 h-full w-full">
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-[0] duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && "!w-full delay-300"
                  }`}
                ></span>
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-150 duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && "delay-400 !w-full"
                  }`}
                ></span>
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-200 duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && "!w-full delay-500"
                  }`}
                ></span>
              </span>
              <span className="absolute right-0 h-full w-full rotate-45">
                <span
                  className={`absolute left-2.5 top-0 block h-full w-0.5 rounded-sm bg-black delay-300 duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && "!h-0 !delay-[0]"
                  }`}
                ></span>
                <span
                  className={`delay-400 absolute left-0 top-2.5 block h-0.5 w-full rounded-sm bg-black duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && "!h-0 !delay-200"
                  }`}
                ></span>
              </span>
            </span>
          </button>

          {/* <!-- Hamburger Toggle BTN --> */}

          <Link className="block flex-shrink-0 lg:hidden" href="/">
            <Image
              width={40}
              height={40}
              src={"/images/logo/logo.png"}
              alt="Logo"
            />
          </Link>
          <h5 className="text-md font-semibold text-primary pl-1 lg:hidden">
            WKUCMS
          </h5>
        </div>

        {(pathname == "/user" || pathname.includes("/user")) && (
          <div className="flex flex-row gap-6 items-center">
            <Link className=" flex-shrink-0 lg:block hidden" href="/">
              <Image
                width={50}
                height={50}
                src={"/images/logo/logo.png"}
                alt="Logo"
              />
            </Link>
            <h5 className="text-lg font-semibold text-primary lg:block hidden">
              WKU-CMS
            </h5>
          </div>
        )}
        <div className="hidden "></div>
        <div className="flex items-center gap-3 2xsm:gap-7 ">
          <ul className="flex items-center gap-2 2xsm:gap-4">
            {(pathname == "/user" || pathname.includes("/user")) && (
              <div className="hidden lg:block">
                <div className="flex items-center gap-5 ">
                  <Link
                    className={` text-lg font-semibold border-primary bg-transparent py-1 px-3 text-primary transition-all hover:border hover:border-primary hover:rounded-full text-center font-inter flex items-center justify-center dark:text-bodydark1 dark:text-md ${
                      pathname === "/user" &&
                      "py-1 px-3 transition-all border border-primary rounded-full"
                    }`}
                    href="/user"
                  >
                    Home
                  </Link>
                  <Link
                    className={` text-lg font-semibold border-primary bg-transparent py-1 px-3 text-primary transition-all hover:border hover:border-primary hover:rounded-full text-center font-inter flex items-center justify-center dark:text-bodydark1 dark:text-md${
                      pathname === "/user/myclearance" &&
                      "py-1 px-3 transition-all border border-primary rounded-full"
                    }`}
                    href="/user/myclearance"
                  >
                    My Clearance
                  </Link>

                  <Link
                    className={` text-lg font-semibold border-primary bg-transparent py-1 px-3 text-primary transition-all hover:border hover:border-primary hover:rounded-full text-center font-inter flex items-center justify-center dark:text-bodydark1 dark:text-md ${
                      pathname === "/user/help" &&
                      "py-1 px-3 transition-all border border-primary rounded-full"
                    }`}
                    href="/user/help"
                  >
                    Help
                  </Link>
                </div>
              </div>
            )}

            {/* <!-- Notification Menu Area --> */}
            <DropdownNotification />
            {/* <!-- Notification Menu Area --> */}

            {/* <!-- Chat Notification Area --> */}
            <DropdownMessage />
            {/* <!-- Chat Notification Area --> */}
          </ul>

          {/* <!-- User Area --> */}
          <DropdownUser />
          {/* <!-- User Area --> */}
        </div>
      </div>
    </header>
  );
};

export default Header;
