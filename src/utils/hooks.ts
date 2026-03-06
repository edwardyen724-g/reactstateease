import { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

interface FormValues {
  [key: string]: any;
}

export function useCustomForm<T extends FormValues>(defaultValues: T, onSubmit: SubmitHandler<T>) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<T>({ defaultValues });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitHandler = async (data: T) => {
    setIsSubmitting(true);
    try {
      await onSubmit(data);
      reset();
    } catch (err) {
      console.error(err instanceof Error ? err.message : String(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    // Handle side effects or additional logic as needed
  }, [errors]);

  return {
    register,
    handleSubmit: handleSubmit(submitHandler),
    errors,
    isSubmitting,
  };
}