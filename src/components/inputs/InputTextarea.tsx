import { Field, ErrorMessage } from "formik";

interface InputTextAreaProps {
  name: string;
  rows?: number;
  label: string;
  required?: string;
  disabled?: boolean;
  placeholder?: string;
}

const InputTextArea = ({
  label,
  name,
  required,
  rows = 4,
  placeholder,
  disabled = false,
}: InputTextAreaProps) => {
  return (
    <div>
      <label htmlFor={name} className="text-black-800">
        {label} <span className="text-red-500">{required}</span>
      </label>

      <div className="border border-border-primary rounded-lg  flex items-center pl-4 gap-[10px] mt-2">
        <Field
          name={name}
          as="textarea"
          rows={rows}
          disabled={disabled}
          placeholder={placeholder}
          className="outline-none focus:outline-none border-none placeholder:text-blar placeholder:text-sm w-full h-full pr-4 py-[14px] bg-transparent"
        />
      </div>

      <ErrorMessage
        name={name}
        component="div"
        className="text-red-500 text-sm mt-1"
      />
    </div>
  );
};

export default InputTextArea;
