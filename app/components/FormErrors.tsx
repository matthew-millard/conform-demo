import { FormMetadata } from '@conform-to/react';

type FormErrorsProps = Pick<FormMetadata, 'errorId' | 'errors'>;

export default function FormErrors({ errorId, errors }: FormErrorsProps) {
  return (
    <div className="text-red-600 text-xs">
      {errors?.length ? (
        <ul id={errorId}>
          {errors.map(error => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      ) : (
        <p>&nbsp;</p>
      )}
    </div>
  );
}
