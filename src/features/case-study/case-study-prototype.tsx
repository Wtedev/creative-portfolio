'use client';

import { useState } from 'react';

import { isAllowedPrototypeEmbed, normalizeExternalUrl } from '@/lib/motion/preferences';
import { getLocalizedValue } from '@/lib/utilities/locale';
import type { PrototypeEmbedBlock } from '@/types/project';
import type { Locale } from '@/types/global';

type CaseStudyPrototypeProps = {
  block: PrototypeEmbedBlock;
  locale: Locale;
  activateLabel: string;
};

export function CaseStudyPrototype({ block, locale, activateLabel }: CaseStudyPrototypeProps) {
  const [active, setActive] = useState(false);
  const url = block.url ? normalizeExternalUrl(block.url) : undefined;
  const allowed = isAllowedPrototypeEmbed(url, block.provider);
  const title = block.title ? getLocalizedValue(block.title, locale) : undefined;
  const description = block.description ? getLocalizedValue(block.description, locale) : undefined;

  if (!url || !allowed) {
    return (
      <div className="case-study-block case-study-block--prototype">
        {title ? <h3 className="text-h3">{title}</h3> : null}
        {description ? <p className="text-body">{description}</p> : null}
        {url ? (
          <a href={url} className="text-link" rel="noopener noreferrer">
            {url}
          </a>
        ) : null}
      </div>
    );
  }

  return (
    <div className="case-study-block case-study-block--prototype">
      {title ? <h3 className="text-h3">{title}</h3> : null}
      {description ? <p className="text-body">{description}</p> : null}
      {!active ? (
        <button type="button" className="btn btn--secondary" onClick={() => setActive(true)}>
          {activateLabel}
        </button>
      ) : (
        <iframe
          title={title ?? activateLabel}
          src={url}
          className="case-study-prototype__frame"
          loading="lazy"
          allow="fullscreen"
          sandbox="allow-scripts allow-same-origin allow-presentation allow-popups"
        />
      )}
    </div>
  );
}
