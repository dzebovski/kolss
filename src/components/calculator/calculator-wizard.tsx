'use client';

import {useEffect, useState} from 'react';
import {useForm, useWatch} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {useTranslations} from 'next-intl';
import {
  calculatorSchema,
  type CalculatorFormValues,
  STEP_FIELDS,
  TOTAL_STEPS,
} from './calculator.schema';
import {
  CALCULATOR_CONFIG,
  type ApplianceId,
  type ColorId,
  type InstallationId,
  type LayoutId,
  type PlumbingId,
  type SizeId,
  type WorktopId,
} from '@/src/config/calculator.config';
import {SelectableCard} from './ui/SelectableCard';
import {CalculatorSectionHeader} from './ui/CalculatorSectionHeader';
import {WizardProgress} from './ui/WizardProgress';
import {Button} from '@/src/components/ui/button';

// ─── Step label keys (maps step index → translation key) ─────────────────────

const STEP_LABELS: Record<number, string> = {
  1: 'wizard.steps.size',
  2: 'wizard.steps.colors',
  3: 'wizard.steps.equipment',
  4: 'wizard.steps.installation',
  5: 'wizard.steps.summary',
};

const SECTION_CARD_CLASS =
  'rounded-2xl border border-border/80 bg-background/70 p-4 shadow-sm sm:p-5 md:p-6';
const CALCULATOR_STORAGE_KEY = 'kitchen-calculator:v1';
const EMPTY_APPLIANCE_IDS: ApplianceId[] = [];

// ─── Component ────────────────────────────────────────────────────────────────

export const CalculatorWizard = () => {
  const t = useTranslations('Calculator');
  const [currentStep, setCurrentStep] = useState(1);
  const [isPersistenceReady, setIsPersistenceReady] = useState(false);

  const form = useForm<CalculatorFormValues>({
    resolver: zodResolver(calculatorSchema),
    defaultValues: {
      applianceIds: [],
    },
  });

  const {control, setValue, trigger, handleSubmit} = form;

  // ─── Navigation ────────────────────────────────────────────────────────────

  const handleNext = async () => {
    const fields = STEP_FIELDS[currentStep];
    if (fields) {
      const isValid = await trigger([...fields]);
      if (!isValid) return;
    }
    setCurrentStep(prev => Math.min(prev + 1, TOTAL_STEPS));
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const onSubmit = (data: CalculatorFormValues) => {
    // TODO: wire up to lead form / Pipedrive in a future task
    sessionStorage.removeItem(CALCULATOR_STORAGE_KEY);
    void data;
  };

  // ─── Step 1: Size & Layout values ─────────────────────────────────────────

  const sizeId = useWatch({control, name: 'sizeId'});
  const layoutId = useWatch({control, name: 'layoutId'});
  const colorId = useWatch({control, name: 'colorId'});
  const worktopId = useWatch({control, name: 'worktopId'});
  const plumbingId = useWatch({control, name: 'plumbingId'});
  const watchedApplianceIds = useWatch({control, name: 'applianceIds'});
  const applianceIds = watchedApplianceIds ?? EMPTY_APPLIANCE_IDS;
  const installationId = useWatch({control, name: 'installationId'});
  const stepLabels = Array.from({length: TOTAL_STEPS}, (_, index) =>
    t(STEP_LABELS[index + 1] as Parameters<typeof t>[0]),
  );
  const activeStepLabel = t(STEP_LABELS[currentStep] as Parameters<typeof t>[0]);

  useEffect(() => {
    try {
      const snapshot = sessionStorage.getItem(CALCULATOR_STORAGE_KEY);
      if (!snapshot) {
        return;
      }

      const parsedSnapshot = JSON.parse(snapshot) as {
        currentStep?: number;
        values?: unknown;
      };

      if (
        typeof parsedSnapshot.currentStep === 'number' &&
        parsedSnapshot.currentStep >= 1 &&
        parsedSnapshot.currentStep <= TOTAL_STEPS
      ) {
        setCurrentStep(parsedSnapshot.currentStep);
      }

      const parsedValues = calculatorSchema.partial().safeParse(parsedSnapshot.values);
      if (parsedValues.success) {
        form.reset({
          applianceIds: [],
          ...parsedValues.data,
        });
      }
    } finally {
      setIsPersistenceReady(true);
    }
  }, [form]);

  useEffect(() => {
    if (!isPersistenceReady) {
      return;
    }

    const persistedValues: Partial<CalculatorFormValues> = {
      sizeId,
      layoutId,
      colorId,
      worktopId,
      plumbingId,
      applianceIds,
      installationId,
    };

    const valuesForStorage = Object.fromEntries(
      Object.entries(persistedValues).filter(([, value]) => value !== undefined),
    );

    sessionStorage.setItem(
      CALCULATOR_STORAGE_KEY,
      JSON.stringify({
        currentStep,
        values: valuesForStorage,
      }),
    );
  }, [
    applianceIds,
    colorId,
    currentStep,
    installationId,
    isPersistenceReady,
    layoutId,
    plumbingId,
    sizeId,
    worktopId,
  ]);

  // ─── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="w-full rounded-3xl border border-border/80 bg-card/70 p-4 shadow-sm sm:p-6 lg:p-8">
      <header className="mb-6 space-y-2">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {t('wizard.progressLabel')}
        </p>
        <h2 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
          {activeStepLabel}
        </h2>
      </header>

      <WizardProgress
        currentStep={currentStep}
        totalSteps={TOTAL_STEPS}
        labels={stepLabels}
        progressLabel={t('wizard.progressLabel')}
      />

      {/* ── Step content ── */}
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-8">
        {/* STEP 1: Size & Layout */}
        {currentStep === 1 && (
          <div className="space-y-6">
            {/* Size group */}
            <section aria-labelledby="size-heading" className={SECTION_CARD_CLASS}>
              <CalculatorSectionHeader
                id="size-heading"
                title={t('wizard.size.sectionTitle')}
                description={t('wizard.size.sectionDescription')}
              />
              <div
                role="radiogroup"
                aria-labelledby="size-heading"
                className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3"
              >
                {CALCULATOR_CONFIG.step1_size.items.map(item => (
                  <SelectableCard
                    key={item.id}
                    selected={sizeId === item.id}
                    onClick={() => setValue('sizeId', item.id as SizeId, {shouldValidate: true})}
                    title={t(`${item.translationKey}.title` as Parameters<typeof t>[0])}
                    description={t(`${item.translationKey}.description` as Parameters<typeof t>[0])}
                    price={item.price}
                    imageUrl={item.imagePath}
                  />
                ))}
              </div>
              {form.formState.errors.sizeId && (
                <p role="alert" className="mt-2 text-sm text-destructive">
                  {form.formState.errors.sizeId.message}
                </p>
              )}
            </section>

            {/* Layout group */}
            <section aria-labelledby="layout-heading" className={SECTION_CARD_CLASS}>
              <CalculatorSectionHeader
                id="layout-heading"
                title={t('wizard.layout.sectionTitle')}
                description={t('wizard.layout.sectionDescription')}
              />
              <div
                role="radiogroup"
                aria-labelledby="layout-heading"
                className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
              >
                {CALCULATOR_CONFIG.step1_layout.items.map(item => (
                  <SelectableCard
                    key={item.id}
                    selected={layoutId === item.id}
                    onClick={() =>
                      setValue('layoutId', item.id as LayoutId, {shouldValidate: true})
                    }
                    title={t(`${item.translationKey}.title` as Parameters<typeof t>[0])}
                    description={t(`${item.translationKey}.description` as Parameters<typeof t>[0])}
                    price={item.price}
                    imageUrl={item.imagePath}
                  />
                ))}
              </div>
              {form.formState.errors.layoutId && (
                <p role="alert" className="mt-2 text-sm text-destructive">
                  {form.formState.errors.layoutId.message}
                </p>
              )}
            </section>
          </div>
        )}

        {/* STEP 2: Colors — scaffold */}
        {currentStep === 2 && (
          <section aria-labelledby="colors-heading" className={SECTION_CARD_CLASS}>
            <CalculatorSectionHeader
              id="colors-heading"
              title={t('wizard.colors.sectionTitle')}
              description={t('wizard.colors.sectionDescription')}
            />
            <div
              role="radiogroup"
              aria-labelledby="colors-heading"
              className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
            >
              {CALCULATOR_CONFIG.step2_colors.items.map(item => (
                <SelectableCard
                  key={item.id}
                  selected={colorId === item.id}
                  onClick={() =>
                    setValue('colorId', item.id as ColorId, {shouldValidate: true})
                  }
                  title={t(`${item.translationKey}.title` as Parameters<typeof t>[0])}
                  description={t(`${item.translationKey}.description` as Parameters<typeof t>[0])}
                  price={item.price}
                  imageUrl={item.imagePath}
                />
              ))}
            </div>
          </section>
        )}

        {/* STEP 3: Equipment — scaffold */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <section aria-labelledby="worktops-heading" className={SECTION_CARD_CLASS}>
              <CalculatorSectionHeader
                id="worktops-heading"
                title={t('wizard.equipment.worktops.sectionTitle')}
                description={t('wizard.equipment.worktops.sectionDescription')}
              />
              <div
                role="radiogroup"
                aria-labelledby="worktops-heading"
                className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3"
              >
                {CALCULATOR_CONFIG.step3_equipment.worktops.items.map(item => (
                  <SelectableCard
                    key={item.id}
                    selected={worktopId === item.id}
                    onClick={() =>
                      setValue('worktopId', item.id as WorktopId, {shouldValidate: true})
                    }
                    title={t(`${item.translationKey}.title` as Parameters<typeof t>[0])}
                    description={t(`${item.translationKey}.description` as Parameters<typeof t>[0])}
                    price={item.price}
                    imageUrl={item.imagePath}
                  />
                ))}
              </div>
            </section>

            <section aria-labelledby="plumbing-heading" className={SECTION_CARD_CLASS}>
              <CalculatorSectionHeader
                id="plumbing-heading"
                title={t('wizard.equipment.plumbing.sectionTitle')}
                description={t('wizard.equipment.plumbing.sectionDescription')}
              />
              <div
                role="radiogroup"
                aria-labelledby="plumbing-heading"
                className="grid grid-cols-1 gap-4 sm:grid-cols-2"
              >
                {CALCULATOR_CONFIG.step3_equipment.plumbing.items.map(item => (
                  <SelectableCard
                    key={item.id}
                    selected={plumbingId === item.id}
                    onClick={() =>
                      setValue('plumbingId', item.id as PlumbingId, {shouldValidate: true})
                    }
                    title={t(`${item.translationKey}.title` as Parameters<typeof t>[0])}
                    description={t(`${item.translationKey}.description` as Parameters<typeof t>[0])}
                    price={item.price}
                    imageUrl={item.imagePath}
                  />
                ))}
              </div>
            </section>

            <section aria-labelledby="appliances-heading" className={SECTION_CARD_CLASS}>
              <CalculatorSectionHeader
                id="appliances-heading"
                title={t('wizard.equipment.appliances.sectionTitle')}
                description={t('wizard.equipment.appliances.sectionDescription')}
              />
              <div
                role="group"
                aria-labelledby="appliances-heading"
                className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4"
              >
                {CALCULATOR_CONFIG.step3_equipment.appliances.items.map(item => {
                  const isSelected = applianceIds.includes(item.id as ApplianceId);

                  const handleToggle = () => {
                    const next = isSelected
                      ? applianceIds.filter(id => id !== item.id)
                      : [...applianceIds, item.id as ApplianceId];
                    setValue('applianceIds', next, {shouldValidate: true});
                  };

                  return (
                    <SelectableCard
                      key={item.id}
                      selected={isSelected}
                      onClick={handleToggle}
                      title={t(`${item.translationKey}.title` as Parameters<typeof t>[0])}
                      description={t(
                        `${item.translationKey}.description` as Parameters<typeof t>[0],
                      )}
                      price={item.price}
                      imageUrl={item.imagePath}
                      selectionType="checkbox"
                    />
                  );
                })}
              </div>
            </section>
          </div>
        )}

        {/* STEP 4: Installation — scaffold */}
        {currentStep === 4 && (
          <section aria-labelledby="installation-heading" className={SECTION_CARD_CLASS}>
            <CalculatorSectionHeader
              id="installation-heading"
              title={t('wizard.installation.sectionTitle')}
              description={t('wizard.installation.sectionDescription')}
            />
            <div
              role="radiogroup"
              aria-labelledby="installation-heading"
              className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3"
            >
              {CALCULATOR_CONFIG.step4_installation.items.map(item => (
                <SelectableCard
                  key={item.id}
                  selected={installationId === item.id}
                  onClick={() =>
                    setValue('installationId', item.id as InstallationId, {shouldValidate: true})
                  }
                  title={t(`${item.translationKey}.title` as Parameters<typeof t>[0])}
                  description={t(`${item.translationKey}.description` as Parameters<typeof t>[0])}
                  price={item.price}
                  imageUrl={item.imagePath}
                />
              ))}
            </div>
          </section>
        )}

        {/* STEP 5: Summary — scaffold */}
        {currentStep === 5 && (
          <section aria-labelledby="summary-heading" className={SECTION_CARD_CLASS}>
            <CalculatorSectionHeader
              id="summary-heading"
              title={t('wizard.summary.sectionTitle')}
              description={t('wizard.summary.sectionDescription')}
            />
            <p className="text-sm leading-relaxed text-muted-foreground">
              {t('wizard.summary.disclaimer')}
            </p>
          </section>
        )}

        {/* ── Navigation ── */}
        <div className="mt-2 flex flex-col-reverse gap-3 border-t border-border/80 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 1}
            aria-label={t('wizard.navigation.back')}
            className="w-full sm:w-auto"
          >
            {t('wizard.navigation.back')}
          </Button>

          {currentStep < TOTAL_STEPS ? (
            <Button
              type="button"
              onClick={handleNext}
              aria-label={t('wizard.navigation.next')}
              className="w-full sm:w-auto"
            >
              {t('wizard.navigation.next')}
            </Button>
          ) : (
            <Button type="submit" aria-label={t('wizard.navigation.submit')} className="w-full sm:w-auto">
              {t('wizard.navigation.submit')}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};
