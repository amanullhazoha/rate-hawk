import React from "react";
import { Field, ErrorMessage } from "formik";

const SelectInput = ({
  name,
  label,
  width,
  items,
  required,
}: {
  name: string;
  width?: string;
  label: string;
  required?: string;
  items: { id: string; title: string }[];
}) => {
  return (
    <div className={`mb-4 w-full`}>
      <label className="text-black-800">{label}</label>

      <div className="border border-border-primary rounded-lg  flex items-center gap-[10px] mt-2">
        <Field
          as="select"
          name={name}
          className="outline-none focus:outline-none border-none placeholder:text-blar placeholder:text-sm w-full h-full pl-4 pr-4 py-[14px] bg-transparent"
        >
          <option value="" label="Select an option" />
          {items.map((item) => (
            <option key={item.id} value={item.id}>
              {item.title}
            </option>
          ))}
        </Field>
      </div>

      <ErrorMessage
        name={name}
        component="div"
        className="text-red-500 text-sm mt-1"
      />
    </div>
  );
};

export default SelectInput;
