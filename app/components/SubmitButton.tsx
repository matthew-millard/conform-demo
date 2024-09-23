type SubmitButtonProps = {
  fieldAttributes: React.ButtonHTMLAttributes<HTMLButtonElement>;
  text: string;
  isPending: boolean;
  pendingText: 'Logging in...' | 'Signing up...';
};

export default function SubmitButton({ fieldAttributes, text, isPending, pendingText }: SubmitButtonProps) {
  return (
    <button
      type="submit"
      {...fieldAttributes}
      className="flex w-full justify-center rounded-md bg-button-primary-color px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-button-primary-color-hover disabled:bg-button-primary-color-disabled active:bg-button-primary-color-active focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring-color"
    >
      {isPending ? <PendingIndicator pendingText={pendingText} /> : text}
    </button>
  );
}

function PendingIndicator({ pendingText }: { pendingText: string }) {
  return (
    <span className="flex items-center">
      <svg
        className="-ml-1 mr-3 h-5 w-5 animate-spin text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        aria-hidden="true"
        role="status"
      >
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
      {pendingText}
    </span>
  );
}
