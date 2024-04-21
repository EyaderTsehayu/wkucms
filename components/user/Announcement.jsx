// const Announcement = () => {
//   return <div>Announcement</div>;
// };

// export default Announcement;
"use client"
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useEffect } from "react";
//import Author from "./_child/author";
//import fetcher from "../lib/fetcher";
//import Spinner from "./_child/spinner";
//import Error from "./_child/error";

const posts = [
  {
    id: 1,
    title: "The best CMS ever launched",
    value:
      " We are thrilled to announce the launch of our cutting-edge Clearance Management System, a powerful and efficient solution designed to streamline and simplify the clearance process for all members of our university.",
    image: "/images/cover/announcement.png",

    published: "23-10-2023",
    author: "Richard Hendrics",
  },
  {
    id: 2,
    title: "The best CMS ever launched",
    value:
      " We are thrilled to announce the launch of our cutting-edge Clearance Management System, a powerful and efficient solution designed to streamline and simplify the clearance process for all members of our university.",
    image: "/images/cover/announcement.png",
    published: "23-10-2023",
    author: "Richard Hendrics",
  },
  {
    id: 3,
    title: "The best CMS ever launched",
    value:
      " We are thrilled to announce the launch of our cutting-edge Clearance Management System, a powerful and efficient solution designed to streamline and simplify the clearance process for all members of our university.",
    image: "/images/cover/announcement.png",
    published: "23-10-2023",
    author: "Richard Hendrics",
  },
];



const Announcement = () => {
  const [announcement, setAnnouncement] = useState([]);

  useEffect(() => {
    const fetchannouncement = async () => {
      try {
        const response = await fetch("/api/postAnnouncement");
        const data = await response.json();

        if (response.ok) {
          setAnnouncement(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchannouncement();
  }, [announcement]);
console.log("fetch announcement",announcement);
  return (
    <section className="px-12">
      <h1 className="lg:text-left lg:text-4xl text-2xl lg:pb-8 pb-4 lg:mt-12 text-center md:mt-2 mt-4 lg:font-extrabold font-bold  text-primary dark:text-whiten">
        Latest Announcements
      </h1>

      {/* grid columns */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 md:gap-14 gap-2 ">
        {announcement.map((post) => (
          <div key={post.id} className="mb-4">
            <div className="images">
              <Image
                alt="announcement"
                src={post.image}
                className=" rounded-md"
                width={400}
                height={300}
                style={{ width: "400px", height: "300px" }}
              />
            </div>
            <div className="info flex justify-center flex-col pt-6 ">
              <div className="flex flex-row justify-between">
                <p>
                  <a className="text-graydark  dark:text-white md:font-medium font-normal ">
                    {post.announcerName}
                  </a>
                </p>
                <p>
                  <a className="text-graydark dark:text-white md:font-normal font-light">
                    {post.announcementDate}
                  </a>
                </p>
              </div>
              <div className="flex pt-2">
                <p>
                  <a className="text-xl font-bold dark:text-white text-body ">
                    {post.title}
                  </a>
                </p>
              </div>
              <p className="py-3 text-justify">{post.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Announcement;
