"use client";

import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/app/firebase";
import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { FaXTwitter, FaThreads } from "react-icons/fa6";
import { Skeleton } from "@/components/ui/skeleton";
import "./project.css";
import { PackagePlusIcon } from "lucide-react";
// import Like from "@/components/like";

type DeveloperData = {
  id: string;
  textVal: string;
  thumnailsUrl: string;
  github?: string;
  portfolio: string;
  descriptionTest: string;
  twitter?: string;
  thread?: string;
}[];

const Project = (props: DeveloperData) => {
  const [developerData, setDeveloperData] = useState<DeveloperData>([]);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    try {
      const project = collection(db, "developersInfo");
      const datadb = await getDocs(project);
      console.log(datadb); // Check the data received from the database
      const allInfo = datadb.docs.map((val) => ({
        id: val.id,
        textVal: val.data().textVal,
        thumnailsUrl: val.data().thumnailsUrl,
        github: val.data().github,
        portfolio: val.data().portfolio,
        descriptionTest: val.data().descriptionTest,
        twitter: val.data().twitter,
        thread: val.data().thread,
      }));
      setDeveloperData(allInfo);
      setLoading(false); // Set loading to false when data is fetched
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false); // Set loading to false even in case of an error
    }
  };

  useEffect(() => {
    getData();
  }, []);

  if (loading) {
    return (
      <>
        <div className="overlay" id="overlay"></div>
        <div className="loaded">
          <div className="loader-cube">
            <div className="face"></div>
            <div className="face"></div>
            <div className="face"></div>
            <div className="face"></div>
            <div className="face"></div>
            <div className="face"></div>
          </div>
          <p className="text-white text-sm mt-8">loading....</p>
        </div>
      </>
    );
  }

  return (
    <div className="p-20 flex flex-wrap gap-6 ">
      {developerData.map((value) => (
        <div
          className="card card-compact w-[20rem] bg-base-100 shadow-xl p-4 sm:w-[25rem]"
          key={value.id}
        >
          <button className="mail"></button>
          <div className="thumbnail">
            <Image
              src={value.thumnailsUrl}
              alt={`thumbnail of ${value.textVal}`}
              className="img w-[580px] h-[380px] rounded-xl"
              width={100}
              height={100}
              layout="responsive"
              objectFit="cover"
              quality={100}
              priority
              loading="eager"
              placeholder="blur"
              blurDataURL={value.thumnailsUrl}
            />
          </div>
          <div className=" card-body">
            <h1 className="card-title text-white text-bold text-1xl">{value.textVal}</h1>
            <p className="about-me text-white text-md  text-bold ">
              Build with: {value.descriptionTest}
            </p>
          </div>
          <div className="bottom-bottom flex items-center justify-between">
            <div className="social-links-container flex gap-2 items-center text-white">
              {value.github ? (
                <Link href={value.github}>
                  <FaGithub className="h-8 w-8 fa" />
                </Link>
              ) : null}
              {value.twitter ? (
                <Link href={value.twitter}>
                  <FaXTwitter className="h-8 w-8 fa" />
                </Link>
              ) : null}
              {value.thread ? (
                <Link href={value.thread}>
                  <FaThreads className="h-8 w-8 fa" />
                </Link>
              ) : null}
            </div>
            {/* <Like/> */}
            <Link href={value.portfolio}>
              <button className="btn btn-ghost ">
                <FaExternalLinkAlt /> view
              </button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Project;
