import { defineField, defineType } from 'sanity';

import { requiredLocalizedString, requiredLocalizedText } from '@/sanity/schemas/validation/rules';

export const localizedString = defineType({
  name: 'localizedString',
  title: 'Localized String',
  type: 'object',
  fields: [
    defineField({
      name: 'en',
      title: 'English',
      type: 'string',
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: 'ar',
      title: 'Arabic',
      type: 'string',
      validation: (Rule) => Rule.required().max(200),
    }),
  ],
  validation: (Rule) => Rule.custom(requiredLocalizedString('Localized string')),
});

export const localizedText = defineType({
  name: 'localizedText',
  title: 'Localized Text',
  type: 'object',
  fields: [
    defineField({
      name: 'en',
      title: 'English',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required().max(1000),
    }),
    defineField({
      name: 'ar',
      title: 'Arabic',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required().max(1000),
    }),
  ],
  validation: (Rule) => Rule.custom(requiredLocalizedText('Localized text')),
});

const portableTextStyles = [
  { title: 'Normal', value: 'normal' },
  { title: 'H2', value: 'h2' },
  { title: 'H3', value: 'h3' },
];

const portableTextMarks = {
  decorators: [
    { title: 'Strong', value: 'strong' },
    { title: 'Emphasis', value: 'em' },
  ],
  annotations: [
    {
      name: 'link',
      type: 'object',
      title: 'Link',
      fields: [
        defineField({
          name: 'href',
          type: 'url',
          title: 'URL',
          validation: (Rule) =>
            Rule.uri({ allowRelative: false, scheme: ['http', 'https', 'mailto'] }),
        }),
      ],
    },
  ],
};

export const localizedBlockContent = defineType({
  name: 'localizedBlockContent',
  title: 'Localized Block Content',
  type: 'object',
  fields: [
    defineField({
      name: 'en',
      title: 'English',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: portableTextStyles,
          marks: portableTextMarks,
          lists: [
            { title: 'Bullet', value: 'bullet' },
            { title: 'Numbered', value: 'number' },
          ],
        },
      ],
    }),
    defineField({
      name: 'ar',
      title: 'Arabic',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: portableTextStyles,
          marks: portableTextMarks,
          lists: [
            { title: 'Bullet', value: 'bullet' },
            { title: 'Numbered', value: 'number' },
          ],
        },
      ],
    }),
  ],
});

export const localizedStringArray = defineType({
  name: 'localizedStringArray',
  title: 'Localized String Array',
  type: 'object',
  fields: [
    defineField({
      name: 'en',
      title: 'English',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (Rule) => Rule.max(8),
    }),
    defineField({
      name: 'ar',
      title: 'Arabic',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (Rule) => Rule.max(8),
    }),
  ],
  validation: (Rule) =>
    Rule.custom((value: { en?: string[]; ar?: string[] } | undefined) => {
      if (!value?.en?.length) return 'Add at least one English item';
      if (!value?.ar?.length) return 'Add at least one Arabic item';
      return true;
    }),
});
