import { CheckCircle } from "lucide-react";

interface FormSuccessProps {
  message?: string;
}

export const FormSuccess: React.FC<FormSuccessProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div
      className="bg-success/15 p-3 rounded-md flex items-center gap-x-2 text-success text-sm"
      role="alert"
      aria-live="polite"
    >
      <CheckCircle className="text-green-500 flex-shrink-0" aria-hidden="true" />
      <span>{message}</span>
    </div>
  );
};
