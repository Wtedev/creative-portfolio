import type { SiteSettings } from '@/types/global';

export const fallbackSiteSettings: SiteSettings = {
  siteTitle: 'Creative Portfolio',
  professionalTitle: {
    en: 'Art Director & Creative Developer',
    ar: 'مخرجة فنية ومطوّرة إبداعية',
  },
  heroStatement: {
    en: 'I build visual identities, campaigns, and creative websites around strong ideas.',
    ar: 'أبني هويات وحملات ومواقع إبداعية تنطلق من أفكار واضحة.',
  },
  eyebrow: {
    en: 'Independent / Available for selected roles & projects',
    ar: 'مستقلة / متاحة لفرص وظيفية ومشاريع مختارة',
  },
  defaultLocale: 'en',
  defaultTheme: 'system',
  email: 'hello@example.com',
  linkedin: 'https://linkedin.com/in/placeholder',
  seo: {
    title: {
      en: 'Art Director & Creative Developer — Portfolio',
      ar: 'مخرجة فنية ومطوّرة إبداعية — معرض أعمال',
    },
    description: {
      en: 'Portfolio placeholder for art direction, visual identities, campaigns, and creative websites.',
      ar: 'محتوى تجريبي لمعرض أعمال يعرض الإخراج الفني والهويات البصرية والحملات والمواقع الإبداعية.',
    },
  },
};
