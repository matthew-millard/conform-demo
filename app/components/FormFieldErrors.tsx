import type { FieldMetadata } from '@conform-to/react';

export default function FormFieldErrors({ field }: { field: FieldMetadata }) {
  return (
    <div id={field?.errorId} className="text-error text-xs">
      {field?.errors ? (
        field.errors.map(error => <p key={error}>{error}</p>)
      ) : (
        <p>&nbsp;</p> // Empty space to maintain layout
      )}
    </div>
  );
}
