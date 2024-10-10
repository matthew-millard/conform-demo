import PendingIndicator from './PendingIndicator';

interface OutlineButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  isPending: boolean;
  pendingText: string;
}

export default function OutlineButton({ text, isPending, pendingText, ...props }: OutlineButtonProps) {
  return (
    <button
      {...props}
      disabled={isPending}
      className="text-primary text-sm font-semibold border border-primary hover:border-dodger-blue-600 active:border-dodger-blue-700  px-6 py-2 rounded-md hover:text-dodger-blue-600 active:text-dodger-blue-700 focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-surface outline-none dark:disabled:text-dodger-blue-900 dark:disabled:border-dodger-blue-900 disabled:border-dodger-blue-300 disabled:text-dodger-blue-300 disabled:cursor-not-allowed"
      onMouseDown={e => e.preventDefault()}
    >
      {isPending ? (
        <PendingIndicator pendingText={pendingText} color="dark:text-dodger-blue-900 text-dodger-blue-300" />
      ) : (
        text
      )}
    </button>
  );
}
