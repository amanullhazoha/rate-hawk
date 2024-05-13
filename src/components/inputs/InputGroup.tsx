interface Types {
  label: string;
  name: string;
  type: string;
  icon: React.ReactNode;
  placeholder: string;
}

const InputGroup = ({ label, name, type, icon, placeholder }: Types) => {
  return (
    <div>
      <label htmlFor={name} className="text-black-800">
        {label}
      </label>
      <div className="border border-border-primary rounded-lg  flex items-center pl-4 gap-[10px] mt-2">
        <div>{icon}</div>
        <input
          type={type}
          id={name}
          placeholder={placeholder}
          className="outline-none focus:outline-none border-none placeholder:text-blar placeholder:text-sm w-full h-full pr-4 py-[14px] bg-transparent"
        />
      </div>
    </div>
  );
};

export default InputGroup;
