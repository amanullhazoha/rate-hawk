const ThinksToKnowSection = ({
  policy_struct,
  check_in_time,
  check_out_time,
}: {
  policy_struct: any;
  check_in_time?: string;
  check_out_time?: string;
}) => {
  return (
    <div className="p-8 border border-border-primary rounded-[20px]">
      <div>
        <h3 className="text-2xl font-semibold text-black">Things to know</h3>

        <p className="w-14 h-[1px] bg-border-primary mt-8 mb-8"></p>
      </div>

      {policy_struct?.map((item: any, index: number) => (
        <div key={index}>
          <h4 className="text-lg font-semibold text-black mb-4">
            {item?.title}
          </h4>

          {item?.paragraphs?.map((paragraph: string, index: number) => (
            <div
              key={index}
              className="text-base font-normal text-text-blar mb-2"
              dangerouslySetInnerHTML={{ __html: paragraph }}
            />
          ))}
        </div>
      ))}

      <p className="w-14 h-[1px] bg-border-primary mt-8 mb-8"></p>

      <p className="text-lg font-semibold text-black mb-4">
        Check in & Check out
      </p>

      <div className="p-3.5 rounded-md flex items-center justify-between bg-bg-primary w-full md:w-1/2">
        <p>Check-in</p>
        <p>{check_in_time}</p>
      </div>

      <div className="p-3.5 rounded-md flex items-center justify-between bg-white w-full md:w-1/2">
        <p>Check-out</p>
        <p>{check_out_time}</p>
      </div>
    </div>
  );
};

export default ThinksToKnowSection;
