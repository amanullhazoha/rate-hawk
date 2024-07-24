const Preloader = ({ title }: { title: string }) => {
  return (
    <div className="container px-2.5 mx-auto mb-5 flex flex-col justify-center">
      <p className="text-center mb-2 text-lg font-medium text-black">{title}</p>

      <div className="w-full md:w-[50%] lg:w-[40%] mx-auto h-auto flex justify-center items-center">
        <div className="w-full h-[10px] border-orange-500 rounded-[20px] bg-blue-300">
          <div className="h-[10px] rounded-[20px] bg-yellow-300 animate-loading"></div>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
