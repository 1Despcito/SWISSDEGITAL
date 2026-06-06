import Image from 'next/image';
import { LogoMark } from '@/components/layout/Logo';
import { cn } from '@/lib/utils';

/**
 * Case-study thumbnail. Renders a branded gradient placeholder (no image file
 * required) unless a real `image` path is provided.
 */
export function CaseThumb({
  accent,
  image,
  label,
  className,
  priority = false,
}: {
  accent: [string, string];
  image?: string;
  label: string;
  className?: string;
  priority?: boolean;
}) {
  if (image) {
    return (
      <Image
        src={image}
        alt={label}
        fill
        sizes="(max-width: 768px) 100vw, 33vw"
        priority={priority}
        className={cn('object-cover', className)}
      />
    );
  }
  return (
    <div
      className={cn('flex h-full w-full items-center justify-center', className)}
      style={{ backgroundImage: `linear-gradient(135deg, ${accent[0]}, ${accent[1]})` }}
      role="img"
      aria-label={label}
    >
      <span className="opacity-90">
        <LogoMark className="h-12 w-12" />
      </span>
    </div>
  );
}
