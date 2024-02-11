import * as React from 'react';
import { useState } from 'react';

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
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredInfo = genInfo.filter(info => info.title.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div>
            <input
                type="text"
                placeholder="Search office requirement here"
                value={searchTerm}
                onChange={handleSearch}
                className=" mt-6 sm:w-1/3 w-full pt-4 pb-3 px-3 py-4 mb-7  focus:outline-none  shadow-stroke rounded-lg border border-stroke  shadow-lg  dark:border-strokedark dark:bg-boxdark dark:shadow-none "
            />

            <div className="  grid grid-cols-1 gap-7.5 sm:grid-cols-2 xl:grid-cols-3">
                {
                    filteredInfo.map((info, index) => (
                        <div className=" sm:px-2 pt-1 shadow  shadow-stroke rounded-lg border border-stroke  shadow-9 dark:border-strokedark dark:bg-boxdark dark:shadow-none ">
                            <div className="border-b border-stroke py-5 sm:px-7.5 px-2 dark:border-body ">
                                <h4 className=" font-satoshi text-2xl font-bold text-primary dark:text-white">
                                    <a href="#">{info.title}</a>
                                </h4>
                            </div>
                            <div className="px-7.5 pt-6 pb-9">
                                <p className="font-satoshi font-md text-body text-lg dark:text-bodydark1 leading-7 text-justify">
                                    {info.desc}
                                </p>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
}



export default GeneralInfo;
