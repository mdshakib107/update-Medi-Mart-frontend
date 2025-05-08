// components/home/TestimonialSection.tsx

"use client";

import Image from "next/image";
import Link from "next/link";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const banners = [
  {
    id: 1,
    image:
      "https://i.ibb.co.com/qYb5TVQr/e1da42bb11b9779edf66369a07cbd957-279525-0.jpg",
    timg: "",
  },
  {
    id: 2,

    image: "https://i.ibb.co.com/cShKF5LK/renata-230700-maxpro-mups-ln-a.jpg",
    timg: "",
  },
  {
    id: 3,

    image:
      "https://mercury.akamaized.net/i/aa27a63246dfb62511c33a8b227e39fa_100354_0.png",
    timg: "",
  },
  {
    id: 4,

    image: "https://i.ibb.co.com/zTfv130X/rpl-230801-efodio-ln-b.png",
    timg: "",
  },
  {
    id: 5,
    name: "Mr. D' Costa",

    image: "https://i.ibb.co.com/b5ZvBRDy/everest-221100-itokine-ln-1001.jpg",
    timg: "",
  },
  {
    id: 6,
    name: "Tariq Hasan",
    image:
      "https://mercury.akamaized.net/i/aa27a63246dfb62511c33a8b227e39fa_100354_0.png",
    timg: "",
  },
];
const cards = [
  {
    icon: "https://www.netmeds.com/assets/gloryweb/images/icons/Wellnessnew.svg",
    title: "Order Medicine",
    discount: "Save Upto 25% off",
  },
  {
    icon: "https://www.netmeds.com/assets/gloryweb/images/icons/Beautynew.svg",
    title: "Beauty",
    discount: "Save Upto 40% off",
  },
  {
    icon: "https://www.netmeds.com/assets/gloryweb/images/icons/ordermedicinnew.svg",
    title: "Wellness",
    discount: "Upto 60% off",
  },
];
const OfferCarousel = () => {
  return (
    <div id="offer" className="">
      <div className="flex items-center justify-center p-10">
        <div className="w-[90%] max-w-screen-xl mx-auto ">
          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            autoplay={{ delay: 4000 }}
            pagination={{ clickable: true }}
            navigation
            loop
            spaceBetween={10}
            className="w-full"
          >
            {banners.map((banner) => (
              <SwiperSlide key={banner.id}>
                <div className="relative w-full aspect-[3/1] sm:aspect-[16/5] md:aspect-[16/4] lg:aspect-[16/3]">
                  <Link href="/offers">
                    <Image
                      src={banner.image}
                      alt="banner image"
                      fill
                      className="object-cover rounded-md"
                      priority
                    />
                  </Link>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      <div className=" bg-gray-50 flex items-center justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-6xl">
          {cards.map((card, index) => (
            <div
              key={index}
              className="flex items-center p-5 bg-white shadow-md rounded-xl hover:shadow-lg transition-all cursor-pointer"
            >
              <div className="w-16 h-16 relative mr-4">
                <Image
                  src={card.icon}
                  alt={card.title}
                  layout="fill"
                  objectFit="contain"
                />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {card.title}
                </h3>
                <p className="text-green-600 font-medium">{card.discount}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OfferCarousel;
