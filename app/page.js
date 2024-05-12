import OuterNav from "@/components/Header/OuterNav";
import SignIn from "@/components/auth/SignIn";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

import RouteIcon from "@mui/icons-material/Route";
import AdsClickIcon from "@mui/icons-material/AdsClick";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import StackedLineChartIcon from "@mui/icons-material/StackedLineChart";
export default async function Home() {
  const session = await getServerSession(authOptions);
  if (session) {
    const role = session?.user?.role;
    if (role == "ADMIN") {
      redirect("/admin");
    } else if (role == "STUDENT" || role == "STAFF") {
      redirect("/user");
    }
  }
  return (
    <main>
      <div className="flex flex-col bg-white h-screen">
        <div className="flex w-full ">
          <OuterNav />{" "}
        </div>{" "}
        <div className="flex flex-col bg-white dark:bg-black  ">
          <div className="flex md:flex-row flex-col sm:px-18 px-6 sm:py-6 py-4 md:gap-0 gap-10 ">
            <div className="flex flex-col lg:items-start py-6 items-center md:w-1/2">
              <h1 className="md:text-left text-center text-3xl font-extrabold text-primary/90 dark:text-white    xl:text-title-xxl ">
                {" "}
                Experience a hassle-free clearance process with our centralized
                solution.
              </h1>

              <p className="hidden lg:block lg:text-left text-center sm:mt-6 mt-4 leading-[1.15] text-primary/90 dark:text-whiten font-medium font-satoshi text-xl ">
                Streamline your clearance procedure effortlessly with our
                all-in-one solution, enjoy a stress-free clearance process
                through our unified platform.
              </p>
              <div className="mt-4 hidden md:block">
                <ul class="flex flex-wrap  gap-4">
                  <li>
                    <p class="group relative flex h-15 w-15 cursor-pointer items-center justify-center rounded-full bg-white shadow-1">
                      <span class="absolute -top-10 hidden w-max rounded-md bg-black px-3.5 py-1.5 text-custom-sm text-white group-hover:block dark:bg-white dark:text-black">
                        Clear Pathway
                        <span class="absolute -bottom-1 left-1/2 block h-2 w-2 -translate-x-1/2 rotate-45 bg-black dark:bg-white"></span>
                      </span>
                      <RouteIcon className="text-meta-4" fontSize="large" />
                    </p>
                  </li>
                  <li>
                    <p class="group relative flex h-15 w-15 cursor-pointer items-center justify-center rounded-full bg-white shadow-1">
                      <span class="absolute -top-10 hidden w-max rounded-md bg-black px-3.5 py-1.5 text-custom-sm text-white group-hover:block dark:bg-white dark:text-black">
                        Efficient
                        <span class="absolute -bottom-1 left-1/2 block h-2 w-2 -translate-x-1/2 rotate-45 bg-black dark:bg-white"></span>
                      </span>
                      <AdsClickIcon fontSize="large" className="text-primary" />
                    </p>
                  </li>
                  <li>
                    <p class="group relative flex h-15 w-15 cursor-pointer items-center justify-center rounded-full bg-white shadow-1">
                      <span class="absolute -top-10 hidden w-max rounded-md bg-black px-3.5 py-1.5 text-custom-sm text-white group-hover:block dark:bg-white dark:text-black">
                        Rapid Approval
                        <span class="absolute -bottom-1 left-1/2 block h-2 w-2 -translate-x-1/2 rotate-45 bg-black dark:bg-white"></span>
                      </span>
                      <ElectricBoltIcon
                        className="text-meta-1"
                        fontSize="large"
                      />
                    </p>
                  </li>
                  <li>
                    <p class="group relative flex h-15 w-15 cursor-pointer items-center justify-center rounded-full bg-white shadow-1">
                      <span class="absolute -top-10 hidden w-max rounded-md bg-black px-3.5 py-1.5 text-custom-sm text-white group-hover:block dark:bg-white dark:text-black">
                        Seamless Experience
                        <span class="absolute -bottom-1 left-1/2 block h-2 w-2 -translate-x-1/2 rotate-45 bg-black dark:bg-white"></span>
                      </span>
                      <AutoFixHighIcon
                        className="text-warning"
                        fontSize="large"
                      />
                    </p>
                  </li>
                  <li>
                    <p class="group relative flex h-15 w-15 cursor-pointer items-center justify-center rounded-full bg-white shadow-1">
                      <span class="absolute -top-10 hidden w-max rounded-md bg-black px-3.5 py-1.5 text-custom-sm text-white group-hover:block dark:bg-white dark:text-black">
                        Transparent Tracking
                        <span class="absolute -bottom-1 left-1/2 block h-2 w-2 -translate-x-1/2 rotate-45 bg-black dark:bg-white"></span>
                      </span>
                      <StackedLineChartIcon
                        className="text-black"
                        fontSize="large"
                      />
                    </p>
                  </li>
                </ul>
              </div>
              <div className="md:mt-12 lg:mt-14 mt-8">
                <Link
                  href="/signIn"
                  className="text-primary dark:text-white text-base font-bold sm:py-3 sm:px-8 py-2 px-4 transition-all border border-primary rounded-full hover:bg-primary/90 hover:text-white"
                >
                  Request Clearance
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 md:ml-24 ">
              <Image
                width={600}
                height={100}
                src={"/images/user/clearance.png"}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
