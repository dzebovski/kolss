import {z} from 'zod';

const phoneRegex = /^\+?[0-9()\-\s]{9,20}$/;

export const leadFormSchema = z.object({
  name: z.string().min(2, 'Імʼя занадто коротке'),
  phone: z.string().regex(phoneRegex, 'Некоректний формат телефону')
});

export type LeadFormValues = z.infer<typeof leadFormSchema>;
