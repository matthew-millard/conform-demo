import { FormMetadata } from '@conform-to/react';

type FormErrorsProps = Pick<FormMetadata, 'errorId' | 'errors'>;

export default function FormErrors({ errorId, errors }: FormErrorsProps) {
  return errors?.length ? (
    <ul id={errorId}>
      {errors.map(error => (
        <li key={error} className="text-red-600 text-xs">
          {error}
        </li>
      ))}
    </ul>
  ) : null;
}
