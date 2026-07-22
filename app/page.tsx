import { Navbar } from "@/components/landing/navbar";
import { Hero } from "@/components/landing/hero";
import { CareerSearch } from "@/components/landing/career-search";
import { Categories } from "@/components/landing/categories";
import { FeaturedCareers } from "@/components/landing/featured-careers";
import { Stats } from "@/components/landing/stats";
import { HowItWorks } from "@/components/landing/how-it-works";
import { Testimonials } from "@/components/landing/testimonials";
import { FAQ } from "@/components/landing/faq";
import { Newsletter } from "@/components/landing/newsletter";
import { Footer } from "@/components/landing/footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <CareerSearch />
        <Stats />
        <Categories />
        <FeaturedCareers />
        <HowItWorks />
        <Testimonials />
        <FAQ />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
