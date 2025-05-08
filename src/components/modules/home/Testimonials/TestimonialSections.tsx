// components/home/TestimonialSection.tsx

"use client";

import { Star } from "lucide-react";
import Image from "next/image";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const testimonials = [
  {
    id: 1,
    name: "Mr. Jobayer",
    role: "Regular Customer",
    rating: 5,
    quote:
      "MediMart has made managing my health so much easier. Their fast delivery and top-notch service always impress me!",
    image: "https://avatars.githubusercontent.com/u/112149785?v=4",
  },
  {
    id: 2,
    name: "Dr. Sakib",
    role: "Physician",
    rating: 4,
    quote:
      "I often recommend MediMart to my patients. The range of quality medical products is unmatched!",
    image: "https://avatars.githubusercontent.com/u/73853966?v=4",
  },
  {
    id: 3,
    name: "Ms. Afrina",
    role: "Caring Sister",
    rating: 5,
    quote:
      "As a mom, I love the convenience and peace of mind MediMart gives me when buying baby and health products.",
    image:
      "https://img.freepik.com/foto-gratuito/silhouette-di-donne-con-bicicletta-e-bel-cielo_1150-5338.jpg",
  },
  {
    id: 4,
    name: "Mr Shoybal",
    role: "Pharmacy Owner",
    rating: 4,
    quote:
      "MediMart helped streamline my stock purchases with reliable service and great wholesale deals. Highly recommended!",
    image: "https://i.ibb.co.com/KNVKRLQ/model-boy.jpg",
  },
  {
    id: 5,
    name: "Mr. D' Costa",
    role: "Engineer",
    rating: 5,
    quote:
      "Ordering from MediMart is quick and effortless. I get my kid’s essentials delivered without the stress of shopping.",
    image: "https://avatars.githubusercontent.com/u/54356991?v=4",
  },
  {
    id: 6,
    name: "Tariq Hasan",
    role: "Busy Parent",
    rating: 4,
    quote:
      "Ordering from MediMart is quick and effortless. I get my kid’s essentials delivered without the stress of shopping.",
    image: "https://i.ibb.co.com/mHM9fJc/model-boy1.jpg",
  },
  {
    id: 7,
    name: "Maliha Ahmed",
    role: "Diabetic Patient",
    rating: 5,
    quote:
      "MediMart has been a blessing! I never miss my meds thanks to their timely reminders and easy subscription service.",
    image: "https://i.ibb.co.com/Cmxf0yL/model-girl8.jpg",
  },
];

const TestimonialSection = () => {
  return (
    <section className="py-16 text-center">
      <div className="container mx-auto px-4 md:px-0 w-[90%]">
        <h2 className="text-4xl font-extrabold text-center mb-2 py-2  bg-gradient-to-r from-[#4F46E5] to-rose-500 bg-clip-text text-transparent tracking-wide ">
          What People Say
        </h2>

        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000 }}
          loop
          spaceBetween={30}
          slidesPerView={1} // default mobile view
          breakpoints={{
            640: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3, // বড় স্ক্রিনে ৩টি করে দেখাবে
            },
          }}
          className="w-full"
        >
          {testimonials.map((t) => (
            <SwiperSlide key={t.id}>
              <div className="bg-white p-8 rounded-lg shadow-md h-[380px]  border">
                <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-primary mb-4">
                  <Image
                    src={t.image}
                    alt={t.name}
                    width={100}
                    height={100}
                    className="object-cover w-full h-full"
                  />
                </div>
                {/* Star Ratings */}
                <div className="flex items-center justify-center mb-2 text-yellow-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={
                        i < t.rating ? "text-yellow-400" : "text-gray-300"
                      }
                    />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="italic text-gray-600 text-base md:text-lg leading-relaxed relative px-4">
                  <span className="text-5xl text-[#4F46E5] font-serif absolute -left-4 top-[-10px]">
                    &ldquo;
                  </span>
                  {t.quote}
                  <span className="text-5xl text-[#4F46E5] font-serif absolute -right-4 bottom-[-10px]">
                    &rdquo;
                  </span>
                </blockquote>

                <p className="font-semibold text-lg">{t.name}</p>
                <p className="text-sm text-gray-500">{t.role}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default TestimonialSection;
