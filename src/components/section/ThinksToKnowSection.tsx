import { format, parse } from "date-fns";

const ThinksToKnowSection = ({
  policy_struct,
  check_in_time,
  check_out_time,
  metapolicy_extra_info,
}: {
  policy_struct: any;
  check_in_time?: string;
  check_out_time?: string;
  metapolicy_extra_info: string;
}) => {
  return (
    <div className="px-4 md:px-6 py-4 md:py-6 border border-border-primary rounded-[20px]">
      <div>
        <h3 className="text-2xl font-semibold text-black mb-4">
          Things to know
        </h3>

        {/* <p className="w-14 h-[1px] bg-border-primary mt-8 mb-8"></p> */}
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

      {metapolicy_extra_info && (
        <div>
          <h4 className="text-lg font-semibold text-black mb-4">
            Meta Policy Extra Info
          </h4>

          <div
            className="text-base font-normal text-text-blar mb-5"
            dangerouslySetInnerHTML={{ __html: metapolicy_extra_info }}
          />
        </div>
      )}

      <p className="w-14 h-[1px] bg-border-primary mt-8 mb-8"></p>

      <p className="text-lg font-semibold text-black mb-4">
        Check in & Check out
      </p>

      <div className="p-3.5 rounded-md flex items-center justify-between bg-bg-primary w-full md:w-1/2">
        <p>Check-in</p>
        <p>
          {check_in_time &&
            format(parse(check_in_time, "HH:mm:ss", new Date()), "HH:mm")}
        </p>
      </div>

      <div className="p-3.5 rounded-md flex items-center justify-between bg-white w-full md:w-1/2">
        <p>Check-out</p>
        <p>
          {check_out_time &&
            format(parse(check_out_time, "HH:mm:ss", new Date()), "HH:mm")}
        </p>
      </div>
    </div>
  );
};

export default ThinksToKnowSection;
