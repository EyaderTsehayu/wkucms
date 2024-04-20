import useSWR from "swr";
import { useRouter } from "next/navigation";
import Image from "next/image";

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
  //console.log(userData);
  if (error) {
    console.error("Error fetching data:", error);
    return <p>Failed to fetch data</p>;
  }

  const handlePrintClearance = (id) => {
    // Navigate to the /user/PrintClearance route
    console.log("userData[0]?._id",id);
    router.push(`/user/PrintClearance?clearanceId=${id}`);

  };

  return (
    <div>
      {userData.length == 0 && (
        <div class="rounded-sm border border-stroke bg-white px-5 pt-10 shadow-default dark:border-strokedark dark:bg-boxdark ">
          <div class="mx-auto max-w-[490px]">
            <div class="mt-7.5 mb-3 text-center">
              <h2 class="mb-3 text-2xl font-bold text-black dark:text-white font-satoshi">
                Sorry, you have not any clearance history yet!
              </h2>
              <p class="font-medium font-satoshi">
                The page you were looking for appears when you finish a full
                clearance process and it presents the histories of your previous
                clearances.
              </p>
            </div>{" "}
            <Image
              alt="illustration"
              loading="lazy"
              width="400"
              height="200"
              decoding="async"
              data-nimg="1"
              src="/images/illustration/illustration-01.svg"
            />
          </div>
        </div>
      )}
      {userData.map((his) => (
        <div
          key={his._id}
          class="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark"
        >
          <div class="border-b border-stroke px-4 py-4 dark:border-strokedark sm:px-6 xl:px-9">
            <h3 class="text-xl font-bold text-black dark:text-white font-satoshi">
              Previous Approval History
            </h3>
          </div>
          <div class="p-4 sm:p-6 xl:p-9">
            <div>
              <div class="flex flex-col-reverse gap-5 xl:flex-row xl:justify-between">
                <div class="flex flex-col gap-4 sm:flex-row xl:gap-9 ">
                  <div>
                    <h4 class="mb-2 text-title-sm2 font-semibold leading-[30px] text-black dark:text-white font-satoshi">
                      Requester : {his.firstname} {his.middlename}
                    </h4>
                    <span class=" block">
                      <span class="font-bold font-satoshi">Reason : </span>
                      <span class="font-medium font-satoshi">
                        {" "}
                        {his.reason}
                      </span>
                    </span>
                  </div>
                </div>
                <h3 class="text-lg font-medium text-black dark:text-white font-satoshi">
                  Clearance ID : #{his._id}
                </h3>
              </div>
              <div class="my-7.5 grid grid-cols-1 border border-stroke dark:border-strokedark xsm:grid-cols-2 sm:grid-cols-4">
                <div class="border-b border-r border-stroke px-5 py-4 last:border-r-0 dark:border-strokedark sm:border-b-0">
                  <h5 class="mb-1.5 font-bold text-black dark:text-white font-satoshi">
                    Clearance ID
                  </h5>
                  <span class="text-sm font-medium font-satoshi">
                    {" "}
                    {his._id}
                  </span>
                </div>
                <div class="border-b border-stroke px-5 py-4 last:border-r-0 dark:border-strokedark sm:border-b-0 sm:border-r">
                  <h5 class="mb-1.5 font-bold text-black dark:text-white font-satoshi">
                    Date Issued
                  </h5>
                  <span class="text-sm font-medium font-satoshi">
                    {" "}
                    {his.dateRequested}{" "}
                  </span>
                </div>
                <div class="border-b border-r border-stroke px-5 py-4 last:border-r-0 dark:border-strokedark xsm:border-b-0">
                  <h5 class="mb-1.5 font-bold text-black dark:text-white font-satoshi">
                    Due Approved
                  </h5>
                  <span class="text-sm font-medium font-satoshi">
                    {" "}
                    {his.dateApproved}{" "}
                  </span>
                </div>
                <div class="border-r border-stroke px-5 py-4 last:border-r-0 dark:border-strokedark">
                  <h5 class="mb-1.5 font-bold text-black dark:text-white font-satoshi">
                    Clearance Reason
                  </h5>
                  <span class="text-sm font-medium font-satoshi">
                    {" "}
                    {his.reason}{" "}
                  </span>
                </div>
              </div>
              <div class="border border-stroke dark:border-strokedark">
                <div class="flex justify-end p-3">
                  <div class="w-full max-w-65">
                    <button
                      onClick={()=> handlePrintClearance(his.clearanceId)}
                      class="float-right  inline-flex items-center font-satoshi gap-2.5 rounded bg-primary px-7.5 py-2.5 font-medium text-white hover:bg-opacity-90"
                    >
                      Download
                      <svg
                        class="fill-current"
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clip-path="url(#clip0_1878_13706)">
                          <path
                            d="M16.8754 12.375C16.5379 12.375 16.2285 12.6562 16.2285 13.0219V15.525C16.2285 15.7781 16.0316 15.975 15.7785 15.975H2.22227C1.96914 15.975 1.77227 15.7781 1.77227 15.525V13.0219C1.77227 12.6562 1.46289 12.375 1.12539 12.375C0.787891 12.375 0.478516 12.6562 0.478516 13.0219V15.525C0.478516 16.4812 1.23789 17.2406 2.19414 17.2406H15.7785C16.7348 17.2406 17.4941 16.4812 17.4941 15.525V13.0219C17.5223 12.6562 17.2129 12.375 16.8754 12.375Z"
                            fill=""
                          ></path>
                          <path
                            d="M8.55055 13.078C8.66305 13.1905 8.8318 13.2468 9.00055 13.2468C9.1693 13.2468 9.30992 13.1905 9.45054 13.078L13.5287 9.1124C13.7818 8.85928 13.7818 8.46553 13.5287 8.2124C13.2755 7.95928 12.8818 7.95928 12.6287 8.2124L9.64742 11.1374V1.40615C9.64742 1.06865 9.36617 0.759277 9.00055 0.759277C8.66305 0.759277 8.35367 1.04053 8.35367 1.40615V11.1374L5.37242 8.2124C5.1193 7.95928 4.72555 7.9874 4.47242 8.2124C4.2193 8.46553 4.24742 8.85928 4.47242 9.1124L8.55055 13.078Z"
                            fill=""
                          ></path>
                        </g>
                        <defs>
                          <clipPath id="clip0_1878_13706">
                            <rect width="18" height="18" fill="white"></rect>
                          </clipPath>
                        </defs>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>

    // <div className="flex flex-col sm:gap-7.5 gap-2">
    //   {userData.map((his) => (
    //     <div
    //       key={his._id}
    //       className="rounded-lg   dark:border-strokedark dark:bg-boxdark my-7 flex flex-col sm:flex-row sm:items-center sm:justify-center w-full border-l-6 border-[#34D399] bg-[#34D399] bg-opacity-[15%] px-7 py-8 shadow-md dark-bg-[#1B1B24] dark-bg-opacity-30 md:p-9"
    //     >
    //       <div className="relative w-full lg:h-60 h-100   text-left">
    //         <div className="flex flex-row">
    //           <div className="mr-3 flex h-9 w-full max-w-[30px] items-center justify-center rounded-lg bg-[#34D399]">
    //             <svg
    //               width="16"
    //               height="12"
    //               viewBox="0 0 16 12"
    //               fill="none"
    //               xmlns="http://www.w3.org/2000/svg"
    //             >
    //               <path
    //                 d="M15.2984 0.826822L15.2868 0.811827L15.2741 0.797751C14.9173 0.401867 14.3238 0.400754 13.9657 0.794406L5.91888 9.45376L2.05667 5.2868C1.69856 4.89287 1.10487 4.89389 0.747996 5.28987C0.417335 5.65675 0.417335 6.22337 0.747996 6.59026L0.747959 6.59029L0.752701 6.59541L4.86742 11.0348C5.14445 11.3405 5.52858 11.5 5.89581 11.5C6.29242 11.5 6.65178 11.3355 6.92401 11.035L15.2162 2.11161C15.5833 1.74452 15.576 1.18615 15.2984 0.826822Z"
    //                 fill="white"
    //                 stroke="white"
    //               ></path>
    //             </svg>
    //           </div>
    //           <h5 className="pb-4 font-satoshi text-3xl font-extrabold text-primary dark:text-white">
    //             Approval History
    //           </h5>
    //         </div>

    //         <h5 className="font-satoshi text-xl font-bold text-primary dark:text-meta-5">
    //           <span className="text-xl font-bold text-black dark:text-white">
    //             Clearance Id -{" "}
    //           </span>{" "}
    //           {his._id}
    //         </h5>
    //         <p className=" text-justify font-satoshi text-black text-lg dark:text-bodydark1 leading-7">
    //           <span className="text-xl font-bold text-black dark:text-white">
    //             Date requested -{" "}
    //           </span>{" "}
    //           {his.dateRequested}
    //         </p>
    //         <p className=" text-justify font-satoshi text-black text-lg dark:text-bodydark1 leading-7">
    //           <span className="text-xl font-bold text-black dark:text-white">
    //             Date approved -{" "}
    //           </span>{" "}
    //           {his.dateApproved}
    //         </p>

    //         <p className=" text-justify font-satoshi text-black text-lg dark:text-bodydark1 leading-7">
    //           <span className="text-xl font-bold text-black dark:text-white">
    //             Reason for leave -{" "}
    //           </span>{" "}
    //           {his.reason}
    //         </p>
    //         <p className=" text-justify font-satoshi text-black text-lg dark:text-bodydark1 leading-7">
    //           <span className="text-xl font-bold text-black dark:text-white">
    //             Status -{" "}
    //           </span>{" "}
    //           {his.status}
    //         </p>
    //         {/* <button
    //                         onClick={handlePrintClearance}
    //                         // href=""
    //                         className="absolute lg:bottom-0 bottom-5 right-10 text-primary dark:text-white text-lg font-bold py-3 px-8 transition-all border border-primary rounded-full hover:bg-primary hover:text-white"
    //                     >
    //                         Print Clearance
    //                     </button> */}
    //       </div>
    //     </div>
    //   ))}
    // </div>
  );
};

export default History;