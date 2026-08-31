import type { Capability } from '@/types/global';

export const fallbackCapabilities: Capability[] = [
  {
    _id: 'capability-1',
    title: {
      en: 'Art Direction',
      ar: 'الإخراج الفني',
    },
    description: {
      en: 'Concepts, visual languages, campaign systems and image direction.',
      ar: 'مفاهيم ولغات بصرية وأنظمة حملات وتوجيه الصورة.',
    },
    items: {
      en: ['Concept development', 'Visual direction', 'Campaign systems'],
      ar: ['تطوير المفاهيم', 'التوجيه البصري', 'أنظمة الحملات'],
    },
    order: 1,
    visible: true,
  },
  {
    _id: 'capability-2',
    title: {
      en: 'Identity & Digital Design',
      ar: 'الهوية والتصميم الرقمي',
    },
    description: {
      en: 'Brand systems and creative websites that stay coherent across touchpoints.',
      ar: 'أنظمة علامات ومواقع إبداعية تبقى متماسكة عبر نقاط التواصل.',
    },
    items: {
      en: ['Brand systems', 'Creative websites', 'Design guidelines'],
      ar: ['أنظمة العلامة', 'مواقع إبداعية', 'إرشادات التصميم'],
    },
    order: 2,
    visible: true,
  },
  {
    _id: 'capability-3',
    title: {
      en: 'Creative Development',
      ar: 'التطوير الإبداعي',
    },
    description: {
      en: 'Responsive prototypes, motion and interactive front-end experiences.',
      ar: 'نماذج متجاوبة وحركة وتجارب واجهات تفاعلية.',
    },
    items: {
      en: ['Interactive prototypes', 'Motion systems', 'Front-end craft'],
      ar: ['نماذج تفاعلية', 'أنظمة الحركة', 'حرفية الواجهات'],
    },
    order: 3,
    visible: true,
  },
];
