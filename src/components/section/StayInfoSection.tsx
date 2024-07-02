const StayInfoSection = ({
  description_struct,
}: {
  description_struct: any;
}) => {
  return (
    <div className="px-4 md:px-8 py-6 md:py-8 border border-border-primary rounded-[20px] mb-8">
      <div>
        <h3 className="text-2xl font-semibold text-black">Stay Information</h3>

        <p className="w-14 h-[1px] bg-border-primary mt-8 mb-8"></p>
      </div>

      {description_struct?.map((item: any, index: number) => (
        <div key={index}>
          <h4 className="text-base font-semibold text-black mb-2">
            {item?.title}
          </h4>

          {item?.paragraphs?.map((paragraph: string, index: number) => (
            <div
              key={index}
              className="text-base font-normal text-text-blar mb-5"
              dangerouslySetInnerHTML={{ __html: paragraph }}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default StayInfoSection;
