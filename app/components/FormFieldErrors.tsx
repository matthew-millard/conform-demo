import type { FieldMetadata } from '@conform-to/react';

export default function FormFieldErrors({ field }: { field: FieldMetadata }) {
  return (
    <div id={field?.errorId}>
      {field?.errors?.map(error => (
        <p className="error-message" key={error}>
          {error}
        </p>
      ))}
    </div>
  );
}
