import type { FieldMetadata } from '@conform-to/react';

export default function FormFieldErrors({ field }: { field: FieldMetadata }) {
  return (
    <div id={field?.errorId}>
      {field?.errors?.map(error => (
        <p className="text-red-600 text-xs" key={error}>
          {error}
        </p>
      ))}
    </div>
  );
}
