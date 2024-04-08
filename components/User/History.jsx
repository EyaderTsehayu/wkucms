import useSWR from "swr";
import { useRouter } from "next/navigation";
const metadata = {
  title: "Alerts Page | Next.js E-commerce Dashboard Template",
  description: "This is Alerts page for TailAdmin Next.js",
};

const history = [
  {
    clearanceId: "#6723oiuyat",
    dateRequested: "02/03/16",
    dateApproved: "03/03/16",
    reason: "Vacation",
    status: "Approved",
  },
  {
    clearanceId: "#6723oiuyat",
    dateRequested: "02/03/16",
    dateApproved: "03/03/16",
    reason: "Vacation",
    status: "Approved",
  },
  {
    clearanceId: "#6723oiuyat",
    dateRequested: "02/03/16",
    dateApproved: "03/03/16",
    reason: "Vacation",
    status: "Approved",
  },
  {
    clearanceId: "#6723oiuyat",
    dateRequested: "02/03/16",
    dateApproved: "03/03/16",
    reason: "Vacation",
    status: "Approved",
  },
  {
    clearanceId: "#6723oiuyat",
    dateRequested: "02/03/16",
    dateApproved: "03/03/16",
    reason: "Vacation",
    status: "Approved",
  },
];

const rows = [];
const fetcher = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  const updatedData = data.map((user) => ({
    ...user,
    id: user._id,
    roleId: user._id,
  }));
  return updatedData;
};
const History = () => {
  // Use SWR to fetch and cache data with automatic refresh every 10 seconds
  const { data: userData, error } = useSWR(
    "http://localhost:3000/api/approvalHistory",
    fetcher,
    {
      initialData: rows,
      revalidateOnFocus: false,
      refreshInterval: 2000, // Set the refresh interval in milliseconds (e.g., 10000 for 10 seconds)
    }
  );
  const router = useRouter();
  // Handle loading and fetch errors
  if (!userData && !error) {
    return <p>Loading...</p>;
  }
  console.log(userData);
  if (error) {
    console.error("Error fetching data:", error);
    return <p>Failed to fetch data</p>;
  }
  const handlePrintClearance = () => {
    // Navigate to the /user/PrintClearance route
    router.push(`/user/PrintClearance?clearanceId=${userData[0]?._id}`);
  };

  return (
    <div className="flex flex-col sm:gap-7.5 gap-2">
      {userData.map((his) => (
        <div
          key={his._id}
          className="rounded-lg   dark:border-strokedark dark:bg-boxdark my-7 flex flex-col sm:flex-row sm:items-center sm:justify-center w-full border-l-6 border-[#34D399] bg-[#34D399] bg-opacity-[15%] px-7 py-8 shadow-md dark-bg-[#1B1B24] dark-bg-opacity-30 md:p-9"
        >
          <div className="relative w-full lg:h-60 h-100   text-left">
            <div className="flex flex-row">
              <div className="mr-3 flex h-9 w-full max-w-[30px] items-center justify-center rounded-lg bg-[#34D399]">
                <svg
                  width="16"
                  height="12"
                  viewBox="0 0 16 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.2984 0.826822L15.2868 0.811827L15.2741 0.797751C14.9173 0.401867 14.3238 0.400754 13.9657 0.794406L5.91888 9.45376L2.05667 5.2868C1.69856 4.89287 1.10487 4.89389 0.747996 5.28987C0.417335 5.65675 0.417335 6.22337 0.747996 6.59026L0.747959 6.59029L0.752701 6.59541L4.86742 11.0348C5.14445 11.3405 5.52858 11.5 5.89581 11.5C6.29242 11.5 6.65178 11.3355 6.92401 11.035L15.2162 2.11161C15.5833 1.74452 15.576 1.18615 15.2984 0.826822Z"
                    fill="white"
                    stroke="white"
                  ></path>
                </svg>
              </div>
              <h5 className="pb-4 font-satoshi text-3xl font-extrabold text-primary dark:text-white">
                Approval History
              </h5>
            </div>

            <h5 className="font-satoshi text-xl font-bold text-primary dark:text-meta-5">
              <span className="text-xl font-bold text-black dark:text-white">
                Clearance Id -{" "}
              </span>{" "}
              {his._id}
            </h5>
            <p className=" text-justify font-satoshi text-black text-lg dark:text-bodydark1 leading-7">
              <span className="text-xl font-bold text-black dark:text-white">
                Date requested -{" "}
              </span>{" "}
              {his.dateRequested}
            </p>
            <p className=" text-justify font-satoshi text-black text-lg dark:text-bodydark1 leading-7">
              <span className="text-xl font-bold text-black dark:text-white">
                Date approved -{" "}
              </span>{" "}
              {his.dateApproved}
            </p>

            <p className=" text-justify font-satoshi text-black text-lg dark:text-bodydark1 leading-7">
              <span className="text-xl font-bold text-black dark:text-white">
                Reason for leave -{" "}
              </span>{" "}
              {his.reason}
            </p>
            <p className=" text-justify font-satoshi text-black text-lg dark:text-bodydark1 leading-7">
              <span className="text-xl font-bold text-black dark:text-white">
                Status -{" "}
              </span>{" "}
              {his.status}
            </p>
            {/* <button
                            onClick={handlePrintClearance}
                            // href=""
                            className="absolute lg:bottom-0 bottom-5 right-10 text-primary dark:text-white text-lg font-bold py-3 px-8 transition-all border border-primary rounded-full hover:bg-primary hover:text-white"
                        >
                            Print Clearance
                        </button> */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default History;
