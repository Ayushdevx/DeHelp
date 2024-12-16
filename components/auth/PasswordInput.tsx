import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { 
  FormControl, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface PasswordInputProps {
  field: any;
  label: string;
  placeholder: string;
  onPaste?: (e: React.ClipboardEvent<HTMLInputElement>) => void;
  showPassword?: boolean;
  onToggleVisibility?: () => void;
}

export const PasswordInput: React.FC<PasswordInputProps> = ({
  field,
  label,
  placeholder,
  onPaste,
  showPassword = false,
  onToggleVisibility
}) => {
  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <FormControl>
        <div className="relative">
          <Input 
            type={showPassword ? "text" : "password"} 
            placeholder={placeholder} 
            {...field} 
            onPaste={onPaste}
            className="transition-all duration-300 ease-in-out hover:border-primary focus:border-primary focus:ring-primary pr-10"
          />
          {onToggleVisibility && (
            <button
              type="button"
              onClick={onToggleVisibility}
              className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-600"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          )}
        </div>
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};