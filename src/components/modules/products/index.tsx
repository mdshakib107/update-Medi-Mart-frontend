/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Image from "next/image";
import { useState } from "react";
import FilterSearch from "./AllProduct/filterSearch";
import InfiniteProductList from "./AllProduct/inifinityScroll";

const AllProducts = () => {
  const [filters, setFilters] = useState({
    searchTerm: "",
    category: "",
    symptoms: "",
  });

  const [showSidebar, setShowSidebar] = useState(false);

  const handleFilterChange = (newFilters: any) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  return (
    <div className="m-4 md:m-10">
      <h1 className="text-4xl font-extrabold text-center mb-10 bg-gradient-to-r from-[#4F46E5] to-rose-500 bg-clip-text text-transparent tracking-wide">
        Explore Our Medicine Collection
      </h1>

      <div>
        <div className="relative w-full aspect-[3/1] sm:aspect-[16/5] md:aspect-[16/4] lg:aspect-[16/3]">
          <Image
            src="https://i.ibb.co.com/Hy9Qp9c/skf-230300-esoral-mups-ln-1001.gif"
            alt="banner image"
            fill
            className="object-cover rounded-md"
            priority
          />
        </div>
        {/* Mobile Filter Toggle Button */}
        <div className="lg:hidden flex justify-end mb-4">
          <button
            onClick={() => setShowSidebar(true)}
            className=" border-2 px-4 py-2 rounded-md"
          >
            Filters
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-2">
          {/* Product List */}
          <div className="lg:col-span-4">
            <InfiniteProductList filters={filters} />
          </div>

          {/* Desktop Sidebar */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-2  p-4 ">
              <FilterSearch onFilterChange={handleFilterChange} />
            </div>
          </div>
        </div>

        {/* Mobile Sidebar Overlay */}
        <div
          className={`fixed inset-0  backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300 ${
            showSidebar
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
          onClick={() => setShowSidebar(false)}
        ></div>

        {/* Animated Mobile Sidebar */}
        <div
          className={`
          fixed top-0 right-0 w-3/4 sm:w-2/5 h-full bg-white shadow-lg z-50 p-4 overflow-y-auto
          transform transition-transform duration-300
          ${showSidebar ? "translate-x-0" : "translate-x-full"}
        `}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Filters</h2>
            <button
              onClick={() => setShowSidebar(false)}
              className="text-red-500 font-bold text-lg"
            >
              ✕
            </button>
          </div>
          <FilterSearch onFilterChange={handleFilterChange} />
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
