'use client';

import dynamic from 'next/dynamic';

import config from '@/sanity/sanity.config';

const NextStudio = dynamic(() => import('next-sanity/studio').then((mod) => mod.NextStudio), {
  ssr: false,
  loading: () => <p className="text-body">Loading Studio…</p>,
});

export function SanityStudio() {
  return <NextStudio config={config} />;
}
