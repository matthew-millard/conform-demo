import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  InformationCircleIcon,
  XCircleIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { toast } from 'sonner';

export type ToastProps = {
  id: string | number;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  description: string;
};

export default function Toast({ id, type, title, description }: ToastProps) {
  const icons = {
    success: <CheckCircleIcon className="text-green-500" />,
    info: <InformationCircleIcon className="text-blue-500" />,
    warning: <ExclamationCircleIcon className="text-yellow-500" />,
    error: <XCircleIcon className="text-red-500" />,
  };
  const icon = icons[type];

  return (
    <div key={id} className="bg-surface flex items-start p-4 border border-around-surface rounded-lg shadow-lg w-full">
      <div className="flex-shrink-0 h-6 w-6">{icon}</div>
      <div className="ml-3 flex-1 pt-0.5">
        <p className="text-sm font-medium text-on-surface">{title}</p>
        <p className="mt-1 text-sm text-on-surface-variant">{description}</p>
      </div>
      <button onClick={() => toast.dismiss(id)} className="ml-3">
        <XMarkIcon className="w-5 h-5 text-on-surface-variant hover:text-on-surface" />
      </button>
    </div>
  );
}
