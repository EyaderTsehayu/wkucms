import OuterNav from "@/components/Header/OuterNav";
import SignIn from "@/components/auth/SignIn";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
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
          <div className="flex flex-row sm:px-12 px-6 sm:py-16 py-4 ">
            <div className="flex flex-col lg:items-start items-center md:w-1/2">
              <h1 className="lg:text-left xl:text-5xl text-4xl lg:mt-12 text-center mt-2 lg:font-extrabold font-bold leading-[1.15] text-primary dark:text-whiten ">
                {" "}
                Experience a hassle-free clearance process with our centralized
                solution.
              </h1>
              <p className="hidden lg:block lg:text-left lg:mt-10 text-center mt-4 leading-[1.15] text-body dark:text-whiten text-xl ">
                Streamline your clearance procedure effortlessly with our
                all-in-one solution, enjoy a stress-free clearance process
                through our unified platform.
              </p>
              <div className="md:mt-12 lg:mt-12 mt-8">
                <Link
                  href="/"
                  className="text-primary dark:text-white text-lg font-bold py-3 px-8 transition-all border border-primary rounded-full hover:bg-primary hover:text-white"
                >
                  Request Clearance
                </Link>
              </div>
            </div>
            <div className="w-1/2 ml-24 md:block hidden ">
              <Image
                width={600}
                height={10}
                src={"/images/user/clearance.png"}
              />
            </div>
          </div>
        </div>
        {/* outer home with login */}
        {/* <div className="flex flex-row md:px-24 md:py-12">
          <div className="hidden  lg:block lg:w-1/2">
            <div className=" flex flex-col gap-8 pt-20">
              <h1 className="text-left text-primary lg:text-5xl text-4xl font-extrabold">
                Wolkite University Clearance Management System
              </h1>
              <h3 className="text-left text-primary  lg:text-4xl text-3xl font-bold ">
                "We Made It Easy"
              </h3>{" "}
              <div className="flex mt-6 items-center gap-4"></div>
            </div>
          </div>
          <div className=" w-full lg:w-auto md:mx-34 sm:mx-28 lg:mx-16 xsm:mx-18 mx-4 my-4 ">
            <SignIn />
          </div>
        </div>
      </div> */}
      </div>
      
    </main>
  );
}
