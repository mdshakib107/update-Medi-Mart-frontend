/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Loading from "@/components/shared/Loading";
import { getAllProducts } from "@/services/Product";
import { TMedicine } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ProductCard from "../../products/AllProduct/productCard";

const FeaturedSection = () => {
  const [products, setProducts] = useState<TMedicine[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchFeaturedProducts = async () => {
    try {
      const response = await getAllProducts("1", "100", {}); // fetching 100 to filter from
      const allProducts = response?.data?.result || [];

      setProducts(allProducts);
    } catch (error) {
      console.error("Failed to fetch featured products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  return (
    <section className="py-12 w-[90%]  mx-auto  md:px-0">
      <div className="mb-8 text-center">
        <h2 className="text-4xl font-extrabold text-center mb-2 bg-gradient-to-r from-[#4F46E5] to-rose-500 bg-clip-text text-transparent tracking-wide">
          Featured Products
        </h2>
        <p className="text-sm text-[#4F46E5]">
          Discover our top-selling in-stock items.
        </p>
      </div>
      <div className="text-end">
        <button
          className=" text-black drop-shadow-lg hover:text-gray-600 h-12 cursor-pointer font-semibold"
          onClick={() => router.push("/shop")}
        >
          View All
        </button>
      </div>
      {loading ? (
        <div className="text-center">
          <Loading />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-3">
          {products
            ?.sort((a: any, b: any) => {
              // First, prioritize in-stock items
              if (a.inStock !== b.inStock) {
                return a.inStock ? -1 : 1; // in-stock (true) comes before out-of-stock (false)
              }
              // Then sort by price (high to low)
              return b.price - a.price;
            }) // high to low
            ?.slice(0, 4) // just first 6 items from the response
            .map((medicine, index) => (
              <ProductCard
                key={`${medicine._id}-${index}`}
                medicine={medicine}
              />
            ))}
        </div>
      )}
    </section>
  );
};

export default FeaturedSection;
