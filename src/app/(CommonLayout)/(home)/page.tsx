import { LeatestBlogs } from "@/components/modules/blogs/LeatestBlogs";
import FeaturedSection from "@/components/modules/home/FeaturedSection/FeaturedSection";
import HeroSection from "@/components/modules/home/HeroSection";
import OfferCarousel from "@/components/modules/home/offerCarousel";
import TestimonialSection from "@/components/modules/home/Testimonials/TestimonialSections";

const HomePage = () => {
  return (
    <>
      {/* <Navbar /> */}

      <main className="min-h-screen">
        <HeroSection />
        <OfferCarousel />
        <FeaturedSection />
        <LeatestBlogs />
        <TestimonialSection />
      </main>
      {/* <Footer /> */}
    </>
  );
};

export default HomePage;
