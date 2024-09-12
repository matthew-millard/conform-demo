type FormErrorsProps = {
  form: {
    errors?: string[];
    errorId: string;
  };
};

export default function FormErrors({ form }: FormErrorsProps) {
  return (
    <ul id={form.errorId}>
      {form?.errors?.map((error, index) => (
        <li className="error-message" key={`${error}-${index}`}>
          {error}
        </li>
      ))}
    </ul>
  );
}
