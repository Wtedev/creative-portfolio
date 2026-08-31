import type { Project, ProjectSummary } from '@/types/project';

export const fallbackProjects: Project[] = [
  {
    _id: 'project-sample',
    title: {
      en: '[Sample] Luminous Systems',
      ar: '[تجريبي] أنظمة مضيئة',
    },
    slug: 'sample-project',
    client: '[Placeholder Client]',
    year: 2025,
    role: {
      en: '[Placeholder] Art Direction & Creative Development',
      ar: '[تجريبي] إخراج فني وتطوير إبداعي',
    },
    categories: ['Brand', 'Digital'],
    services: ['Art Direction', 'Visual Identity', 'Creative Website'],
    shortDescription: {
      en: 'Sample case study demonstrating the block-based architecture for future CMS content.',
      ar: 'دراسة حالة تجريبية توضح بنية الكتل لمحتوى نظام إدارة المحتوى المستقبلي.',
    },
    coverAlt: {
      en: 'Placeholder cover for sample project',
      ar: 'صورة غلاف تجريبية للمشروع',
    },
    cardSize: 'wide',
    accentColor: '#9A6CFF',
    featured: true,
    order: 1,
    caseStudyBlocks: [
      {
        _type: 'richText',
        _key: 'intro',
        content: {
          en: [
            {
              _type: 'block',
              children: [
                {
                  _type: 'span',
                  text: '[Placeholder] This sample project validates rich text, media blocks, and structured case-study sections.',
                },
              ],
            },
          ],
          ar: [
            {
              _type: 'block',
              children: [
                {
                  _type: 'span',
                  text: '[تجريبي] يتحقق هذا المشروع من النص الغني وكتل الوسائط وأقسام دراسة الحالة.',
                },
              ],
            },
          ],
        },
      },
      {
        _type: 'fullWidthImage',
        _key: 'hero-image',
        alt: {
          en: 'Full-width placeholder image',
          ar: 'صورة تجريبية بعرض كامل',
        },
        caption: {
          en: 'Full-width image block placeholder',
          ar: 'كتلة صورة بعرض كامل',
        },
      },
      {
        _type: 'designPrinciple',
        _key: 'principle-1',
        title: {
          en: '[Placeholder] Idea First',
          ar: '[تجريبي] الفكرة أولًا',
        },
        description: {
          en: 'Visual systems should amplify a clear strategic idea, not replace it.',
          ar: 'يجب أن تعزز الأنظمة البصرية فكرة استراتيجية واضحة، لا أن تحل محلها.',
        },
      },
      {
        _type: 'imagePair',
        _key: 'pair-1',
        leftAlt: { en: 'Left placeholder', ar: 'يسار تجريبي' },
        rightAlt: { en: 'Right placeholder', ar: 'يمين تجريبي' },
      },
      {
        _type: 'quote',
        _key: 'quote-1',
        quote: {
          en: '[Placeholder] Technology is most powerful when it serves the idea.',
          ar: '[تجريبي] التقنية أقوى عندما تخدم الفكرة.',
        },
        attribution: {
          en: 'Sample attribution',
          ar: 'نسب تجريبي',
        },
      },
      {
        _type: 'metrics',
        _key: 'metrics-1',
        items: [
          {
            label: { en: '[Placeholder] Engagement', ar: '[تجريبي] التفاعل' },
            value: '+24%',
            context: {
              en: '[Placeholder] Verified campaign metric',
              ar: '[تجريبي] مقياس حملة موثّق',
            },
          },
          {
            label: { en: '[Placeholder] Launch timeline', ar: '[تجريبي] مدة الإطلاق' },
            value: '6 weeks',
          },
        ],
      },
      {
        _type: 'beforeAndAfter',
        _key: 'before-after-1',
        beforeAlt: { en: 'Before placeholder', ar: 'قبل — تجريبي' },
        afterAlt: { en: 'After placeholder', ar: 'بعد — تجريبي' },
        caption: { en: 'Identity refinement', ar: 'تحسين الهوية' },
      },
      {
        _type: 'caption',
        _key: 'caption-1',
        text: {
          en: 'Caption block for editorial notes.',
          ar: 'كتلة تعليق للملاحظات التحريرية.',
        },
      },
      {
        _type: 'credits',
        _key: 'credits-block',
        items: [
          {
            role: { en: 'Creative Direction', ar: 'التوجيه الإبداعي' },
            name: '[Placeholder Name]',
          },
        ],
      },
    ],
    credits: [
      {
        role: { en: 'Art Direction', ar: 'الإخراج الفني' },
        name: '[Placeholder Name]',
      },
    ],
    results: [
      {
        label: { en: '[Placeholder] Result', ar: '[تجريبي] نتيجة' },
        value: 'Validated architecture',
      },
    ],
    seoTitle: {
      en: '[Sample] Luminous Systems — Case Study',
      ar: '[تجريبي] أنظمة مضيئة — دراسة حالة',
    },
    seoDescription: {
      en: 'Sample project page for validating bilingual case-study architecture.',
      ar: 'صفحة مشروع تجريبية للتحقق من بنية دراسة الحالة ثنائية اللغة.',
    },
    status: 'published',
  },
];

export const fallbackProjectSummaries: ProjectSummary[] = fallbackProjects.map(
  ({
    _id,
    title,
    slug,
    client,
    year,
    role,
    categories,
    shortDescription,
    cover,
    coverAlt,
    cardSize,
    accentColor,
    featured,
    order,
    status,
  }) => ({
    _id,
    title,
    slug,
    client,
    year,
    role,
    categories,
    shortDescription,
    cover,
    coverAlt,
    cardSize,
    accentColor,
    featured,
    order,
    status,
  }),
);
