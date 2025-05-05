import { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export default function Input({ label, className, error, ...props }: InputProps) {
  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-black mb-1">
        {label}
      </label>
      <input
        className={`
          block w-full text-black placeholder-gray-400
          rounded-md border-gray-300 shadow-sm
          focus:border-violet-500 focus:ring-violet-500
          disabled:cursor-not-allowed disabled:bg-gray-50
          ${error ? 'border-red-500' : ''}
          ${className || ''}
        `}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}
