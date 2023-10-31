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
        status: "Approved"
    }, {
        clearanceId: "#6723oiuyat",
        dateRequested: "02/03/16",
        dateApproved: "03/03/16",
        reason: "Vacation",
        status: "Approved"
    }, {
        clearanceId: "#6723oiuyat",
        dateRequested: "02/03/16",
        dateApproved: "03/03/16",
        reason: "Vacation",
        status: "Approved"
    }, {
        clearanceId: "#6723oiuyat",
        dateRequested: "02/03/16",
        dateApproved: "03/03/16",
        reason: "Vacation",
        status: "Approved"
    }, {
        clearanceId: "#6723oiuyat",
        dateRequested: "02/03/16",
        dateApproved: "03/03/16",
        reason: "Vacation",
        status: "Approved"
    },

];

const History = () => {
    return (
        <div className="flex flex-col sm:gap-7.5 gap-2">
            {history.map((his) => (
                <div
                    key={his.id}
                    className="rounded-lg   dark:border-strokedark dark:bg-boxdark my-7 flex flex-col sm:flex-row sm:items-center sm:justify-center w-full border-l-6 border-[#34D399] bg-[#34D399] bg-opacity-[15%] px-7 py-8 shadow-md dark-bg-[#1B1B24] dark-bg-opacity-30 md:p-9"
                >

                    <div className="w-full  text-left">
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
                            <h5 className="pb-4 font-satoshi text-3xl font-extrabold text-primary dark:text-white">Approval History
                            </h5>
                        </div>

                        <h5 className="font-satoshi text-xl font-bold text-primary dark:text-meta-5">
                            <span className="text-xl font-bold text-black dark:text-white">Clearance Id - </span>  {his.clearanceId
                            }
                        </h5>
                        <p className=" text-justify font-satoshi text-black text-lg dark:text-bodydark1 leading-7">
                            <span className="text-xl font-bold text-black dark:text-white">Date requested - </span>  {his.dateRequested}
                        </p>
                        <p className=" text-justify font-satoshi text-black text-lg dark:text-bodydark1 leading-7">
                            <span className="text-xl font-bold text-black dark:text-white">Date approved - </span>   {his.dateApproved}
                        </p>

                        <p className=" text-justify font-satoshi text-black text-lg dark:text-bodydark1 leading-7">
                            <span className="text-xl font-bold text-black dark:text-white">Reason for leave - </span>   {his.reason}
                        </p>
                        <p className=" text-justify font-satoshi text-black text-lg dark:text-bodydark1 leading-7">
                            <span className="text-xl font-bold text-black dark:text-white">Status - </span> {his.status}
                        </p>
                    </div>
                </div>
            ))
            }
        </div >
    );
};

export default History;
