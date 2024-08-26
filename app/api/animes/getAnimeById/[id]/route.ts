import { findPictureById } from '@/actions/pictureRepo';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, {params}: {params: {id: string}}) {
    const { id } = params;
    if (!id || typeof id !== 'string') {
        return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
    }

    try {
        console.log(`Fetching anime with ID: ${id}`);
        const anime = await findPictureById(id);
        if (!anime) {
            console.log(`Anime with ID: ${id} not found`);
            return NextResponse.json({ error: 'Anime not found' }, { status: 404 });
        }

        console.log(`Anime found: ${JSON.stringify(anime)}`);
        return NextResponse.json({ anime }, { status: 200 });
    } catch (error) {
        console.error('Error fetching anime:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}