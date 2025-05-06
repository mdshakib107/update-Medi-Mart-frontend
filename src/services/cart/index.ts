/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { IPartialOrder } from "@/types/cart";
import { cookies } from "next/headers";

export const createOrder = async (order: IPartialOrder, token: string) => {
  console.log(order);
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/orders/create-order`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
      }
    );
    // const data = await res.json();
    console.log(res);
    // return data;
    return await res.json();
  } catch (error: any) {
    return Error(error);
  }
};

export const addCoupon = async (
  couponCode: string,
  subTotal: number,
  shopId: string
) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/coupon/${couponCode}`,
      {
        method: "POST",
        headers: {
          Authorization: (await cookies()).get("accessToken")!.value,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderAmount: subTotal, shopId }),
      }
    );

    return await res.json();
  } catch (error: any) {
    return Error(error);
  }
};
