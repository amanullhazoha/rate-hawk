import DifferenceCard from "../card/DifferenceCard";

const DifferenceSection = () => {
  return (
    <section className="py-32 bg-white">
      <div className="container mx-auto">
        <div className="mx-auto w-[90%]">
          <h3 className="text-4xl text-black-800 font-semibold mb-4">
            Our Differences
          </h3>

          <div className="grid grid-cols-2">
            <DifferenceCard className="border-r pr-5" />
            <DifferenceCard className="pl-5" />
            <DifferenceCard className="border-r pr-5" />
            <DifferenceCard className="pl-5" />
            <DifferenceCard className="border-r pr-5 border-b-0" />
            <DifferenceCard className="pl-5 border-b-0" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DifferenceSection;
