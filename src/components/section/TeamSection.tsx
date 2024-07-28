import TeamCard from "../card/TeamCard";

const TeamSection = () => {
  return (
    <section className="bg-yellow-bg py-16">
      <div className="container mx-auto">
        <div className="w-[90%] mx-auto">
          <div className="w-full md:w-[60%] mb-16 mx-auto">
            <h3 className="text-center text-4xl text-black-800 font-semibold mb-4">
              The Dynamic Team
            </h3>

            <p className="text-base text-black-600 text-center font-normal">
              Behind every great platform is a team of passionate individuals
              committed to excellence. Meet the talented minds behind [Your
              Hotel Booking Platform], each bringing unique expertise and energy
              to our shared mission:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <TeamCard />
            <TeamCard />
            <TeamCard />
            <TeamCard />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
