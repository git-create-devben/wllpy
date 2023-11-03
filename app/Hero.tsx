"use client"

import React, { useState } from "react";
import Header from "./Header";
import Project from "@/components/project/project";

interface HeroProps {
  setImageListProp: (newImageList: string[]) => void;
  setLinkProp: (newLink: { github: string; portfolio: string; social: string }) => void; // Include the setLinkProp function here
  githubLink: string;
  portfolioLink: string;
  socialLink: string;
  newLink: (github: string, portfolio: string, social: string ) => void
}

const Hero = ({ setImageListProp, setLinkProp, githubLink, portfolioLink, socialLink }: HeroProps) => {
  const [imageList, setImageList] = useState<string[]>(
    localStorage.getItem("imageList")
      ? JSON.parse(localStorage.getItem("imageList")!)
      : []
  );

  const handleImageListChange = (newImageList: string[]) => {
    setImageList(newImageList);
  };

  const handlesetLinkProp = (newLink: any) => {
    
  }

  return (
    // eslint-disable-next-line react/jsx-no-comment-textnodes
    <section>
      //@ts-ignore
      <Header setImageListProp={handleImageListChange}   setLinkProp={handlesetLinkProp}/>
      <div
        className="hero h-[30rem]"
        style={{
          backgroundImage:
            "url(https://daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.jpg)",
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h2 className=" text-8xl font-bold mb-2">
              <span className=" text-blue-500">W</span>
              <span className=" text-red-500">a</span>
              <span className=" text-green-500">l</span>
              <span className=" text-yellow-500">l</span>
              <span className=" text-purple-500">p</span>
              <span className=" text-pink-500">y</span>
              <span className=" text-orange-500">.</span>
            </h2>
            <p className="mb-5">
              A collections of developer portifolio <br />
              Developers inspire developers to build awesome portfolio
            </p>
            <div className="relative">
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full max-w-[50rem] "
              />
            </div>
          </div>
        </div>
      </div>
      <div className=" min-h-screen p-5">
      <Project
          imageList={imageList}
          setLinkProp={(newLink) => setLinkProp(newLink)} // Pass down the props here
          githubLink={githubLink}
          portfolioLink={portfolioLink}
          socialLink={socialLink}
        />
      </div>
    </section>
  );
      }

export default Hero;
