import { draftMode } from 'next/headers';
import { NextResponse } from 'next/server';

import { getSanityPreviewSecret, isPreviewConfigured } from '@/lib/env';
import { sanitizeInternalRedirect } from '@/lib/seo/urls';
import type { Locale } from '@/types/global';

export async function GET(request: Request) {
  if (!isPreviewConfigured()) {
    return new NextResponse('Preview is not configured', { status: 503 });
  }

  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret');
  const slug = searchParams.get('slug');
  const locale = (searchParams.get('locale') ?? 'en') as Locale;
  const defaultRedirect = slug ? `/${locale}/project/${slug}` : `/${locale}`;
  const redirectPath = sanitizeInternalRedirect(
    searchParams.get('redirect'),
    locale,
    defaultRedirect,
  );

  if (secret !== getSanityPreviewSecret()) {
    return new NextResponse('Invalid preview secret', { status: 401 });
  }

  const draft = await draftMode();
  draft.enable();

  return NextResponse.redirect(new URL(redirectPath, request.url));
}
