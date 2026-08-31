import { PortableText, type PortableTextComponents } from '@portabletext/react';

import type { LocalizedPortableText } from '@/types/global';
import type { Locale } from '@/types/global';

type PortableTextContentProps = {
  value: LocalizedPortableText | undefined;
  locale: Locale;
};

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="case-study-prose__paragraph">{children}</p>,
    h2: ({ children }) => <h2 className="text-h2 case-study-prose__heading">{children}</h2>,
    h3: ({ children }) => <h3 className="text-h3 case-study-prose__heading">{children}</h3>,
  },
  marks: {
    strong: ({ children }) => <strong>{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    link: ({ children, value }) => {
      const href = typeof value?.href === 'string' ? value.href : '#';
      const external = href.startsWith('http');
      return (
        <a
          href={href}
          className="text-link"
          {...(external ? { rel: 'noopener noreferrer', target: '_blank' } : {})}
        >
          {children}
        </a>
      );
    },
  },
  list: {
    bullet: ({ children }) => <ul className="case-study-prose__list">{children}</ul>,
    number: ({ children }) => <ol className="case-study-prose__list">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
    number: ({ children }) => <li>{children}</li>,
  },
};

export function PortableTextContent({ value, locale }: PortableTextContentProps) {
  const blocks = value?.[locale];

  if (!blocks?.length) return null;

  return (
    <div className="case-study-prose">
      <PortableText value={blocks} components={components} />
    </div>
  );
}
