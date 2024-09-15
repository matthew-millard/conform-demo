import { useFormAction, useNavigation } from '@remix-run/react';

export function useIsPending({
  formAction,
  formIntent,
  formMethod = 'POST',
  state = 'non-idle',
}: {
  formAction?: string;
  formIntent: string;
  formMethod?: 'POST' | 'GET' | 'PUT' | 'PATCH' | 'DELETE';
  state?: 'submitting' | 'loading' | 'non-idle';
}) {
  const contextualFormAction = useFormAction();
  const navigation = useNavigation();

  const isPendingState = state === 'non-idle' ? navigation.state !== 'idle' : navigation.state === state;

  const currentIntent = formIntent;

  const navigationMatchesIntent = navigation.formData?.get('intent') === currentIntent;

  return (
    isPendingState &&
    navigation.formAction === (formAction ?? contextualFormAction) &&
    navigation.formMethod === formMethod &&
    navigationMatchesIntent
  );
}
