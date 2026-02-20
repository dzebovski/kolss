import {z} from 'zod';

export const contactSchema = z.object({
  name: z.string().min(2, 'Вкажіть імʼя'),
  phone: z.string().min(6, 'Вкажіть номер телефону'),
  email: z.string().email('Некоректний email').optional().or(z.literal('')),
  message: z.string().min(10, 'Опишіть коротко ваш запит'),
  preferredContact: z.enum(['phone', 'telegram', 'email']),
  budget: z.string().optional(),
  file: z.instanceof(File).optional().nullable()
});

export type ContactFormValues = z.infer<typeof contactSchema>;
