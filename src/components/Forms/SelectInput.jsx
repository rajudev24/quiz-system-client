import { Controller, useFormContext } from "react-hook-form";

const SelectInput = ({
  name,
  options,
  value,
  placeholder,
  label,
  required,
}) => {
  const { control } = useFormContext();
  return (
    <>
      {label && (
        <label htmlFor={name} className="mb-0.5">
          {label}
        </label>
      )}
      <br />
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <select
            className="w-full px-3 py-2 border leading-tight focus:outline-none focus:shadow-outline rounded-md"
            {...field}
          >
            {placeholder && <option value="">{placeholder}</option>}
            {options?.map((option, index) => (
              <option required={required} key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )}
      />
    </>
  );
};

export default SelectInput;
