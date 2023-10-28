import React, { useState } from 'react';

const faq = [
    {
        q: "How long we deliver your first blog post?",
        ans: "A cafeteria is a type of food service establishment that provides a variety of prepared dishes and beverages to customers. Cafeterias are commonly found in a wide range of settings, from schools and universities to workplaces, hospitals, and other public or private institutions. They offer a convenient and efficient way for people to enjoy a meal or snack without the need for full table service.",
    },
    {
        q: "Who holds the position of the dean at our college?  ",
        ans: "A library is a sanctuary of knowledge and imagination, a haven for the curious, and a cornerstone of any educated society. It is a place where books, information, and ideas come to life, providing a wealth of resources to people of all ages and backgrounds. The significance of libraries in our world cannot be overstated, and they have been a fundamental part of human civilization for centuries.",
    },
    {
        q: "Who serves as the chief of our dormitory?",
        ans: "A is a vital component of the college experience for many students. It serves as a temporary residence during their time at a college or university, providing not only a place to sleep but also an environment for learning, personal growth, and social interaction.",
    },
    {
        q: "Who serves as the chief of our dormitory?",
        ans: "A is a vital component of the college experience for many students. It serves as a temporary residence during their time at a college or university, providing not only a place to sleep but also an environment for learning, personal growth, and social interaction.",
    },
    {
        q: "Who serves as the chief of our dormitory?",
        ans: "A is a vital component of the college experience for many students. It serves as a temporary residence during their time at a college or university, providing not only a place to sleep but also an environment for learning, personal growth, and social interaction.",
    },
    {
        q: "Who serves as the chief of our dormitory?",
        ans: "A is a vital component of the college experience for many students. It serves as a temporary residence during their time at a college or university, providing not only a place to sleep but also an environment for learning, personal growth, and social interaction.",
    },
    // Add more FAQ items here
];

const Faq = () => {
    const [accordionOpen, setAccordionOpen] = useState(Array(faq.length).fill(false));

    const handleAccordionClick = (index) => {
        const newAccordionState = [...accordionOpen];
        newAccordionState[index] = !newAccordionState[index];
        setAccordionOpen(newAccordionState);
    };

    return (
        <div className="p-4 sm:p-6 xl:p-12.5">
            <div className="grid grid-cols-1 gap-4 md:gap-6 xl:grid-cols-2 xl:gap-7.5">
                {faq.map((f, index) => (
                    <div className="flex flex-col gap-6" key={index}>
                        <div
                            onClick={() => handleAccordionClick(index)}
                            className={`shadow  shadow-stroke rounded-md border border-stroke p-4 shadow-9 dark:border-strokedark dark:bg-boxdark dark:shadow-none sm:p-6 ${accordionOpen[index] ? 'bg-[#F3F5FC]' : ''}`}
                        >
                            <button className="flex w-full items-center gap-1.5 sm:gap-3 xl:gap-6">
                                <div className={`flex h-10.5 w-10.5 items-center justify-center rounded-md bg-[#F3F5FC] dark:bg-meta-4 ${accordionOpen[index] ? 'rotate-180' : ''}`}>
                                    <svg className="duration-200 ease-in-out fill-primary stroke-primary dark:fill-white dark:stroke-white" width="18" height="10" viewBox="0 0 18 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8.28882 8.43257L8.28874 8.43265L8.29692 8.43985C8.62771 8.73124 9.02659 8.86001 9.41667 8.86001C9.83287 8.86001 10.2257 8.69083 10.5364 8.41713L10.5365 8.41721L10.5438 8.41052L16.765 2.70784L16.771 2.70231L16.7769 2.69659C17.1001 2.38028 17.2005 1.80579 16.8001 1.41393C16.4822 1.1028 15.9186 1.00854 15.5268 1.38489L9.41667 7.00806L3.3019 1.38063L3.29346 1.37286L3.28467 1.36548C2.93287 1.07036 2.38665 1.06804 2.03324 1.41393L2.0195 1.42738L2.00683 1.44184C1.69882 1.79355 1.69773 2.34549 2.05646 2.69659L2.06195 2.70196L2.0676 2.70717L8.28882 8.43257Z" fill="" stroke=""></path>
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="font-medium text-black text-xl  dark:text-white">
                                        {f.q}
                                    </h4>
                                </div>
                            </button>

                            {accordionOpen[index] && (
                                <div className="  mt-5 ml-16.5 duration-200 ease-in-out ">
                                    <p className="font-satoshi text-body text-lg dark:text-bodydark1 leading-8">
                                        {f.ans}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>



        </div>
    );
};

export default Faq;
