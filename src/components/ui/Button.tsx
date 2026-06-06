'use client';

import { forwardRef } from 'react';
import { Link } from '@/lib/i18n/navigation';
import { cn } from '@/lib/utils';
import { track, type AnalyticsEvent } from '@/lib/analytics';

type Variant = 'primary' | 'secondary' | 'ghost' | 'outline';
type Size = 'sm' | 'md' | 'lg';

const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2 disabled:opacity-60 disabled:pointer-events-none whitespace-nowrap';

const variants: Record<Variant, string> = {
  primary:
    'bg-blue text-white shadow-soft hover:bg-blue-600 hover:-translate-y-0.5 hover:shadow-glow',
  secondary:
    'bg-white/10 text-white ring-1 ring-inset ring-white/25 backdrop-blur hover:bg-white/15 hover:-translate-y-0.5',
  outline:
    'bg-transparent text-ink ring-1 ring-inset ring-line/15 hover:ring-line/30 hover:-translate-y-0.5',
  ghost: 'bg-transparent text-blue hover:bg-blue/10',
};

const sizes: Record<Size, string> = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-6 text-sm',
  lg: 'h-14 px-8 text-base',
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
  /** Fire an analytics event on click (e.g. 'cta_click'). */
  analyticsEvent?: AnalyticsEvent;
  analyticsLabel?: string;
};

type ButtonAsButton = CommonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> & {
    href?: undefined;
  };

type ButtonAsLink = CommonProps &
  // Omit `popover` — React's anchor type allows "hint", but next-intl's Link does not.
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof CommonProps | 'href' | 'popover'> & {
    href: string;
    /** Treat href as external (renders a plain <a>, opens new tab). */
    external?: boolean;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

function fire(event: AnalyticsEvent | undefined, label?: string) {
  if (event) track(event, label ? { label } : {});
}

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  function Button(props, ref) {
    const { variant = 'primary', size = 'md', className, children, analyticsEvent, analyticsLabel } =
      props;
    const classes = cn(base, variants[variant], sizes[size], className);

    if ('href' in props && props.href !== undefined) {
      const {
        href,
        external,
        onClick,
        // strip non-DOM props so they don't land on the element
        variant: _v,
        size: _s,
        className: _c,
        children: _ch,
        analyticsEvent: _e,
        analyticsLabel: _l,
        ...rest
      } = props;
      const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        fire(analyticsEvent, analyticsLabel);
        onClick?.(e);
      };

      if (external) {
        return (
          <a
            ref={ref as React.Ref<HTMLAnchorElement>}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={classes}
            onClick={handleClick}
            {...rest}
          >
            {children}
          </a>
        );
      }

      return (
        <Link
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          className={classes}
          onClick={handleClick}
          {...rest}
        >
          {children}
        </Link>
      );
    }

    const {
      onClick,
      type,
      variant: _v,
      size: _s,
      className: _c,
      children: _ch,
      analyticsEvent: _e,
      analyticsLabel: _l,
      ...rest
    } = props;
    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type={type ?? 'button'}
        className={classes}
        onClick={(e) => {
          fire(analyticsEvent, analyticsLabel);
          onClick?.(e);
        }}
        {...rest}
      >
        {children}
      </button>
    );
  },
);
