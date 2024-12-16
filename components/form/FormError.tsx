import { CircleAlert } from "lucide-react";

interface FormErrorProps {
  message?: string;
}

export const FormError: React.FC<FormErrorProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div
      className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-destructive text-sm"
      role="alert"
      aria-live="assertive"
    >
      <CircleAlert className="text-red-500 flex-shrink-0" aria-hidden="true" />
      <p>{message}</p>
    </div>
  );
};
