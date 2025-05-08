/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
// components/ProductCard.tsx
import { Button } from "@/components/ui/button";
import { addProduct } from "@/redux/features/cartSlice";
import { useAppDispatch } from "@/redux/hooks";
import { TMedicine } from "@/types";
import { ShoppingCart, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const ProductCard = ({ medicine }: { medicine: TMedicine }) => {
  const dispatch = useAppDispatch();

  const handleAddProduct = (medicine: TMedicine) => {
    toast.success("Product Added Succesfully");
    dispatch(addProduct(medicine));
  };

  const router = useRouter();

  const handleBuyNow = (e: any) => {
    e.preventDefault(); //  Prevent <Link> default nav
    e.stopPropagation(); //  Prevents the Link from triggering / event bubbling
    handleAddProduct(medicine);
    router.push(`/cart`);
  };

  return (
    <div className="border p-4 rounded-md shadow-blue-200 transition-all duration-500 ease-in-out hover:-translate-y-2 hover:shadow-lg flex flex-col">
      <Link href={`/shop/${medicine?._id}`}>
        <div className="relative w-full h-64 overflow-hidden rounded-md group">
          <Image
            src={medicine?.Img as string}
            alt={medicine?.name}
            fill
            sizes="(max-width: 768px) 80vw,
       (max-width: 800px) 50vw,
       33vw"
            className="object-cover rounded-md transition-transform duration-300 group-hover:scale-110"
          />
        </div>
        <h4 className="font-semibold text-sm mt-2">{medicine?.name}</h4>
        <p className="font-bold mt-2">${medicine?.price}</p>
      </Link>
      {/* Buttons */}
      <div className=" flex items-center justify-between  mt-4 space-x-4">
        <Button
          onClick={handleBuyNow}
          variant="outline"
          className="flex items-center gap-2 cursor-pointer"
        >
          <Zap className="" />
          Buy
        </Button>
        <Button
          onClick={() => handleAddProduct(medicine)}
          variant="outline"
          className="flex items-center gap-2 cursor-pointer"
        >
          <ShoppingCart className="" />
          Add
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
