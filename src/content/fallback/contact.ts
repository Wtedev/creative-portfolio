import type { ContactContent } from '@/types/global';

export const fallbackContact: ContactContent = {
  heading: {
    en: 'Have a role or project in mind?',
    ar: 'لديك وظيفة أو مشروع مناسب؟',
  },
  body: {
    en: "I'm open to joining ambitious creative teams and collaborating with companies on selected identity, campaign and digital projects.",
    ar: 'أنا منفتحة على الانضمام إلى فرق إبداعية طموحة والتعاون مع شركات في مشاريع هوية وحملات وتجارب رقمية مختارة.',
  },
  email: 'hello@example.com',
  linkedin: 'https://linkedin.com/in/placeholder',
  location: {
    en: 'Location available on request',
    ar: 'الموقع متاح عند الطلب',
  },
  availabilityStatus: 'available',
  availabilityLabel: {
    en: 'Available for selected opportunities',
    ar: 'متاحة لفرص مختارة',
  },
  roleCtaLabel: {
    en: 'Discuss a Role',
    ar: 'ناقش فرصة وظيفية',
  },
  projectCtaLabel: {
    en: 'Start a Project',
    ar: 'ابدأ مشروعًا',
  },
  visible: true,
};
