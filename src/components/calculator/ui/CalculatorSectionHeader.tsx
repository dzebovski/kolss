import {cn} from '@/lib/utils';

interface CalculatorSectionHeaderProps {
  id: string;
  title: string;
  description?: string;
  className?: string;
}

export const CalculatorSectionHeader = ({
  id,
  title,
  description,
  className,
}: CalculatorSectionHeaderProps) => {
  return (
    <div className={cn('mb-5 space-y-1.5', className)}>
      <h2 id={id} className="text-lg font-semibold tracking-tight text-foreground md:text-xl">
        {title}
      </h2>
      {description ? (
        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">{description}</p>
      ) : null}
    </div>
  );
};
