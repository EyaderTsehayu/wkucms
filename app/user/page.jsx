import Announcement from "@/components/user/Announcement";
import Image from "next/image";
import { Metadata } from "next";
import Link from "next/link";

export const metadata = {
  title: "WKUCMS | User",
  description: "This is Home Blog page for WKUCMS User",
  // other metadata
};

export default function Home() {
  return (
    <section className="flex flex-col bg-white dark:bg-black  items-center">
      <div className="flex flex-row sm:p-12 p-6 ">
        <div className="flex flex-col lg:items-start items-center md:w-1/2">
          <h1 className="lg:text-left xl:text-5xl text-4xl lg:mt-12 text-center mt-2 lg:font-extrabold font-bold leading-[1.15] text-primary dark:text-whiten ">
            {" "}
            Experience a hassle-free clearance process with our centralized
            solution.
          </h1>
          <p className="hidden lg:block lg:text-left lg:mt-10 text-center mt-4 leading-[1.15] text-body dark:text-whiten text-xl ">
            Streamline your clearance procedure effortlessly with our all-in-one
            solution, enjoy a stress-free clearance process through our unified
            platform.
          </p>
          <div className="md:mt-12 mt-8">
            <Link
              href="/"
              className="text-primary dark:text-white text-lg font-bold py-2 px-4 transition-all border border-primary rounded-full hover:bg-primary hover:text-white"
            >
              Request Clearance
            </Link>
          </div>
        </div>
        <div className="w-1/2 ml-24 md:block hidden ">
          <Image width={600} height={10} src={"/images/user/clearance.png"} />
        </div>
      </div>

      <div className="flex">
        <Announcement />
      </div>
    </section>
  );
}
