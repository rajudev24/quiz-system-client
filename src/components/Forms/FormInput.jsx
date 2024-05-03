import { Controller, useFormContext } from "react-hook-form";

const FormInput = ({
  name,
  type,
  value,
  placeholder,
  label,
  required,
  errorMessage,
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const error = errors[name];
  return (
    <>
      <label htmlFor={name} className="mb-0.5">
        {label}
      </label>
      <br />
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <div>
            <input
              className="w-full px-3 py-2 border leading-tight focus:outline-none focus:shadow-outline rounded-md"
              type={type}
              placeholder={placeholder}
              {...field}
              value={value ? value : field.value}
              required={required}
            />
            {error && <p className="text-red-500">{error.message}</p>}
          </div>
        )}
      />
    </>
  );
};

export default FormInput;
