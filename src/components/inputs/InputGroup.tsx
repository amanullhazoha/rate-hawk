import { useState } from "react";
import { Field, ErrorMessage } from "formik";
import PassEyeIcon from "@/assets/icons/PassEyeIcon";
import EyeOpenIcon from "@/assets/icons/EyeOpenIcon";

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
  const [changeType, setChangeType] = useState(type);

  return (
    <div>
      <label htmlFor={name} className="text-black-800">
        {label}
      </label>

      <div className="border border-border-primary rounded-lg  flex items-center pl-4 gap-[10px] mt-2 relative">
        <div>{icon}</div>

        <Field
          name={name}
          type={changeType}
          disabled={disabled}
          placeholder={placeholder}
          className="outline-none focus:outline-none border-none placeholder:text-blar placeholder:text-sm w-full h-full pr-4 py-[14px] bg-transparent"
        />

        {type === "password" && (
          <button
            type="button"
            className="absolute right-2.5"
            onClick={() =>
              setChangeType((prev) => (prev === "text" ? "password" : "text"))
            }
          >
            {changeType === "text" ? <EyeOpenIcon /> : <PassEyeIcon />}
          </button>
        )}

        {/* {type === "password" && (
          <button className="px-4">
            <PassEyeIcon />
          </button>
        )} */}
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
