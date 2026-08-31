import { getLocale, getTranslations } from 'next-intl/server';

import { PlaceholderMedia } from '@/components/ui/placeholder-media';
import { isKnownCaseStudyBlock } from '@/sanity/adapters/map-content';
import { getLocalizedValue } from '@/lib/utilities/locale';
import type { CaseStudyBlock } from '@/types/project';

type CaseStudyBlocksProps = {
  blocks: CaseStudyBlock[];
};

export async function CaseStudyBlocks({ blocks }: CaseStudyBlocksProps) {
  const locale = await getLocale();
  const tPlaceholders = await getTranslations('placeholders');

  return (
    <div className="case-study-blocks">
      {blocks.map((block) => {
        if (!isKnownCaseStudyBlock(block)) {
          return (
            <div key={block._key} className="case-study-block" role="note">
              <p className="text-small">[Unsupported block: {block.originalType ?? block._type}]</p>
              <PlaceholderMedia label={tPlaceholders('image')} />
            </div>
          );
        }

        switch (block._type) {
          case 'richText':
            return (
              <div key={block._key} className="case-study-block case-study-block--rich-text">
                <p className="text-body">
                  {getLocalizedValue(
                    {
                      en: '[Rich text block — connect Portable Text renderer in Phase 4]',
                      ar: '[كتلة نص غني — سيتم ربط عارض Portable Text في المرحلة 4]',
                    },
                    locale as 'en' | 'ar',
                  )}
                </p>
              </div>
            );
          case 'fullWidthImage':
            return (
              <figure key={block._key} className="case-study-block">
                <PlaceholderMedia label={getLocalizedValue(block.alt, locale as 'en' | 'ar')} />
                {block.caption ? (
                  <figcaption className="text-small">
                    {getLocalizedValue(block.caption, locale as 'en' | 'ar')}
                  </figcaption>
                ) : null}
              </figure>
            );
          case 'imagePair':
            return (
              <div key={block._key} className="case-study-block case-study-block--pair">
                <PlaceholderMedia label={getLocalizedValue(block.leftAlt, locale as 'en' | 'ar')} />
                <PlaceholderMedia
                  label={getLocalizedValue(block.rightAlt, locale as 'en' | 'ar')}
                />
              </div>
            );
          case 'designPrinciple':
            return (
              <article key={block._key} className="case-study-block case-study-block--principle">
                <h2 className="text-h2">{getLocalizedValue(block.title, locale as 'en' | 'ar')}</h2>
                <p className="text-body">
                  {getLocalizedValue(block.description, locale as 'en' | 'ar')}
                </p>
              </article>
            );
          case 'quote':
            return (
              <blockquote key={block._key} className="case-study-block case-study-block--quote">
                <p className="text-body-lg">
                  {getLocalizedValue(block.quote, locale as 'en' | 'ar')}
                </p>
                {block.attribution ? (
                  <cite className="text-small">
                    {getLocalizedValue(block.attribution, locale as 'en' | 'ar')}
                  </cite>
                ) : null}
              </blockquote>
            );
          case 'metrics':
            return (
              <dl key={block._key} className="case-study-block case-study-block--metrics">
                {block.items.map((item) => (
                  <div key={item.value + getLocalizedValue(item.label, locale as 'en' | 'ar')}>
                    <dt className="text-label">
                      {getLocalizedValue(item.label, locale as 'en' | 'ar')}
                    </dt>
                    <dd className="text-h3">{item.value}</dd>
                  </div>
                ))}
              </dl>
            );
          case 'beforeAndAfter':
            return (
              <div key={block._key} className="case-study-block case-study-block--before-after">
                {block.caption ? (
                  <p className="text-label">
                    {getLocalizedValue(block.caption, locale as 'en' | 'ar')}
                  </p>
                ) : null}
                <PlaceholderMedia
                  label={getLocalizedValue(block.beforeAlt, locale as 'en' | 'ar')}
                />
                <PlaceholderMedia
                  label={getLocalizedValue(block.afterAlt, locale as 'en' | 'ar')}
                />
              </div>
            );
          case 'video':
            return (
              <figure key={block._key} className="case-study-block case-study-block--video">
                <PlaceholderMedia
                  label={getLocalizedValue(block.fallbackText, locale as 'en' | 'ar')}
                />
                {block.title ? (
                  <figcaption className="text-small">
                    {getLocalizedValue(block.title, locale as 'en' | 'ar')}
                  </figcaption>
                ) : null}
              </figure>
            );
          case 'caption':
            return (
              <p key={block._key} className="text-small case-study-block">
                {getLocalizedValue(block.text, locale as 'en' | 'ar')}
              </p>
            );
          case 'credits':
            return (
              <ul key={block._key} className="case-study-block case-study-block--credits">
                {block.items.map((item) => (
                  <li key={item.name + getLocalizedValue(item.role, locale as 'en' | 'ar')}>
                    <span className="text-label">
                      {getLocalizedValue(item.role, locale as 'en' | 'ar')}
                    </span>
                    <span>{item.name}</span>
                  </li>
                ))}
              </ul>
            );
          default:
            return (
              <div key={block._key} className="case-study-block">
                <PlaceholderMedia label={tPlaceholders('image')} />
              </div>
            );
        }
      })}
    </div>
  );
}
