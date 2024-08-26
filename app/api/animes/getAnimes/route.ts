import { NextRequest, NextResponse } from 'next/server';
import { findPictures } from '@/actions/pictureRepo';

const MAX_RETRIES = 3;
const RETRY_INTERVAL = 2000;

async function retryOperation(operation: () => Promise<any>, retries = MAX_RETRIES): Promise<any> {
    try {
      return await operation();
    } catch (error) {
      if (retries > 0) {
        console.log(`重试操作，剩余尝试次数: ${retries - 1}`);
        await new Promise(resolve => setTimeout(resolve, RETRY_INTERVAL));
        return retryOperation(operation, retries - 1);
      }
      throw error;
    }
  }

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const pageSize = parseInt(searchParams.get('pageSize') || '24', 10);

    try {
        const result = await retryOperation(() => findPictures(page, pageSize));
        if (result.status === 404) {
            return NextResponse.json({ error: 'No images found' }, { status: 404 });
        }
        return NextResponse.json(result, { status: 200 });
    } catch (error) {
        console.error('Error fetching animes:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}