import * as React from 'react';

const genInfo = [
    {
        title: "Cafteria",
        desc: "A cafeteria is a type of food service establishment that provides a variety of prepared dishes and beverages to customers. Cafeterias are commonly found in a wide range of settings, from schools and universities to workplaces, hospitals, and other public or private institutions. ",
    },
    {
        title: "Library",
        desc: "A library is a sanctuary of knowledge and imagination, a haven for the curious, and a cornerstone of any educated society. It is a place where books, information, and ideas come to life, providing a wealth of resources to people of all ages and backgrounds.",
    },
    {
        title: "Dormitory",
        desc: "A is a vital component of the college experience for many students. It serves as a temporary residence during their time at a college or university, providing not only a place to sleep but also an environment for learning, personal growth, and social interaction.",
    },
    {
        title: "Cafteria",
        desc: "A cafeteria is a type of food service establishment that provides a variety of prepared dishes and beverages to customers. Cafeterias are commonly found in a wide range of settings, from schools and universities to workplaces, hospitals, and other public or private institutions. ",
    },
    {
        title: "Library",
        desc: "A library is a sanctuary of knowledge and imagination, a haven for the curious, and a cornerstone of any educated society. It is a place where books, information, and ideas come to life, providing a wealth of resources to people of all ages and backgrounds.",
    },
    {
        title: "Dormitory",
        desc: "A is a vital component of the college experience for many students. It serves as a temporary residence during their time at a college or university, providing not only a place to sleep but also an environment for learning, personal growth, and social interaction.",
    },
    {
        title: "Cafteria",
        desc: "A cafeteria is a type of food service establishment that provides a variety of prepared dishes and beverages to customers. Cafeterias are commonly found in a wide range of settings, from schools and universities to workplaces, hospitals, and other public or private institutions. ",
    },
    {
        title: "Library",
        desc: "A library is a sanctuary of knowledge and imagination, a haven for the curious, and a cornerstone of any educated society. It is a place where books, information, and ideas come to life, providing a wealth of resources to people of all ages and backgrounds.",
    },
    {
        title: "Dormitory",
        desc: "A is a vital component of the college experience for many students. It serves as a temporary residence during their time at a college or university, providing not only a place to sleep but also an environment for learning, personal growth, and social interaction.",
    },
];




const GeneralInfo = () => {
    return (
        <div class="grid grid-cols-1 gap-7.5 sm:grid-cols-2 xl:grid-cols-3">
            {
                genInfo.map((info, index) => (
                    <div class="rounded-lg border border-stroke bg-white shadow  shadow-stroke dark:border-strokedark dark:bg-boxdark">
                        <div class="border-b border-stroke p-5 px-7.5 dark:border-strokedark">
                            <h4 class=" font-satoshi text-2xl font-bold text-primary dark:text-white">
                                <a href="#">{info.title}</a>
                            </h4>
                        </div>
                        <div class="px-7.5 pt-6 pb-9">
                            <p class="font-satoshi text-body  text-lg dark:text-bodydark1 leading-7">
                                {info.desc}
                            </p>
                        </div>
                    </div>
                ))}
        </div>
    );
}

export default GeneralInfo;
