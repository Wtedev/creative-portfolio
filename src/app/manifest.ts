import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Creative Portfolio',
    short_name: 'Portfolio',
    description: 'Art Director & Creative Developer portfolio',
    start_url: '/en',
    display: 'browser',
    background_color: '#F3F1F5',
    theme_color: '#111017',
    lang: 'en',
  };
}
