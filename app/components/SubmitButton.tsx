type SubmitButtonProps = {
  fieldAttributes: React.ButtonHTMLAttributes<HTMLButtonElement>;
  text: string;
};

export default function SubmitButton({ fieldAttributes, text }: SubmitButtonProps) {
  return (
    <button type="submit" {...fieldAttributes} className="submit-button">
      {text}
    </button>
  );
}
