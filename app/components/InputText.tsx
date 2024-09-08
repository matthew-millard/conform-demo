type InputTextProps = {
  fieldAttributes: React.InputHTMLAttributes<HTMLInputElement>;
};

export default function InputText({ fieldAttributes }: InputTextProps) {
  return <input {...fieldAttributes} className="input-text" />;
}
