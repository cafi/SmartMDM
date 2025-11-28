'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { DialogFooter } from '../ui/dialog';

const formSchema = z.object({
  name: z.string().min(1, {
    message: 'O nome do cliente é obrigatório.',
  }),
});

type AddCustomerFormValues = z.infer<typeof formSchema>;

interface AddCustomerFormProps {
  onSubmit: (values: AddCustomerFormValues) => void;
}

export function AddCustomerForm({ onSubmit }: AddCustomerFormProps) {
  const form = useForm<AddCustomerFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Nome do Cliente <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="Ex: Acme Corporation" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogFooter>
            <Button type="submit">Salvar</Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
