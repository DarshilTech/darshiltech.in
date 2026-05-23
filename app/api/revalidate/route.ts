import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  // Vercel Cron sends: Authorization: Bearer <CRON_SECRET>
  const authHeader = req.headers.get('authorization');
  const querySecret = req.nextUrl.searchParams.get('secret');

  const validCron = authHeader === `Bearer ${process.env.CRON_SECRET}`;
  const validManual = querySecret === process.env.REVALIDATE_SECRET;

  if (!validCron && !validManual) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  revalidatePath('/sitemap.xml');
  revalidatePath('/insights');
  revalidatePath('/', 'layout');

  return NextResponse.json({
    revalidated: true,
    timestamp: new Date().toISOString(),
  });
}
