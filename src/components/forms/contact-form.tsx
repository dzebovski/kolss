'use client';

import {zodResolver} from '@hookform/resolvers/zod';
import {motion, AnimatePresence} from 'framer-motion';
import {Loader2, Send} from 'lucide-react';
import {useState} from 'react';
import {useForm} from 'react-hook-form';

import {submitContactFromFormData} from '@/src/actions/contact';
import {Button} from '@/src/components/ui/button';
import {Input} from '@/src/components/ui/input';
import {Label} from '@/src/components/ui/label';
import {Textarea} from '@/src/components/ui/textarea';
import {contactSchema, type ContactFormValues} from '@/src/lib/validation/contact';

const fieldMotion = {
  hidden: {opacity: 0, y: 16},
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {delay: index * 0.06, duration: 0.35, ease: 'easeOut'}
  })
};

export function ContactForm() {
  const [serverMessage, setServerMessage] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: {errors, isSubmitting, isSubmitSuccessful}
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      message: '',
      budget: '',
      preferredContact: 'phone',
      file: null
    }
  });

  const onSubmit = async (values: ContactFormValues) => {
    setServerMessage(null);
    setSubmitError(null);

    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('phone', values.phone);
    formData.append('email', values.email ?? '');
    formData.append('message', values.message);
    formData.append('preferredContact', values.preferredContact);
    formData.append('budget', values.budget ?? '');
    if (values.file) {
      formData.append('file', values.file);
    }

    const result = await submitContactFromFormData(formData);

    if (!result.success) {
      setSubmitError(result.message);
      return;
    }

    setServerMessage(result.message);
    reset({
      name: '',
      phone: '',
      email: '',
      message: '',
      budget: '',
      preferredContact: 'phone',
      file: null
    });
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-sm md:p-8" data-testid="contact-form">
      <h3 className="text-2xl font-semibold text-slate-900">Залишити заявку</h3>
      <p className="mt-2 text-sm text-slate-600">Відповімо в робочий час та запропонуємо найкраще рішення для вашої кухні.</p>

      <form className="mt-6 space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <motion.div animate="visible" initial="hidden" variants={fieldMotion} custom={0}>
          <Label htmlFor="name">Імʼя</Label>
          <Input id="name" placeholder="Ваше імʼя" {...register('name')} />
          {errors.name ? <p className="mt-1 text-xs text-red-600">{errors.name.message}</p> : null}
        </motion.div>

        <motion.div animate="visible" initial="hidden" variants={fieldMotion} custom={1}>
          <Label htmlFor="phone">Телефон</Label>
          <Input id="phone" placeholder="+380 ..." {...register('phone')} />
          {errors.phone ? <p className="mt-1 text-xs text-red-600">{errors.phone.message}</p> : null}
        </motion.div>

        <motion.div animate="visible" initial="hidden" variants={fieldMotion} custom={2}>
          <Label htmlFor="email">Email (необов&apos;язково)</Label>
          <Input id="email" placeholder="name@email.com" type="email" {...register('email')} />
          {errors.email ? <p className="mt-1 text-xs text-red-600">{errors.email.message}</p> : null}
        </motion.div>

        <motion.div animate="visible" initial="hidden" variants={fieldMotion} custom={3}>
          <Label htmlFor="budget">Орієнтовний бюджет</Label>
          <Input id="budget" placeholder="Напр. 3000$" {...register('budget')} />
        </motion.div>

        <motion.div animate="visible" initial="hidden" variants={fieldMotion} custom={4}>
          <Label htmlFor="preferredContact">Зручний канал звʼязку</Label>
          <select
            id="preferredContact"
            className="flex h-10 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
            {...register('preferredContact')}
          >
            <option value="phone">Телефон</option>
            <option value="telegram">Telegram</option>
            <option value="email">Email</option>
          </select>
          {errors.preferredContact ? (
            <p className="mt-1 text-xs text-red-600">{errors.preferredContact.message}</p>
          ) : null}
        </motion.div>

        <motion.div animate="visible" initial="hidden" variants={fieldMotion} custom={5}>
          <Label htmlFor="message">Ваш запит</Label>
          <Textarea id="message" placeholder="Опишіть вашу кухню, стиль, терміни..." {...register('message')} />
          {errors.message ? <p className="mt-1 text-xs text-red-600">{errors.message.message}</p> : null}
        </motion.div>

        <motion.div animate="visible" initial="hidden" variants={fieldMotion} custom={6}>
          <Label htmlFor="file">Файл (план, фото, приклад)</Label>
          <Input
            id="file"
            type="file"
            onChange={(event) => {
              const file = event.target.files?.[0] ?? null;
              setValue('file', file, {shouldValidate: true});
            }}
          />
        </motion.div>

        <motion.div animate="visible" initial="hidden" variants={fieldMotion} custom={7}>
          <Button className="w-full" disabled={isSubmitting} type="submit">
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Відправляємо...
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                Надіслати заявку
              </>
            )}
          </Button>
        </motion.div>
      </form>

      <AnimatePresence>
        {isSubmitSuccessful && serverMessage ? (
          <motion.p
            animate={{opacity: 1, y: 0}}
            className="mt-4 rounded-md bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700"
            exit={{opacity: 0, y: -8}}
            initial={{opacity: 0, y: 8}}
          >
            {serverMessage}
          </motion.p>
        ) : null}
      </AnimatePresence>

      {submitError ? <p className="mt-3 text-sm text-red-600">{submitError}</p> : null}
    </div>
  );
}
