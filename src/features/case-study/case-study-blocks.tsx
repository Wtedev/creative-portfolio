import { getLocale, getTranslations } from 'next-intl/server';

import { PortableTextContent } from '@/components/content/portable-text';
import { RevealOnView } from '@/components/motion/reveal-on-view';
import { ProjectCoverMedia } from '@/components/media/project-cover-media';
import { PlaceholderMedia } from '@/components/ui/placeholder-media';
import { CaseStudyPrototype } from '@/features/case-study/case-study-prototype';
import { CaseStudyVideo } from '@/features/case-study/case-study-video';
import { isKnownCaseStudyBlock } from '@/sanity/adapters/map-content';
import { getLocalizedValue } from '@/lib/utilities/locale';
import type {
  CaseStudyBlock,
  ImageGridPreset,
  ImagePairLayout,
  KnownCaseStudyBlock,
} from '@/types/project';
import type { Locale } from '@/types/global';

type CaseStudyBlocksProps = {
  blocks: CaseStudyBlock[];
};

function pairLayoutClass(layout?: ImagePairLayout): string {
  if (layout === 'first-dominant') return 'case-study-block--pair-dominant-first';
  if (layout === 'second-dominant') return 'case-study-block--pair-dominant-second';
  return 'case-study-block--pair-equal';
}

function gridClass(preset: ImageGridPreset): string {
  const map: Record<ImageGridPreset, string> = {
    'two-up': 'case-study-block--grid-two-up',
    'three-up': 'case-study-block--grid-three-up',
    'four-up': 'case-study-block--grid-four-up',
  };
  return map[preset];
}

function renderKnownBlock(block: KnownCaseStudyBlock, locale: Locale, activateLabel: string) {
  switch (block._type) {
    case 'richText':
      return <PortableTextContent value={block.content} locale={locale} />;
    case 'fullWidthImage':
      return (
        <figure className="case-study-block case-study-block--full-width">
          <ProjectCoverMedia
            cover={block.image}
            alt={getLocalizedValue(block.alt, locale)}
            aspect={block.aspectRatio}
            variant="wide"
          />
          {block.caption ? (
            <figcaption className="text-small case-study-caption">
              {getLocalizedValue(block.caption, locale)}
            </figcaption>
          ) : null}
        </figure>
      );
    case 'imagePair':
      return (
        <div className={`case-study-block case-study-block--pair ${pairLayoutClass(block.layout)}`}>
          <figure>
            <ProjectCoverMedia
              cover={block.leftImage}
              alt={getLocalizedValue(block.leftAlt, locale)}
            />
            {block.leftCaption ? (
              <figcaption className="text-small">
                {getLocalizedValue(block.leftCaption, locale)}
              </figcaption>
            ) : null}
          </figure>
          <figure>
            <ProjectCoverMedia
              cover={block.rightImage}
              alt={getLocalizedValue(block.rightAlt, locale)}
            />
            {block.rightCaption ? (
              <figcaption className="text-small">
                {getLocalizedValue(block.rightCaption, locale)}
              </figcaption>
            ) : null}
          </figure>
        </div>
      );
    case 'imageGrid':
      return (
        <div className={`case-study-block case-study-block--grid ${gridClass(block.preset)}`}>
          {block.images.map((item) => (
            <figure key={item._key}>
              <ProjectCoverMedia
                cover={item.image}
                alt={getLocalizedValue(item.alt, locale)}
                variant="square"
              />
            </figure>
          ))}
        </div>
      );
    case 'video':
      return <CaseStudyVideo block={block} locale={locale} />;
    case 'beforeAndAfter':
      return (
        <figure className="case-study-block case-study-block--before-after">
          {block.caption ? (
            <figcaption className="text-label case-study-caption">
              {getLocalizedValue(block.caption, locale)}
            </figcaption>
          ) : null}
          <div className="case-study-block--before-after__grid">
            <figure>
              {block.beforeLabel ? (
                <p className="text-label">{getLocalizedValue(block.beforeLabel, locale)}</p>
              ) : null}
              <ProjectCoverMedia
                cover={block.beforeImage}
                alt={getLocalizedValue(block.beforeAlt, locale)}
              />
            </figure>
            <figure>
              {block.afterLabel ? (
                <p className="text-label">{getLocalizedValue(block.afterLabel, locale)}</p>
              ) : null}
              <ProjectCoverMedia
                cover={block.afterImage}
                alt={getLocalizedValue(block.afterAlt, locale)}
              />
            </figure>
          </div>
        </figure>
      );
    case 'designPrinciple':
      return (
        <article className="case-study-block case-study-block--principle">
          {block.indexLabel ? (
            <p className="text-label">{getLocalizedValue(block.indexLabel, locale)}</p>
          ) : null}
          <h2 className="text-h2">{getLocalizedValue(block.title, locale)}</h2>
          <p className="text-body-lg">{getLocalizedValue(block.description, locale)}</p>
        </article>
      );
    case 'quote':
      return (
        <blockquote className="case-study-block case-study-block--quote">
          <p className="text-body-lg">{getLocalizedValue(block.quote, locale)}</p>
          {block.attribution ? (
            <cite className="text-small">{getLocalizedValue(block.attribution, locale)}</cite>
          ) : null}
        </blockquote>
      );
    case 'metrics':
      return (
        <dl className="case-study-block case-study-block--metrics">
          {block.items.map((item) => (
            <div key={item.value + getLocalizedValue(item.label, locale)}>
              <dt className="text-label">{getLocalizedValue(item.label, locale)}</dt>
              <dd className="text-h3">{item.value}</dd>
              {item.context ? (
                <dd className="text-small case-study-metrics__context">
                  {getLocalizedValue(item.context, locale)}
                </dd>
              ) : null}
            </div>
          ))}
        </dl>
      );
    case 'prototypeEmbed':
      return <CaseStudyPrototype block={block} locale={locale} activateLabel={activateLabel} />;
    case 'caption':
      return (
        <p className="text-small case-study-block case-study-caption">
          {getLocalizedValue(block.text, locale)}
        </p>
      );
    case 'credits':
      return (
        <ul className="case-study-block case-study-block--credits">
          {block.items.map((item) => (
            <li key={item.name + getLocalizedValue(item.role, locale)}>
              <span className="text-label">{getLocalizedValue(item.role, locale)}</span>
              {item.url ? (
                <a href={item.url} className="text-link" rel="noopener noreferrer">
                  {item.name}
                </a>
              ) : (
                <span>{item.name}</span>
              )}
            </li>
          ))}
        </ul>
      );
    default:
      return null;
  }
}

export async function CaseStudyBlocks({ blocks }: CaseStudyBlocksProps) {
  const locale = (await getLocale()) as Locale;
  const tPlaceholders = await getTranslations('placeholders');
  const tProject = await getTranslations('project');

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

        return (
          <RevealOnView key={block._key} className="case-study-block-wrap">
            {renderKnownBlock(block, locale, tProject('activatePrototype'))}
          </RevealOnView>
        );
      })}
    </div>
  );
}
