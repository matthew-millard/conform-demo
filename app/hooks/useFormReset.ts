import { useEffect, useRef } from 'react';
import { useIsPending } from './useIsPending';

export function useFormReset({ formIntent }: { formIntent: string }) {
  const isPending = useIsPending({ formIntent });
  const ref = useRef<HTMLFormElement>(null);
  useEffect(() => {
    if (isPending) {
      ref.current?.reset();
    }
  }, [isPending]);

  return ref;
}
