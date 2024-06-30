import { Field, ErrorMessage } from "formik";
import PassEyeIcon from "@/assets/icons/PassEyeIcon";

interface Types {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

const InputGroup = ({
  label,
  name,
  icon,
  placeholder,
  type = "text",
  disabled = false,
}: Types) => {
  return (
    <div>
      <label htmlFor={name} className="text-black-800">
        {label}
      </label>

      <div className="border border-border-primary rounded-lg  flex items-center pl-4 gap-[10px] mt-2">
        <div>{icon}</div>

        <Field
          name={name}
          type={type}
          disabled={disabled}
          placeholder={placeholder}
          className="outline-none focus:outline-none border-none placeholder:text-blar placeholder:text-sm w-full h-full pr-4 py-[14px] bg-transparent"
        />

        {type === "password" && (
          <button className="px-4">
            <PassEyeIcon />
          </button>
        )}
      </div>

      <ErrorMessage
        name={name}
        component="div"
        className="text-red-500 text-sm mt-1"
      />
    </div>
  );
};

export default InputGroup;
