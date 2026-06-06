import Image from 'next/image';
import { cn } from '@/lib/utils';

/** On-brand initials avatar with optional photo. No image file required. */
export function Avatar({
  initials,
  photo,
  name,
  size = 48,
  className,
}: {
  initials: string;
  photo?: string;
  name: string;
  size?: number;
  className?: string;
}) {
  if (photo) {
    return (
      <Image
        src={photo}
        alt={name}
        width={size}
        height={size}
        className={cn('rounded-full object-cover', className)}
      />
    );
  }
  return (
    <span
      aria-hidden
      style={{ width: size, height: size }}
      className={cn(
        'inline-flex items-center justify-center rounded-full bg-gradient-to-br from-blue to-cyan font-semibold text-white',
        className,
      )}
    >
      {initials}
    </span>
  );
}
