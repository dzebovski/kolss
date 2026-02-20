import {Check} from 'lucide-react';
import {cn} from '@/lib/utils';

interface WizardProgressProps {
  currentStep: number;
  totalSteps: number;
  labels: string[];
  progressLabel: string;
}

export const WizardProgress = ({
  currentStep,
  totalSteps,
  labels,
  progressLabel,
}: WizardProgressProps) => {
  const completedProgress =
    totalSteps <= 1 ? 100 : ((currentStep - 1) / (totalSteps - 1)) * 100;

  return (
    <nav
      aria-label={progressLabel}
      className="mb-8 rounded-2xl border border-border/80 bg-muted/30 p-4 shadow-sm sm:p-5"
    >
      <div className="mb-4 flex items-center justify-between gap-2">
        <p className="text-sm font-medium text-foreground">{progressLabel}</p>
        <span className="rounded-full border border-border bg-background px-2.5 py-1 text-xs font-medium text-muted-foreground">
          {currentStep}/{totalSteps}
        </span>
      </div>

      <div className="mb-5 h-1.5 w-full overflow-hidden rounded-full bg-border/80">
        <div
          className="h-full rounded-full bg-primary transition-all duration-300"
          style={{width: `${completedProgress}%`}}
        />
      </div>

      <ol className="grid grid-cols-5 gap-2">
        {labels.map((label, index) => {
          const step = index + 1;
          const isCompleted = currentStep > step;
          const isCurrent = currentStep === step;

          return (
            <li key={label} className="flex min-w-0 flex-col items-center gap-1.5 text-center">
              <span
                aria-current={isCurrent ? 'step' : undefined}
                className={cn(
                  'flex h-8 w-8 items-center justify-center rounded-full border text-xs font-semibold transition-colors',
                  isCompleted && 'border-primary bg-primary text-primary-foreground',
                  isCurrent && 'border-primary bg-primary/10 text-primary',
                  !isCompleted && !isCurrent && 'border-border bg-background text-muted-foreground',
                )}
              >
                {isCompleted ? <Check className="h-4 w-4" aria-hidden="true" /> : step}
              </span>
              <span
                className={cn(
                  'line-clamp-2 text-xs leading-snug',
                  isCurrent ? 'font-medium text-foreground' : 'text-muted-foreground',
                )}
              >
                {label}
              </span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
