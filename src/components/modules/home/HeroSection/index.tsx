"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import styles from "./HeroSection.module.css";

const HeroSection = () => {
  // navigation
  const router = useRouter();

  return (
    <div
      className={`${styles.banner} container mx-auto border-2 border-white rounded-3xl  relative`}
    >
      <div className="absolute inset-0 rounded-3xl container mx-auto h-[500px] opacity-60 bg-gradient-to-r from-indigo-500 via-gray-800 to-purple-400"></div>

      <div className="flex flex-col items-center justify-center text-center px-6 py-20 md:py-32">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
          Welcome to <span className="text-pink-400">Medi</span>
          <span className="text-blue-500">Mart</span>
        </h1>
        <p className="text-lg md:text-xl text-white drop-shadow-lg font-semibold max-w-2xl mb-10">
          Your one-stop destination for affordable and trusted medical products
          delivered with care.
        </p>

        {/* <CustomButton textName="Shop Now" handleAnything={()=> router.push("/shop")}/> */}

        <Button
          variant="outline"
          className="bg-transparent text-white drop-shadow-lg hover:text-black h-12 z-10"
          onClick={() => router.push("/shop")}
        >
          Shop Now
        </Button>
        <div className="herosection-bottom absolute left-0 top-auto bottom-10 w-full text-center">
          <a
            className="cursor-pointer  text-xs font-medium uppercase tracking-widest transition-all text-white hover:text-pink-400 flex justify-center items-center"
            href="#offer"
          >
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 24 24"
              className="inline animate-bounce text-base"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12.9999 16.1716L18.3638 10.8076L19.778 12.2218L11.9999 20L4.22168 12.2218L5.63589 10.8076L10.9999 16.1716V4H12.9999V16.1716Z"></path>
            </svg>
            <span className="pl-2">Scroll Down</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
