type PlaceholderMediaProps = {
  label: string;
  variant?: 'landscape' | 'square' | 'portrait' | 'wide';
  className?: string;
};

export function PlaceholderMedia({
  label,
  variant = 'landscape',
  className = '',
}: PlaceholderMediaProps) {
  const variantClass =
    variant === 'square'
      ? 'placeholder-media--square'
      : variant === 'portrait'
        ? 'placeholder-media--portrait'
        : variant === 'wide'
          ? 'placeholder-media--wide'
          : '';

  return (
    <div
      className={`placeholder-media ${variantClass} ${className}`.trim()}
      role="img"
      aria-label={label}
    />
  );
}
