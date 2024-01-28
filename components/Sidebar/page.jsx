import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SidebarLinkGroup from "./SidebarLinkGroup";
import Image from "next/image";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import HomeWorkOutlinedIcon from "@mui/icons-material/HomeWorkOutlined";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import CampaignOutlinedIcon from "@mui/icons-material/CampaignOutlined";
import { useSession } from "next-auth/react";
const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const { data: session } = useSession();
  const pathname = usePathname();

  const trigger = useRef(null);
  const sidebar = useRef(null);


  let storedSidebarExpanded = "true";
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector("body")?.classList.add("sidebar-expanded");
    } else {
      document.querySelector("body")?.classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  // staff approval dropdown
  const [showDropdown, setShowDropdown] = useState(false);

  const dropdownRef = useRef(null); // Create a ref for the dropdown element



  const handleDropdownItemClick = (page) => {
    // Navigate to the selected page here
    // You can use React Router, window.location.href, or any other navigation method
    // For example, if you are using React Router, you can use history.push('/your-page')
  };

  const handleMouseEnter = () => {
    setShowDropdown(true);
  };

  // const handleMouseLeave = () => {
  //   if (dropdownRef.current) {
  //     // Check if the dropdown element exists
  //     const dropdownRect = dropdownRef.current.getBoundingClientRect();
  //     if (
  //       dropdownRect.top > 0 &&
  //       dropdownRect.bottom < window.innerHeight
  //     ) {
  //       // If the dropdown is still visible on hover leave, don't close it
  //       return;
  //     }
  //   }
  //   setShowDropdown(false);
  // };

  const handleMouseLeave = () => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      // Close the dropdown if the click is outside the dropdown
      setShowDropdown(false);
    } else if (!dropdownRef.current.contains(event.relatedTarget)) {
      // Close the dropdown if the mouse leaves the dropdown and doesn't hover over the dropdown button
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        // Close the dropdown if the click is outside the dropdown
        setShowDropdown(false);
      }
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);
  //  staff aproval end













  return (
    <aside
      ref={sidebar}
      className={` absolute  left-0 top-0 z-9999 flex h-screen w-60 flex-col overflow-y-hidden  bg-white drop-shadow-2 duration-300 ease-linear dark:bg-boxdark dark:drop-shadow-none lg:static lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } ${pathname == "/user" || pathname.includes("/user") ? "lg:hidden " : ""
        }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex items-center justify-between gap-2 px-6 lg:pt-6 ">
        <Link
          href="/admin"
          className="flex flex-row items-center gap-3 text-primary font-extrabold text-xl"
        >
          <Image
            width={52}
            height={52}
            src={"/images/logo/logo.png"}
            alt="Logo"
          />
          WKUCMS
        </Link>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
          <svg
            className="fill-current"
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
              fill=""
            />
          </svg>
        </button>
      </div>
      {/* <!-- SIDEBAR HEADER --> */}

      {(pathname == "/user" || pathname.includes("/user")) && (
        <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
          {/* <!-- Sidebar Menu --> */}
          <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
            {/* <!-- Menu Group --> */}
            <div>
              <ul className="mb-6 flex flex-col gap-1.5">
                {/* <!-- Menu Item Dashboard --> */}
                <li>
                  <Link
                    href="/user"
                    className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-graydark dark:text-bodydark2 duration-300 ease-in-out hover:bg-gray dark:hover:bg-meta-4 ${pathname == "/user" &&
                      "bg-gray dark:bg-graydark  dark:text-bodydark2"
                      }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M13 12C13 11.4477 13.4477 11 14 11H19C19.5523 11 20 11.4477 20 12V19C20 19.5523 19.5523 20 19 20H14C13.4477 20 13 19.5523 13 19V12Z"
                        stroke="#000000"
                        stroke-width="2"
                        stroke-linecap="round"
                      />
                      <path
                        d="M4 5C4 4.44772 4.44772 4 5 4H9C9.55228 4 10 4.44772 10 5V12C10 12.5523 9.55228 13 9 13H5C4.44772 13 4 12.5523 4 12V5Z"
                        stroke="#000000"
                        stroke-width="2"
                        stroke-linecap="round"
                      />
                      <path
                        d="M4 17C4 16.4477 4.44772 16 5 16H9C9.55228 16 10 16.4477 10 17V19C10 19.5523 9.55228 20 9 20H5C4.44772 20 4 19.5523 4 19V17Z"
                        stroke="#000000"
                        stroke-width="2"
                        stroke-linecap="round"
                      />
                      <path
                        d="M13 5C13 4.44772 13.4477 4 14 4H19C19.5523 4 20 4.44772 20 5V7C20 7.55228 19.5523 8 19 8H14C13.4477 8 13 7.55228 13 7V5Z"
                        stroke="#000000"
                        stroke-width="2"
                        stroke-linecap="round"
                      />
                    </svg>
                    Home
                  </Link>
                </li>
                {/* <!-- Menu Item My clearance --> */}
                <li>
                  <Link
                    href="/user/myclearance"
                    className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-graydark dark:text-bodydark2 duration-300 ease-in-out hover:bg-gray dark:hover:bg-meta-4 ${pathname == "/user/myclearance" &&
                      "bg-gray dark:bg-graydark  dark:text-bodydark2"
                      }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M7.48334 5.25942C6.33891 5.38732 5.42286 6.29057 5.29045 7.42268C4.93476 10.4638 4.93476 13.5361 5.29045 16.5772C5.42286 17.7093 6.33891 18.6126 7.48334 18.7405C10.4602 19.0732 13.5398 19.0732 16.5166 18.7405C17.6611 18.6126 18.5771 17.7093 18.7095 16.5772C18.9651 14.3921 19.037 12.1909 18.9253 9.99668C18.9224 9.94002 18.9436 9.88475 18.9837 9.84463L20.0225 8.80585C20.1427 8.68562 20.3482 8.7608 20.3609 8.93036C20.557 11.5353 20.5031 14.1543 20.1994 16.7515C19.9845 18.5884 18.5096 20.0271 16.6832 20.2312C13.5957 20.5763 10.4043 20.5763 7.31673 20.2312C5.49035 20.0271 4.01545 18.5884 3.8006 16.7515C3.43137 13.5945 3.43137 10.4053 3.8006 7.24843C4.01545 5.41146 5.49035 3.97282 7.31673 3.7687C10.4043 3.42362 13.5957 3.42362 16.6832 3.7687C17.3265 3.84059 17.9261 4.06562 18.4425 4.40725C18.5441 4.47448 18.5542 4.61732 18.468 4.70346L17.6652 5.50635C17.5995 5.57202 17.4976 5.58307 17.4158 5.5392C17.1423 5.39271 16.8385 5.29539 16.5166 5.25942C13.5398 4.92671 10.4602 4.92671 7.48334 5.25942Z"
                        fill="#000000"
                      />
                      <path
                        d="M21.0303 6.03028C21.3232 5.73738 21.3232 5.26251 21.0303 4.96962C20.7374 4.67672 20.2625 4.67672 19.9696 4.96962L11.5 13.4393L9.0303 10.9696C8.73741 10.6767 8.26253 10.6767 7.96964 10.9696C7.67675 11.2625 7.67675 11.7374 7.96964 12.0303L10.9696 15.0303C11.2625 15.3232 11.7374 15.3232 12.0303 15.0303L21.0303 6.03028Z"
                        fill="#000000"
                      />
                    </svg>
                    My Clearance
                  </Link>
                </li>
                {/* <!-- Menu Item Myclearance --> */}

                {/* <!-- Menu Item Help --> */}
                <li>
                  <Link
                    href="/user/help"
                    className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4  font-medium text-graydark dark:text-bodydark2 duration-300 ease-in-out hover:bg-gray dark:hover:bg-meta-4 ${pathname == "/user/help" &&
                      "bg-gray dark:bg-graydark dark:text-bodydark2"
                      }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M12 17H12.01M12 14C12.8906 12.0938 15 12.2344 15 10C15 8.5 14 7 12 7C10.4521 7 9.50325 7.89844 9.15332 9M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
                        stroke="#000000"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    Help
                  </Link>
                </li>

                 {session?.user?.privilege &&
              
                ( <li>
                  <div className="relative h-40 ">
                    <Link
                      className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-graydark dark:text-bodydark2 duration-300 ease-in-out hover:bg-gray dark:hover:bg-meta-4 ${pathname == "/user/myclearance" &&
                        "bg-gray dark:bg-graydark  dark:text-bodydark2"
                        }`}
                      href="/user/studentApproval"
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M12 17H12.01M12 14C12.8906 12.0938 15 12.2344 15 10C15 8.5 14 7 12 7C10.4521 7 9.50325 7.89844 9.15332 9M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
                          stroke="#000000"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                      Approve
                    </Link>
                    {showDropdown && (
                      <div
                        ref={dropdownRef} // Assign the ref to the dropdown element
                        className="absolute top-10 right-10 z-10 bg-white p-2 dark:bg-boxdark"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                      >
                        <ul className="text-sm  dark:text-white text-graydark pr-9 ">
                          <li className="pb-2 flex">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                            >
                              <path
                                d="M7.48334 5.25942C6.33891 5.38732 5.42286 6.29057 5.29045 7.42268C4.93476 10.4638 4.93476 13.5361 5.29045 16.5772C5.42286 17.7093 6.33891 18.6126 7.48334 18.7405C10.4602 19.0732 13.5398 19.0732 16.5166 18.7405C17.6611 18.6126 18.5771 17.7093 18.7095 16.5772C18.9651 14.3921 19.037 12.1909 18.9253 9.99668C18.9224 9.94002 18.9436 9.88475 18.9837 9.84463L20.0225 8.80585C20.1427 8.68562 20.3482 8.7608 20.3609 8.93036C20.557 11.5353 20.5031 14.1543 20.1994 16.7515C19.9845 18.5884 18.5096 20.0271 16.6832 20.2312C13.5957 20.5763 10.4043 20.5763 7.31673 20.2312C5.49035 20.0271 4.01545 18.5884 3.8006 16.7515C3.43137 13.5945 3.43137 10.4053 3.8006 7.24843C4.01545 5.41146 5.49035 3.97282 7.31673 3.7687C10.4043 3.42362 13.5957 3.42362 16.6832 3.7687C17.3265 3.84059 17.9261 4.06562 18.4425 4.40725C18.5441 4.47448 18.5542 4.61732 18.468 4.70346L17.6652 5.50635C17.5995 5.57202 17.4976 5.58307 17.4158 5.5392C17.1423 5.39271 16.8385 5.29539 16.5166 5.25942C13.5398 4.92671 10.4602 4.92671 7.48334 5.25942Z"
                                fill="#000000"
                              />
                              <path
                                d="M21.0303 6.03028C21.3232 5.73738 21.3232 5.26251 21.0303 4.96962C20.7374 4.67672 20.2625 4.67672 19.9696 4.96962L11.5 13.4393L9.0303 10.9696C8.73741 10.6767 8.26253 10.6767 7.96964 10.9696C7.67675 11.2625 7.67675 11.7374 7.96964 12.0303L10.9696 15.0303C11.2625 15.3232 11.7374 15.3232 12.0303 15.0303L21.0303 6.03028Z"
                                fill="#000000"
                              />
                            </svg>
                            <Link
                              href="/user/studentApproval"
                              onClick={() => handleDropdownItemClick("/student")}
                              className="pl-1 dark:text-bodydark2"
                            >
                              Student
                            </Link>
                          </li>
                          <li className="flex">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                            >
                              <path
                                d="M7.48334 5.25942C6.33891 5.38732 5.42286 6.29057 5.29045 7.42268C4.93476 10.4638 4.93476 13.5361 5.29045 16.5772C5.42286 17.7093 6.33891 18.6126 7.48334 18.7405C10.4602 19.0732 13.5398 19.0732 16.5166 18.7405C17.6611 18.6126 18.5771 17.7093 18.7095 16.5772C18.9651 14.3921 19.037 12.1909 18.9253 9.99668C18.9224 9.94002 18.9436 9.88475 18.9837 9.84463L20.0225 8.80585C20.1427 8.68562 20.3482 8.7608 20.3609 8.93036C20.557 11.5353 20.5031 14.1543 20.1994 16.7515C19.9845 18.5884 18.5096 20.0271 16.6832 20.2312C13.5957 20.5763 10.4043 20.5763 7.31673 20.2312C5.49035 20.0271 4.01545 18.5884 3.8006 16.7515C3.43137 13.5945 3.43137 10.4053 3.8006 7.24843C4.01545 5.41146 5.49035 3.97282 7.31673 3.7687C10.4043 3.42362 13.5957 3.42362 16.6832 3.7687C17.3265 3.84059 17.9261 4.06562 18.4425 4.40725C18.5441 4.47448 18.5542 4.61732 18.468 4.70346L17.6652 5.50635C17.5995 5.57202 17.4976 5.58307 17.4158 5.5392C17.1423 5.39271 16.8385 5.29539 16.5166 5.25942C13.5398 4.92671 10.4602 4.92671 7.48334 5.25942Z"
                                fill="#000000"
                              />
                              <path
                                d="M21.0303 6.03028C21.3232 5.73738 21.3232 5.26251 21.0303 4.96962C20.7374 4.67672 20.2625 4.67672 19.9696 4.96962L11.5 13.4393L9.0303 10.9696C8.73741 10.6767 8.26253 10.6767 7.96964 10.9696C7.67675 11.2625 7.67675 11.7374 7.96964 12.0303L10.9696 15.0303C11.2625 15.3232 11.7374 15.3232 12.0303 15.0303L21.0303 6.03028Z"
                                fill="#000000"
                              />
                            </svg>
                            <Link
                              className="pl-1 dark:text-bodydark2"
                              href="/user/staffApproval"
                              onClick={() => handleDropdownItemClick("/staff")}
                            >
                              Staff
                            </Link>
                          </li>

                        </ul>
                      </div>
                    )}
                  </div>
                </li>)}
                {/* <!-- Menu Item Help --> */}
              </ul>
            </div>
          </nav>
          {/* <!-- Sidebar Menu --> */}
        </div>
      )}
      {pathname == "admin" ||
        (pathname.includes("/admin") && (
          <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
            {/* <!-- Sidebar Menu --> */}
            <nav className="mt-5 py-4 px-4 lg:mt-12 lg:px-6">
              {/* <!-- Menu Group --> */}
              <div>
                <h3 className="mb-4 ml-4 text-sm font-semibold text-boxdark dark:text-bodydark">
                  MENU
                </h3>

                <ul className="mb-6 flex flex-col gap-1.5">
                  {/* <!-- Menu Item Dashboard --> */}
                  <li>
                    <Link
                      href="/admin"
                      className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-graydark dark:text-bodydark1 duration-300 ease-in-out hover:bg-gray dark:hover:bg-meta-4 ${pathname == "/admin" && "bg-gray dark:bg-meta-4"
                        }`}
                    >
                      <svg
                        className="fill-current"
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M6.10322 0.956299H2.53135C1.5751 0.956299 0.787598 1.7438 0.787598 2.70005V6.27192C0.787598 7.22817 1.5751 8.01567 2.53135 8.01567H6.10322C7.05947 8.01567 7.84697 7.22817 7.84697 6.27192V2.72817C7.8751 1.7438 7.0876 0.956299 6.10322 0.956299ZM6.60947 6.30005C6.60947 6.5813 6.38447 6.8063 6.10322 6.8063H2.53135C2.2501 6.8063 2.0251 6.5813 2.0251 6.30005V2.72817C2.0251 2.44692 2.2501 2.22192 2.53135 2.22192H6.10322C6.38447 2.22192 6.60947 2.44692 6.60947 2.72817V6.30005Z"
                          fill=""
                        />
                        <path
                          d="M15.4689 0.956299H11.8971C10.9408 0.956299 10.1533 1.7438 10.1533 2.70005V6.27192C10.1533 7.22817 10.9408 8.01567 11.8971 8.01567H15.4689C16.4252 8.01567 17.2127 7.22817 17.2127 6.27192V2.72817C17.2127 1.7438 16.4252 0.956299 15.4689 0.956299ZM15.9752 6.30005C15.9752 6.5813 15.7502 6.8063 15.4689 6.8063H11.8971C11.6158 6.8063 11.3908 6.5813 11.3908 6.30005V2.72817C11.3908 2.44692 11.6158 2.22192 11.8971 2.22192H15.4689C15.7502 2.22192 15.9752 2.44692 15.9752 2.72817V6.30005Z"
                          fill=""
                        />
                        <path
                          d="M6.10322 9.92822H2.53135C1.5751 9.92822 0.787598 10.7157 0.787598 11.672V15.2438C0.787598 16.2001 1.5751 16.9876 2.53135 16.9876H6.10322C7.05947 16.9876 7.84697 16.2001 7.84697 15.2438V11.7001C7.8751 10.7157 7.0876 9.92822 6.10322 9.92822ZM6.60947 15.272C6.60947 15.5532 6.38447 15.7782 6.10322 15.7782H2.53135C2.2501 15.7782 2.0251 15.5532 2.0251 15.272V11.7001C2.0251 11.4188 2.2501 11.1938 2.53135 11.1938H6.10322C6.38447 11.1938 6.60947 11.4188 6.60947 11.7001V15.272Z"
                          fill=""
                        />
                        <path
                          d="M15.4689 9.92822H11.8971C10.9408 9.92822 10.1533 10.7157 10.1533 11.672V15.2438C10.1533 16.2001 10.9408 16.9876 11.8971 16.9876H15.4689C16.4252 16.9876 17.2127 16.2001 17.2127 15.2438V11.7001C17.2127 10.7157 16.4252 9.92822 15.4689 9.92822ZM15.9752 15.272C15.9752 15.5532 15.7502 15.7782 15.4689 15.7782H11.8971C11.6158 15.7782 11.3908 15.5532 11.3908 15.272V11.7001C11.3908 11.4188 11.6158 11.1938 11.8971 11.1938H15.4689C15.7502 11.1938 15.9752 11.4188 15.9752 11.7001V15.272Z"
                          fill=""
                        />
                      </svg>
                      Dashboard
                    </Link>
                  </li>
                  {/* <!-- Menu Item Dashboard --> */}

                  {/* <!-- Menu User  --> */}
                  <SidebarLinkGroup
                    activeCondition={pathname === "/" || pathname.includes("/")}
                  >
                    {(handleClick, open) => {
                      return (
                        <React.Fragment>
                          <Link
                            href="#"
                            className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-graydark dark:text-bodydark1 duration-300 ease-in-out hover:bg-gray dark:hover:bg-meta-4 `}
                            onClick={(e) => {
                              e.preventDefault();
                              sidebarExpanded
                                ? handleClick()
                                : setSidebarExpanded(true);
                            }}
                          >
                            <PersonOutlineOutlinedIcon /> User
                            <svg
                              className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${open && "rotate-180"
                                }`}
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                                fill=""
                              />
                            </svg>
                          </Link>
                          {/* <!-- Dropdown Menu Start --> */}
                          <div
                            className={`translate transform overflow-hidden ${!open && "hidden"
                              }`}
                          >
                            <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                              <li>
                                <Link
                                  href="/admin/student"
                                  className={`group relative flex items-center gap-2.5 rounded-md py-2  px-4 font-medium text-graydark dark:text-bodydark1 duration-300 ease-in-out hover:text-body dark:hover:text-white  hover:bg-gray dark:hover:bg-meta-4 ${pathname.includes("student") &&
                                    "bg-gray dark:bg-graydark dark:text-white"
                                    } `}
                                >
                                  <Image
                                    width={22}
                                    height={22}
                                    src={"/images/logo/student.svg"}
                                    alt="student"
                                  />
                                  Student
                                </Link>
                              </li>
                              <li>
                                <Link
                                  href="/admin/staff"
                                  className={`group relative flex items-center gap-2.5 rounded-md py-2 px-4 font-medium text-graydark dark:text-bodydark1 duration-300 ease-in-out hover:text-body dark:hover:text-white  hover:bg-gray dark:hover:bg-meta-4  ${pathname.includes("staff") &&
                                    "bg-gray dark:bg-graydark dark:text-white"
                                    } `}
                                >
                                  {" "}
                                  <Image
                                    width={24}
                                    height={24}
                                    src={"/images/logo/staff.svg"}
                                    alt="student"
                                  />
                                  Staff
                                </Link>
                              </li>
                            </ul>
                          </div>
                          {/* <!-- Dropdown Menu End --> */}
                        </React.Fragment>
                      );
                    }}
                  </SidebarLinkGroup>
                  {/* <!-- Menu User  --> */}

                  {/* <!-- Menu Offices  --> */}
                  <li>
                    <Link
                      href="/admin/offices"
                      className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-graydark dark:text-bodydark1 duration-300 ease-in-out hover:bg-gray dark:hover:bg-meta-4 ${pathname.includes("offices") && "bg-gray dark:bg-meta-4"
                        }`}
                    >
                      <HomeWorkOutlinedIcon />
                      Offices
                    </Link>
                  </li>
                  {/* <!-- Menu offices  --> */}

                  {/* <!-- Menu officers  --> */}
                  {/* <li>
                    <Link
                      href="/admin/officer"
                      className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium  text-graydark dark:text-bodydark1 duration-300 ease-in-out hover:bg-gray dark:hover:bg-meta-4 ${pathname.includes("officer") && "bg-gray dark:bg-meta-4"
                        }`}
                    >
                      <ManageAccountsOutlinedIcon />
                      Officers
                    </Link>
                  </li> */}
                  {/* <!-- Menu Officers --> */}

                  {/* <!-- Menu Admin  --> */}
                  <li>
                    <Link
                      href="/admin/manageAdmins"
                      className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-graydark dark:text-bodydark1 duration-300 ease-in-out hover:bg-gray dark:hover:bg-meta-4 ${pathname.includes("manage") && "bg-gray dark:bg-meta-4"
                        }`}
                    >
                      <AdminPanelSettingsOutlinedIcon /> Admins
                    </Link>
                  </li>
                  {/* <!-- Menu Admin  --> */}
                </ul>
              </div>

              {/* <!-- Others Group --> */}

              <div>
                <h3 className="mb-4 ml-4 text-sm font-semibold text-black dark:text-bodydark2">
                  OTHERS
                </h3>

                <ul className="mb-6 flex flex-col gap-1.5">
                  {/* <!-- Menu report --> */}
                  <li>
                    <Link
                      href="/admin/report"
                      className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-graydark dark:text-bodydark1 duration-300 ease-in-out hover:bg-gray dark:hover:bg-meta-4 ${pathname.includes("report") && "bg-gray dark:bg-meta-4"
                        }`}
                    >
                      <svg
                        className="fill-current"
                        width="18"
                        height="19"
                        viewBox="0 0 18 19"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_130_9801)">
                          <path
                            d="M10.8563 0.55835C10.5188 0.55835 10.2095 0.8396 10.2095 1.20522V6.83022C10.2095 7.16773 10.4907 7.4771 10.8563 7.4771H16.8751C17.0438 7.4771 17.2126 7.39272 17.3251 7.28022C17.4376 7.1396 17.4938 6.97085 17.4938 6.8021C17.2688 3.28647 14.3438 0.55835 10.8563 0.55835ZM11.4751 6.15522V1.8521C13.8095 2.13335 15.6938 3.8771 16.1438 6.18335H11.4751V6.15522Z"
                            fill=""
                          />
                          <path
                            d="M15.3845 8.7427H9.1126V2.69582C9.1126 2.35832 8.83135 2.07707 8.49385 2.07707C8.40947 2.07707 8.3251 2.07707 8.24072 2.07707C3.96572 2.04895 0.506348 5.53645 0.506348 9.81145C0.506348 14.0864 3.99385 17.5739 8.26885 17.5739C12.5438 17.5739 16.0313 14.0864 16.0313 9.81145C16.0313 9.6427 16.0313 9.47395 16.0032 9.33332C16.0032 8.99582 15.722 8.7427 15.3845 8.7427ZM8.26885 16.3083C4.66885 16.3083 1.77197 13.4114 1.77197 9.81145C1.77197 6.3802 4.47197 3.53957 7.8751 3.3427V9.36145C7.8751 9.69895 8.15635 10.0083 8.52197 10.0083H14.7938C14.6813 13.4958 11.7845 16.3083 8.26885 16.3083Z"
                            fill=""
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_130_9801">
                            <rect
                              width="18"
                              height="18"
                              fill="white"
                              transform="translate(0 0.052124)"
                            />
                          </clipPath>
                        </defs>
                      </svg>
                      Reports
                    </Link>
                  </li>
                  {/* <!-- Menu report --> */}

                  {/* <!-- Menu announcement --> */}
                  <li>
                    <Link
                      href="/admin/announcement"
                      className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-graydark dark:text-bodydark1 duration-300 ease-in-out hover:bg-gray dark:hover:bg-meta-4 ${pathname.includes("announcement") &&
                        "bg-gray dark:bg-meta-4"
                        }`}
                    >
                      <CampaignOutlinedIcon />
                      Announcements
                    </Link>
                  </li>
                  {/* <!-- Menu announcement --> */}
                </ul>
              </div>
            </nav>
            {/* <!-- Sidebar Menu --> */}
          </div>
        ))}
    </aside>
  );
};

export default Sidebar;
