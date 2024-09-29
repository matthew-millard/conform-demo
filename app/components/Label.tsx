import classNames from '~/utils/classNames';

type LabelProps = {
  htmlFor: string;
  text: string;
  classes?: string;
};

export default function Label({ htmlFor, text, classes }: LabelProps) {
  const combinedClasses = classNames('block text-sm font-semibold leading-6 text-on-surface', classes ? classes : '');
  return (
    <label htmlFor={htmlFor} className={combinedClasses}>
      {text}
    </label>
  );
}
