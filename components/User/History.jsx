const metadata = {
    title: "Alerts Page | Next.js E-commerce Dashboard Template",
    description: "This is Alerts page for TailAdmin Next.js",

};

const history = [
    {
        title: "Cafteria",
        desc: "A cafeteria is a type of food service establishment that provides a variety of prepared dishes and beverages to customers. Cafeterias are commonly found in a wide range of settings, from schools and universities to workplaces, hospitals, and other public or private institutions. They offer a convenient and efficient way for people to enjoy a meal or snack without the need for full table service..",
    },
    {
        title: "Library",
        desc: "A library is a sanctuary of knowledge and imagination, a haven for the curious, and a cornerstone of any educated society. It is a place where books, information, and ideas come to life, providing a wealth of resources to people of all ages and backgrounds. The significance of libraries in our world cannot be overstated, and they have been a fundamental part of human civilization for centuries.",
    },
    {
        title: "Cafteria",
        desc: "A cafeteria is a type of food service establishment that provides a variety of prepared dishes and beverages to customers. Cafeterias are commonly found in a wide range of settings, from schools and universities to workplaces, hospitals, and other public or private institutions. They offer a convenient and efficient way for people to enjoy a meal or snack without the need for full table service..A cafeteria is a type of food service establishment that provides a variety of prepared dishes and beverages to customers. Cafeterias are commonly found in a wide range of settings, from schools and universities to workplaces, hospitals, and other public or private institutions. They offer a convenient and efficient way for people to enjoy a meal or snack without the need for full table service..A cafeteria is a type of food service establishment that provides a variety of prepared dishes and beverages to customers. Cafeterias are commonly found in a wide range of settings, from schools and universities to workplaces, hospitals, and other public or private institutions. They offer a convenient and efficient way for people to enjoy a meal or snack without the need for full table service..A cafeteria is a type of food service establishment that provides a variety of prepared dishes and beverages to customers. Cafeterias are commonly found in a wide range of settings, from schools and universities to workplaces, hospitals, and other public or private institutions. They offer a convenient and efficient way for people to enjoy a meal or snack without the need for full table service..",
    },
    {
        title: "Library",
        desc: "A library is a sanctuary of knowledge and imagination, a haven for the curious, and a cornerstone of any educated society. It is a place where books, information, and ideas come to life, providing a wealth of resources to people of all ages and backgrounds. The significance of libraries in our world cannot be overstated, and they have been a fundamental part of human civilization for centuries.",
    },
    {
        title: "Library",
        desc: "A library is a sanctuary of knowledge and imagination, a haven for the curious, and a cornerstone of any educated society. It is a place where books, information, and ideas come to life, providing a wealth of resources to people of all ages and backgrounds. The significance of libraries in our world cannot be overstated, and they have been a fundamental part of human civilization for centuries.",
    },

]


const History = () => {
    return (
        <>
            {history.map((his) => (
                <div className="flex flex-col gap-7.5">
                    <div className="dark:border-strokedark dark:bg-strokedark my-7 flex w-full border-l-6 border-[#34D399] bg-[#34D399] bg-opacity-[15%] px-7 py-8 shadow-md dark-bg-[#1B1B24] dark-bg-opacity-30 md-p-9">
                        <div className="mr-5 flex h-9 w-full max-w-[36px] items-center justify-center rounded-lg bg-[#34D399]">
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
                        <div className="w-full ">
                            <h5 className="font-satoshi text-2xl font-bold text-primary dark:text-white ">
                                {his.title}
                            </h5>
                            <p className="font-satoshi text-body  text-lg dark:text-bodydark1 leading-7">
                                {his.desc}
                            </p>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};

export default History;
