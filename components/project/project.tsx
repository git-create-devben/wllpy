import React from "react";
import "./project.css";
import Image from "next/image";
import { FaGithub } "react-icons/fa"

interface ProjectProps {
  imageList: string[];
  setLinkProp: (newLink: { github: string; portfolio: string; social: string }) => void; // Define the setLinkProp here
}


const Project: React.FC<ProjectProps> = ({ imageList, setLinkProp }) => {
  return (
    <main className="flex gap-4 flex-wrap">
      {/* If i over on this parent div the children div we show  */}
      {imageList.map((url, index) => (
        <div key={index} className="parent-div  bg-green-600 relative">
          <Image src={url} alt={`image-${index}`} width={450} height={100} />
          <div className=" child-div absolute bottom-0 right-0 w-[450px] h-[50px] bg-red-500 "></div>
        </div>
      ))}
    </main>
  );
};

export default Project;
