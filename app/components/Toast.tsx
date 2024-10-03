import { CheckCircleIcon, ExclamationCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { toast } from 'sonner';

export default function Toast({
  t,
  id,
  type,
  title,
  description,
}: {
  t: string | number;
  id: string;
  type: 'success' | 'message';
  title: string;
  description: string;
}) {
  const Icon = type === 'success' ? CheckCircleIcon : ExclamationCircleIcon;
  return (
    <div
      key={id}
      className="bg-surface flex items-start p-4 border gap-x-2 border-around-surface rounded-lg shadow-lg w-full max-w-sm"
    >
      <div className="flex-shrink-0">
        <Icon aria-hidden="true" className="h-6 w-6 text-green-400" />
      </div>
      <div className="ml-3 flex-1 pt-0.5">
        <p className="text-sm font-medium text-on-surface">{title}</p>
        <p className="mt-1 text-sm text-on-surface-variant">{description}</p>
      </div>
      <button onClick={() => toast.dismiss(t)}>
        <XMarkIcon className="w-5 h-5 text-on-surface-variant hover:text-on-surface" />
      </button>
    </div>
  );
}
