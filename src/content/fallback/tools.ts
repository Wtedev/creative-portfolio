import type { Tool } from '@/types/global';

export const fallbackTools: Tool[] = [
  {
    _id: 'tool-1',
    name: 'Figma',
    category: 'design',
    description: {
      en: '[Placeholder] Primary design and prototyping tool.',
      ar: '[تجريبي] أداة التصميم والنماذج الأولية الأساسية.',
    },
    proficiency: 'working',
    order: 1,
    visible: true,
  },
  {
    _id: 'tool-2',
    name: 'After Effects',
    category: 'motion',
    description: {
      en: '[Placeholder] Motion exploration and campaign assets.',
      ar: '[تجريبي] استكشاف الحركة وأصول الحملات.',
    },
    proficiency: 'comfortable',
    order: 2,
    visible: true,
  },
  {
    _id: 'tool-3',
    name: 'React',
    category: 'build',
    description: {
      en: '[Placeholder] Creative web experiences and interactive prototypes.',
      ar: '[تجريبي] تجارب الويب الإبداعية والنماذج التفاعلية.',
    },
    proficiency: 'working',
    order: 3,
    visible: true,
  },
  {
    _id: 'tool-4',
    name: 'Blender',
    category: 'ai',
    description: {
      en: '[Placeholder] Experimental 3D and visual exploration.',
      ar: '[تجريبي] استكشاف ثلاثي الأبعاد وتجريبي بصري.',
    },
    proficiency: 'exploring',
    order: 4,
    visible: true,
  },
];
