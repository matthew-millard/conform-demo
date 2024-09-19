type InputTextProps = {
  fieldAttributes: React.InputHTMLAttributes<HTMLInputElement>;
};

export default function InputText({ fieldAttributes }: InputTextProps) {
  return (
    <input
      {...fieldAttributes}
      key={null}
      className="block w-full rounded-md bg-transparent border-0 py-1.5 pl-3 text-zinc-50 shadow-sm ring-1 ring-inset ring-zinc-200 focus:outline-none placeholder:text-zinc-600 focus:ring-2 focus:ring-inset focus:ring-violet-600 sm:text-sm sm:leading-6 aria-[invalid]:ring-red-600"
    />
  );
}
