import { NextResponse } from 'next/server';
import { findPicturesByUserId } from '@/actions/pictureRepo';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
        return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    try {
        const pictures = await findPicturesByUserId(userId);
        return NextResponse.json(pictures || []);
    } catch (error) {
        console.error('Error fetching user images:', error);
        return NextResponse.json({ error: 'Failed to fetch user images' }, { status: 500 });
    }
}