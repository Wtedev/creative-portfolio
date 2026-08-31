import { defineField, defineType } from 'sanity';

import { SINGLETON_IDS } from '@/sanity/constants/singletons';
import {
  requiredBio,
  requiredEmail,
  requiredLocalizedString,
  requiredLocalizedText,
  requiredOrder,
  optionalUrl,
} from '@/sanity/schemas/validation/rules';

export const tool = defineType({
  name: 'tool',
  title: 'Tool',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Direction', value: 'direction' },
          { title: 'Design', value: 'design' },
          { title: 'Build', value: 'build' },
          { title: 'Motion', value: 'motion' },
          { title: 'AI', value: 'ai' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'localizedText',
      description: 'Brief bilingual summary of how this tool is used.',
      validation: (Rule) => Rule.custom(requiredLocalizedText('Description', 180)),
    }),
    defineField({
      name: 'proficiency',
      title: 'Proficiency',
      type: 'string',
      options: {
        list: [
          { title: 'Working', value: 'working' },
          { title: 'Comfortable', value: 'comfortable' },
          { title: 'Exploring', value: 'exploring' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: 'icon', title: 'Icon Label', type: 'string' }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
      validation: (Rule) => Rule.custom(optionalUrl),
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      validation: (Rule) => Rule.custom(requiredOrder),
    }),
    defineField({ name: 'visible', title: 'Visible', type: 'boolean', initialValue: true }),
  ],
  preview: {
    select: { title: 'name', category: 'category', proficiency: 'proficiency', visible: 'visible' },
    prepare({ title, category, proficiency, visible }) {
      return {
        title,
        subtitle: [category, proficiency, visible ? 'Visible' : 'Hidden']
          .filter(Boolean)
          .join(' · '),
      };
    },
  },
});

export const capability = defineType({
  name: 'capability',
  title: 'Capability',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'localizedString',
      validation: (Rule) => Rule.custom(requiredLocalizedString('Title')),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'localizedText',
      validation: (Rule) => Rule.custom(requiredLocalizedText('Description', 240)),
    }),
    defineField({ name: 'items', title: 'Items', type: 'localizedStringArray' }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      validation: (Rule) => Rule.custom(requiredOrder),
    }),
    defineField({ name: 'visible', title: 'Visible', type: 'boolean', initialValue: true }),
  ],
  preview: {
    select: { titleEn: 'title.en', titleAr: 'title.ar', visible: 'visible', order: 'order' },
    prepare({ titleEn, titleAr, visible, order }) {
      return {
        title: titleEn ?? 'Capability',
        subtitle: [`#${order ?? '—'}`, titleAr, visible ? 'Visible' : 'Hidden']
          .filter(Boolean)
          .join(' · '),
      };
    },
  },
});

export const about = defineType({
  name: 'about',
  title: 'About',
  type: 'document',
  fields: [
    defineField({
      name: 'shortBio',
      title: 'Short Bio',
      type: 'localizedText',
      description: 'Keep this concise and portfolio-appropriate. Do not include private data.',
      validation: (Rule) => Rule.custom(requiredBio),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'localizedString',
      validation: (Rule) => Rule.custom(requiredLocalizedString('Location')),
    }),
    defineField({
      name: 'availability',
      title: 'Availability Summary',
      type: 'localizedText',
      validation: (Rule) => Rule.custom(requiredLocalizedText('Availability', 180)),
    }),
    defineField({
      name: 'portrait',
      title: 'Portrait',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'portraitAlt',
      title: 'Portrait Alt Text',
      type: 'localizedString',
      description: 'Required when a portrait image is uploaded.',
    }),
    defineField({
      name: 'cv',
      title: 'CV File',
      type: 'file',
      options: { accept: '.pdf' },
      description: 'Upload a downloadable CV. Only publish information you want public.',
    }),
  ],
  initialValue: {
    _id: SINGLETON_IDS.about,
  },
});

export const contactAvailability = defineType({
  name: 'contactAvailability',
  title: 'Contact & Availability',
  type: 'document',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'localizedString',
      validation: (Rule) => Rule.custom(requiredLocalizedString('Heading')),
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'localizedText',
      validation: (Rule) => Rule.custom(requiredLocalizedText('Body', 280)),
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) => Rule.custom(requiredEmail),
    }),
    defineField({
      name: 'linkedin',
      title: 'LinkedIn',
      type: 'url',
      validation: (Rule) => Rule.custom(optionalUrl),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'localizedString',
      validation: (Rule) => Rule.custom(requiredLocalizedString('Location')),
    }),
    defineField({
      name: 'availabilityStatus',
      title: 'Availability Status',
      type: 'string',
      options: {
        list: [
          { title: 'Available', value: 'available' },
          { title: 'Selected Opportunities', value: 'selected-opportunities' },
          { title: 'Unavailable', value: 'unavailable' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'availabilityLabel',
      title: 'Availability Label',
      type: 'localizedString',
      validation: (Rule) => Rule.custom(requiredLocalizedString('Availability label')),
    }),
    defineField({
      name: 'roleCtaLabel',
      title: 'Role CTA Label',
      type: 'localizedString',
      validation: (Rule) => Rule.custom(requiredLocalizedString('Role CTA label')),
    }),
    defineField({
      name: 'projectCtaLabel',
      title: 'Project CTA Label',
      type: 'localizedString',
      validation: (Rule) => Rule.custom(requiredLocalizedString('Project CTA label')),
    }),
    defineField({ name: 'visible', title: 'Visible', type: 'boolean', initialValue: true }),
  ],
  initialValue: {
    _id: SINGLETON_IDS.contactAvailability,
  },
});

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({ name: 'siteTitle', title: 'Site Title', type: 'string' }),
    defineField({
      name: 'professionalTitle',
      title: 'Professional Title',
      type: 'localizedString',
      validation: (Rule) => Rule.custom(requiredLocalizedString('Professional title')),
    }),
    defineField({
      name: 'heroStatement',
      title: 'Hero Statement',
      type: 'localizedText',
      validation: (Rule) => Rule.custom(requiredLocalizedText('Hero statement', 220)),
    }),
    defineField({
      name: 'eyebrow',
      title: 'Hero Eyebrow',
      type: 'localizedString',
      validation: (Rule) => Rule.custom(requiredLocalizedString('Eyebrow')),
    }),
    defineField({
      name: 'defaultLocale',
      title: 'Default Locale',
      type: 'string',
      options: {
        list: [
          { title: 'English', value: 'en' },
          { title: 'Arabic', value: 'ar' },
        ],
      },
      initialValue: 'en',
    }),
    defineField({
      name: 'defaultTheme',
      title: 'Default Theme',
      type: 'string',
      options: {
        list: [
          { title: 'System', value: 'system' },
          { title: 'Light', value: 'light' },
          { title: 'Dark', value: 'dark' },
        ],
      },
      initialValue: 'system',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) => Rule.custom(requiredEmail),
    }),
    defineField({
      name: 'linkedin',
      title: 'LinkedIn',
      type: 'url',
      validation: (Rule) => Rule.custom(optionalUrl),
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'localizedString',
          validation: (Rule) => Rule.custom(requiredLocalizedString('SEO title')),
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'localizedText',
          validation: (Rule) => Rule.custom(requiredLocalizedText('SEO description', 160)),
        }),
        defineField({ name: 'ogImage', title: 'OG Image', type: 'image' }),
      ],
    }),
    defineField({
      name: 'socialImage',
      title: 'Social Image',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
  initialValue: {
    _id: SINGLETON_IDS.siteSettings,
  },
});
