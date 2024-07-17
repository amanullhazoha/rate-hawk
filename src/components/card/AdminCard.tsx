const AdminCard = ({ title, value }: { title: string; value: string }) => {
  return (
    <div className="bg-white shadow-md rounded-md py-4">
      <p className="text-center font-medium text-xl text-text-blar mb-4">
        {title}
      </p>

      <p className="text-lg font-medium text-black text-center">{value}</p>
    </div>
  );
};

export default AdminCard;
