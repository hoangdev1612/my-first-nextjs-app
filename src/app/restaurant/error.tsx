"use client";
import Image from "next/image";
import errorImage from "../../../public/icons/error.png";
const Error = ({ error }: { error: Error }) => {
  return (
    <div className="h-screen bg-gray-200 flex items-center justify-center text-red-500">
      <Image src={errorImage} alt="error" className="w-56 mb-8" />
      <div className="bg-white px-9 py-14 shadow rounded">
        <h3 className="text-3xl font-bold">Oops!</h3>
        <p className="text-lg font-light">{error.message}</p>
        <p className="text-lg font-light">Please try again later.</p>
        <p className="text-lg font-light"> Error code: 400</p>
      </div>
    </div>
  );
};

export default Error;
