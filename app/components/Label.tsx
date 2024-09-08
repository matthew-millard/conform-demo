type LabelProps = {
  htmlFor: string;
  text: string;
  classNames?: string;
};

export default function Label({ htmlFor, text, classNames }: LabelProps) {
  return (
    <label htmlFor={htmlFor} className={classNames}>
      {text}
    </label>
  );
}
