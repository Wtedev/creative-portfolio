import { defineArrayMember, defineField, defineType } from 'sanity';

import {
  optionalHexColor,
  requiredLocalizedString,
  requiredLocalizedText,
  requiredOrder,
  requiredSlug,
  requiredYear,
} from '@/sanity/schemas/validation/rules';

const imageWithHotspot = {
  type: 'image' as const,
  options: { hotspot: true },
};

const altField = (title = 'Alt Text') =>
  defineField({
    name: 'alt',
    title,
    type: 'localizedString',
    description: 'Required for accessibility when an image is present.',
  });

export const richTextBlock = defineType({
  name: 'richText',
  title: 'Rich Text',
  type: 'object',
  fields: [
    defineField({
      name: 'content',
      title: 'Content',
      type: 'localizedBlockContent',
      description: 'Use headings sparingly. Keep copy editorial and concise.',
    }),
  ],
  preview: { prepare: () => ({ title: 'Rich Text' }) },
});

export const fullWidthImageBlock = defineType({
  name: 'fullWidthImage',
  title: 'Full Width Image',
  type: 'object',
  fields: [
    defineField({ name: 'image', title: 'Image', ...imageWithHotspot }),
    altField(),
    defineField({ name: 'caption', title: 'Caption', type: 'localizedString' }),
    defineField({
      name: 'aspectRatio',
      title: 'Aspect Ratio Preset',
      type: 'string',
      options: {
        list: [
          { title: 'Landscape', value: 'landscape' },
          { title: 'Square', value: 'square' },
          { title: 'Portrait', value: 'portrait' },
          { title: 'Wide', value: 'wide' },
        ],
      },
    }),
  ],
  preview: { prepare: () => ({ title: 'Full Width Image' }) },
});

export const imagePairBlock = defineType({
  name: 'imagePair',
  title: 'Image Pair',
  type: 'object',
  fields: [
    defineField({
      name: 'layout',
      title: 'Layout',
      type: 'string',
      initialValue: 'equal',
      options: {
        list: [
          { title: 'Equal', value: 'equal' },
          { title: 'First Dominant', value: 'first-dominant' },
          { title: 'Second Dominant', value: 'second-dominant' },
        ],
      },
    }),
    defineField({ name: 'leftImage', title: 'Left Image', ...imageWithHotspot }),
    defineField({ name: 'leftAlt', title: 'Left Alt', type: 'localizedString' }),
    defineField({ name: 'leftCaption', title: 'Left Caption', type: 'localizedString' }),
    defineField({ name: 'rightImage', title: 'Right Image', ...imageWithHotspot }),
    defineField({ name: 'rightAlt', title: 'Right Alt', type: 'localizedString' }),
    defineField({ name: 'rightCaption', title: 'Right Caption', type: 'localizedString' }),
  ],
  preview: { prepare: () => ({ title: 'Image Pair' }) },
});

export const imageGridBlock = defineType({
  name: 'imageGrid',
  title: 'Image Grid',
  type: 'object',
  fields: [
    defineField({
      name: 'preset',
      title: 'Grid Preset',
      type: 'string',
      options: {
        list: [
          { title: 'Two Up', value: 'two-up' },
          { title: 'Three Up', value: 'three-up' },
          { title: 'Four Up', value: 'four-up' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      validation: (Rule) => Rule.max(4),
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'image', title: 'Image', ...imageWithHotspot }),
            defineField({ name: 'alt', title: 'Alt', type: 'localizedString' }),
          ],
        },
      ],
    }),
  ],
  preview: { prepare: () => ({ title: 'Image Grid' }) },
});

export const videoBlock = defineType({
  name: 'video',
  title: 'Video',
  type: 'object',
  fields: [
    defineField({
      name: 'file',
      title: 'Uploaded Video File',
      type: 'file',
      options: { accept: 'video/*' },
    }),
    defineField({
      name: 'externalUrl',
      title: 'External Video URL',
      type: 'url',
      description: 'Use either an uploaded file or an external URL — not both.',
    }),
    defineField({ name: 'poster', title: 'Poster Image', ...imageWithHotspot }),
    defineField({ name: 'title', title: 'Title', type: 'localizedString' }),
    defineField({ name: 'description', title: 'Description', type: 'localizedText' }),
    defineField({
      name: 'fallbackText',
      title: 'Accessible Fallback Text',
      type: 'localizedString',
      description: 'Shown when the video cannot play.',
    }),
    defineField({
      name: 'autoplay',
      title: 'Autoplay',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({ name: 'muted', title: 'Muted', type: 'boolean', initialValue: false }),
    defineField({ name: 'loop', title: 'Loop', type: 'boolean', initialValue: false }),
  ],
  preview: { prepare: () => ({ title: 'Video' }) },
});

export const beforeAfterBlock = defineType({
  name: 'beforeAndAfter',
  title: 'Before / After',
  type: 'object',
  fields: [
    defineField({ name: 'beforeImage', title: 'Before Image', ...imageWithHotspot }),
    defineField({ name: 'afterImage', title: 'After Image', ...imageWithHotspot }),
    defineField({ name: 'beforeAlt', title: 'Before Alt', type: 'localizedString' }),
    defineField({ name: 'afterAlt', title: 'After Alt', type: 'localizedString' }),
    defineField({ name: 'beforeLabel', title: 'Before Label', type: 'localizedString' }),
    defineField({ name: 'afterLabel', title: 'After Label', type: 'localizedString' }),
    defineField({ name: 'caption', title: 'Caption', type: 'localizedString' }),
  ],
  preview: { prepare: () => ({ title: 'Before / After' }) },
});

export const designPrincipleBlock = defineType({
  name: 'designPrinciple',
  title: 'Design Principle',
  type: 'object',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'localizedString' }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'localizedText',
      validation: (Rule) => Rule.custom(requiredLocalizedText('Description', 240)),
    }),
    defineField({ name: 'indexLabel', title: 'Index Label', type: 'localizedString' }),
  ],
  preview: {
    select: { title: 'title.en' },
    prepare: ({ title }) => ({ title: title ?? 'Design Principle' }),
  },
});

export const quoteBlock = defineType({
  name: 'quote',
  title: 'Quote',
  type: 'object',
  fields: [
    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'localizedText',
      description: 'Do not present fictional copy as a client testimonial.',
    }),
    defineField({ name: 'attribution', title: 'Attribution', type: 'localizedString' }),
  ],
  preview: { prepare: () => ({ title: 'Quote' }) },
});

export const metricsBlock = defineType({
  name: 'metrics',
  title: 'Metrics',
  type: 'object',
  fields: [
    defineField({
      name: 'items',
      title: 'Items',
      type: 'array',
      description: 'Only add verified outcomes. Never invent metrics.',
      validation: (Rule) => Rule.max(6),
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'value', title: 'Value', type: 'string' }),
            defineField({ name: 'label', title: 'Label', type: 'localizedString' }),
            defineField({ name: 'context', title: 'Context', type: 'localizedString' }),
          ],
          validation: (Rule) =>
            Rule.custom((item: { value?: string; label?: { en?: string; ar?: string } }) => {
              if (!item?.value?.trim()) return 'Value is required';
              if (!item?.label?.en?.trim()) return 'English label is required';
              if (!item?.label?.ar?.trim()) return 'Arabic label is required';
              return true;
            }),
        },
      ],
    }),
  ],
  preview: { prepare: () => ({ title: 'Metrics' }) },
});

export const prototypeEmbedBlock = defineType({
  name: 'prototypeEmbed',
  title: 'Prototype Embed',
  type: 'object',
  fields: [
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
      validation: (Rule) =>
        Rule.uri({ allowRelative: false, scheme: ['http', 'https'] }).required(),
    }),
    defineField({
      name: 'provider',
      title: 'Provider',
      type: 'string',
      options: {
        list: [
          { title: 'Figma', value: 'figma' },
          { title: 'Vimeo', value: 'vimeo' },
          { title: 'YouTube', value: 'youtube' },
          { title: 'Other (safe link fallback)', value: 'other' },
        ],
      },
    }),
    defineField({ name: 'title', title: 'Title', type: 'localizedString' }),
    defineField({ name: 'description', title: 'Description', type: 'localizedText' }),
    defineField({ name: 'poster', title: 'Poster Image', ...imageWithHotspot }),
  ],
  preview: { prepare: () => ({ title: 'Prototype Embed' }) },
});

export const captionBlock = defineType({
  name: 'caption',
  title: 'Caption',
  type: 'object',
  fields: [
    defineField({
      name: 'text',
      title: 'Text',
      type: 'localizedString',
      validation: (Rule) => Rule.custom(requiredLocalizedString('Caption')),
    }),
  ],
  preview: { prepare: () => ({ title: 'Caption' }) },
});

export const creditsBlock = defineType({
  name: 'credits',
  title: 'Credits',
  type: 'object',
  fields: [
    defineField({
      name: 'items',
      title: 'Items',
      type: 'array',
      validation: (Rule) => Rule.max(12),
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'role', title: 'Role', type: 'localizedString' }),
            defineField({ name: 'name', title: 'Name', type: 'string' }),
            defineField({
              name: 'url',
              title: 'URL',
              type: 'url',
              validation: (Rule) => Rule.uri({ allowRelative: false, scheme: ['http', 'https'] }),
            }),
          ],
        },
      ],
    }),
  ],
  preview: { prepare: () => ({ title: 'Credits' }) },
});

export const caseStudyBlockMembers = [
  defineArrayMember({ type: 'richText' }),
  defineArrayMember({ type: 'fullWidthImage' }),
  defineArrayMember({ type: 'imagePair' }),
  defineArrayMember({ type: 'imageGrid' }),
  defineArrayMember({ type: 'video' }),
  defineArrayMember({ type: 'beforeAndAfter' }),
  defineArrayMember({ type: 'designPrinciple' }),
  defineArrayMember({ type: 'quote' }),
  defineArrayMember({ type: 'metrics' }),
  defineArrayMember({ type: 'prototypeEmbed' }),
  defineArrayMember({ type: 'caption' }),
  defineArrayMember({ type: 'credits' }),
];

export const caseStudyBlocks = [
  richTextBlock,
  fullWidthImageBlock,
  imagePairBlock,
  imageGridBlock,
  videoBlock,
  beforeAfterBlock,
  designPrincipleBlock,
  quoteBlock,
  metricsBlock,
  prototypeEmbedBlock,
  captionBlock,
  creditsBlock,
];

export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  groups: [
    { name: 'basics', title: 'Basics', default: true },
    { name: 'homepageCard', title: 'Homepage Card' },
    { name: 'caseStudy', title: 'Case Study' },
    { name: 'creditsOutcome', title: 'Credits & Outcome' },
    { name: 'seo', title: 'SEO & Sharing' },
    { name: 'publishing', title: 'Publishing' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'localizedString',
      group: 'basics',
      validation: (Rule) => Rule.custom(requiredLocalizedString('Title')),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'basics',
      description: 'Generated from the English title. Keep it short and URL-safe.',
      options: { source: 'title.en', maxLength: 96 },
      validation: (Rule) => Rule.required().custom(requiredSlug),
    }),
    defineField({
      name: 'client',
      title: 'Client',
      type: 'string',
      group: 'basics',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'number',
      group: 'basics',
      validation: (Rule) => Rule.custom(requiredYear),
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'localizedString',
      group: 'basics',
      validation: (Rule) => Rule.custom(requiredLocalizedString('Role')),
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      group: 'basics',
      of: [{ type: 'string' }],
      validation: (Rule) => Rule.max(6),
    }),
    defineField({
      name: 'services',
      title: 'Services',
      type: 'array',
      group: 'basics',
      of: [{ type: 'string' }],
      validation: (Rule) => Rule.max(8),
    }),
    defineField({
      name: 'cover',
      title: 'Cover',
      type: 'image',
      group: 'homepageCard',
      options: { hotspot: true },
    }),
    defineField({
      name: 'coverAlt',
      title: 'Cover Alt Text',
      type: 'localizedString',
      group: 'homepageCard',
      validation: (Rule) => Rule.custom(requiredLocalizedString('Cover alt text')),
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'localizedText',
      group: 'homepageCard',
      validation: (Rule) => Rule.custom(requiredLocalizedText('Short description', 220)),
    }),
    defineField({
      name: 'cardSize',
      title: 'Card Size',
      type: 'string',
      group: 'homepageCard',
      options: {
        list: [
          { title: 'Standard', value: 'standard' },
          { title: 'Wide', value: 'wide' },
          { title: 'Hero', value: 'hero' },
        ],
      },
      initialValue: 'standard',
    }),
    defineField({
      name: 'accentColor',
      title: 'Accent Color',
      type: 'string',
      group: 'homepageCard',
      description: 'Optional hex accent such as #9A6CFF',
      validation: (Rule) => Rule.custom(optionalHexColor),
    }),
    defineField({ name: 'featured', title: 'Featured', type: 'boolean', group: 'homepageCard' }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      group: 'homepageCard',
      description:
        'Lower numbers appear first. Duplicate order values may be sorted by year and title.',
      validation: (Rule) =>
        Rule.custom(requiredOrder).custom(async (value, context) => {
          if (value === undefined) return true;
          const { document, getClient } = context;
          const client = getClient({ apiVersion: '2024-01-01' });
          const id = document?._id?.replace(/^drafts\./, '');
          const count = await client.fetch(
            `count(*[_type == "project" && order == $order && !(_id in [$draftId, $publishedId])])`,
            { order: value, draftId: `drafts.${id}`, publishedId: id },
          );
          return count === 0 ? true : 'Warning: another project uses this order value';
        }),
    }),
    defineField({
      name: 'caseStudyBlocks',
      title: 'Case Study Blocks',
      type: 'array',
      group: 'caseStudy',
      of: caseStudyBlockMembers,
      validation: (Rule) => Rule.max(40),
    }),
    defineField({
      name: 'credits',
      title: 'Credits',
      type: 'array',
      group: 'creditsOutcome',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'role', title: 'Role', type: 'localizedString' }),
            defineField({ name: 'name', title: 'Name', type: 'string' }),
            defineField({
              name: 'url',
              title: 'URL',
              type: 'url',
              validation: (Rule) => Rule.uri({ allowRelative: false, scheme: ['http', 'https'] }),
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'results',
      title: 'Results',
      type: 'array',
      group: 'creditsOutcome',
      description: 'Qualitative outcomes or verified metrics only.',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'label', title: 'Label', type: 'localizedString' }),
            defineField({ name: 'value', title: 'Value', type: 'string' }),
            defineField({ name: 'context', title: 'Context', type: 'localizedString' }),
          ],
        },
      ],
    }),
    defineField({
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'localizedString',
      group: 'seo',
      validation: (Rule) => Rule.custom(requiredLocalizedString('SEO title')),
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'localizedText',
      group: 'seo',
      validation: (Rule) => Rule.custom(requiredLocalizedText('SEO description', 160)),
    }),
    defineField({ name: 'ogImage', title: 'OG Image', type: 'image', group: 'seo' }),
    defineField({
      name: 'status',
      title: 'Editorial Status',
      type: 'string',
      group: 'publishing',
      description:
        'Sanity draft state and this editorial status are related but not identical. Only "Published" projects appear on the public site.',
      options: {
        list: [
          { title: 'Draft', value: 'draft' },
          { title: 'Ready for Review', value: 'ready' },
          { title: 'Published', value: 'published' },
          { title: 'Archived', value: 'archived' },
        ],
      },
      initialValue: 'draft',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title.en',
      year: 'year',
      featured: 'featured',
      status: 'status',
      order: 'order',
      media: 'cover',
    },
    prepare({ title, year, featured, status, order, media }) {
      return {
        title: title ?? 'Untitled project',
        subtitle: [`#${order ?? '—'}`, year, featured ? 'Featured' : null, status]
          .filter(Boolean)
          .join(' · '),
        media,
      };
    },
  },
});
