import TestimonialCard from "../card/TestimonialCard";

const AboutCarouselSection = () => {
  return (
    <section className="py-32 bg-white">
      <div className="container mx-auto">
        <div className="mx-auto w-[90%]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <TestimonialCard />
            <TestimonialCard />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutCarouselSection;
