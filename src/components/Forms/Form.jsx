import { useForm, FormProvider, useFormContext } from "react-hook-form";

const Form = ({ children, submithandler, defaultValues }) => {
  const fromConfig = {};
  if (!!defaultValues) fromConfig["defaultValues"] = defaultValues;
  const methods = useForm(fromConfig);
  const { handleSubmit, reset } = methods;
  const onSubmit = (data) => {
    submithandler(data);
    reset();
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
};

export default Form;
