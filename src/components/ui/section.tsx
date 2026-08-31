import type { ReactNode } from 'react';

type SectionProps = {
  id: string;
  title: string;
  intro?: string;
  children: ReactNode;
  className?: string;
  luminous?: 'hero' | 'work' | 'tools' | 'about' | 'contact' | false;
};

export function Section({
  id,
  title,
  intro,
  children,
  className = '',
  luminous = false,
}: SectionProps) {
  const luminousClass = luminous ? `luminous-section luminous-section--${luminous}` : '';

  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={`section section-padding ${luminousClass} ${className}`.trim()}
    >
      <div className="container">
        <header className="section-header">
          <h2 id={`${id}-heading`} className="text-h2 section-header__title">
            {title}
          </h2>
          {intro ? <p className="text-body-lg section-header__intro">{intro}</p> : null}
        </header>
        {children}
      </div>
    </section>
  );
}
