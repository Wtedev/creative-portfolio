import type { Metadata } from 'next';

import { isPreviewConfigured, isSanityConfigured } from '@/lib/env';

import { SanityStudio } from '../studio-client';

export const metadata: Metadata = {
  title: 'Studio',
  robots: { index: false, follow: false },
};

export default function StudioPage() {
  if (!isSanityConfigured()) {
    return (
      <main id="main-content" className="studio-setup">
        <div className="studio-setup__card">
          <h1 className="text-h2">Sanity Studio Setup</h1>
          <p className="text-body">
            Connect this repository to a Sanity project to manage portfolio content.
          </p>
          <ol className="text-body studio-setup__steps">
            <li>Create or select a project at sanity.io/manage.</li>
            <li>
              Copy <code>.env.example</code> to <code>.env.local</code>.
            </li>
            <li>
              Add <code>NEXT_PUBLIC_SANITY_PROJECT_ID</code> and{' '}
              <code>NEXT_PUBLIC_SANITY_DATASET</code>.
            </li>
            <li>
              Optional for preview: add server-only <code>SANITY_API_READ_TOKEN</code> and{' '}
              <code>SANITY_PREVIEW_SECRET</code>.
            </li>
            <li>Restart the dev server and revisit /studio.</li>
          </ol>
          <p className="text-small">
            See <code>docs/09-sanity-setup.md</code> for CORS, dataset, and preview details. The
            public site continues using local fallback fixtures until Sanity is connected.
          </p>
        </div>
      </main>
    );
  }

  return (
    <>
      {!isPreviewConfigured() ? (
        <p className="studio-setup__notice text-small">
          Preview mode is disabled until SANITY_API_READ_TOKEN and SANITY_PREVIEW_SECRET are set.
        </p>
      ) : null}
      <SanityStudio />
    </>
  );
}
