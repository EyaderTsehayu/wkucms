import OuterNav from "@/components/Header/OuterNav";
import SignIn from "@/components/auth/SignIn";
export default function Home() {
  return (
    <main>
      <div className="flex flex-col bg-white h-screen">
        <div className="flex w-full ">
          <OuterNav />{" "}
        </div>{" "}
        <div className="flex flex-row md:px-24 md:py-12">
          <div className="hidden  lg:block lg:w-1/2">
            <div className=" flex flex-col gap-8 pt-20">
              <h1 className="text-left text-primary lg:text-5xl text-4xl font-extrabold">
                Wolkite University Clearance Management System
              </h1>
              <h3 className="text-left text-primary  lg:text-4xl text-3xl font-bold ">
                "We Made It Easy"
              </h3>{" "}
              <div className="flex mt-6 items-center gap-4">
                {/* <Link
                href="https://www.facebook.com"
                className="flex items-center"
              >
                <Image
                  src="/images/icon/facebook-icon.png"
                  width={32}
                  height={32}
                  alt="Facebook"
                />
              </Link>
              <Link
                href="https://www.facebook.com"
                className="flex items-center"
              >
                <Image
                  src="/images/icon/facebook-icon.png"
                  width={32}
                  height={32}
                  alt="Facebook"
                />
              </Link>{" "}
              <Link
                href="https://www.facebook.com"
                className="flex items-center"
              >
                <Image
                  src="/images/icon/facebook-icon.png"
                  width={32}
                  height={32}
                  alt="Facebook"
                />
              </Link> */}
              </div>
            </div>
          </div>
          <div className=" w-full lg:w-auto md:mx-34 sm:mx-28 lg:mx-16 xsm:mx-18 mx-4 my-4 ">
            <SignIn />
          </div>
        </div>
      </div>
    </main>
  );
}
