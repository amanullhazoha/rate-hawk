import FactCard from "../card/FactCard";

const FastFactSection = () => {
  return (
    <section className="pb-32 pt-10 bg-white">
      <div className="container mx-auto">
        <div className="mx-auto w-[90%]">
          <div className="w-full md:w-[40%] mb-11">
            <h3 className="text-4xl text-black-800 font-semibold mb-4">
              Fast Facts
            </h3>

            <p className="text-base font-normal text-text-blar">
              We’re impartial and independent, and every day we create
              distinctive, world-class programmes and content
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
            <FactCard />
            <FactCard />
            <FactCard />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FastFactSection;
