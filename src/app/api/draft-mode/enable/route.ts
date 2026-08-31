import { draftMode } from 'next/headers';
import { NextResponse } from 'next/server';

import { getSanityPreviewSecret, isPreviewConfigured } from '@/lib/env';

export async function GET(request: Request) {
  if (!isPreviewConfigured()) {
    return new NextResponse('Preview is not configured', { status: 503 });
  }

  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret');
  const slug = searchParams.get('slug');
  const locale = searchParams.get('locale') ?? 'en';
  const redirectPath =
    searchParams.get('redirect') ?? (slug ? `/${locale}/project/${slug}` : `/${locale}`);

  if (secret !== getSanityPreviewSecret()) {
    return new NextResponse('Invalid preview secret', { status: 401 });
  }

  const draft = await draftMode();
  draft.enable();

  return NextResponse.redirect(new URL(redirectPath, request.url));
}
