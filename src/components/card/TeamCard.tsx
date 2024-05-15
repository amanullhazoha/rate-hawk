import Image from "next/image";
import team from "@/assets/images/team.jpg";

const TeamCard = () => {
  return (
    <div>
      <Image src={team} alt="team" className="rounded-lg" />

      <div className="mt-4">
        <p className="text-black text-xl font-semibold">Noumita hadid</p>
        <p className="text-black text-base font-normal">
          Co-founder and Chief Executive
        </p>
      </div>
    </div>
  );
};

export default TeamCard;
