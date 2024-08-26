import { getDb } from "@/lib/database";

const sql = getDb();

export async function findPictureById(id: string) {
    console.log("findPictureBy  Id ===>", id);
    const result = await sql`SELECT * FROM "Picture" WHERE "id" = ${id}`;
    if (result.length > 0) {
        return result[0];
    }
    return {
        status: 404
    };
}

export async function findPictures(page: number = 1, pageSize: number = 24) {
    const offset = (page - 1) * pageSize;
    const countResult = await sql`SELECT COUNT(*) FROM "Picture"`;
    const totalCount = parseInt(countResult[0].count, 10);
    const results = await sql`
        SELECT * FROM "Picture" 
        ORDER BY "createdAt" DESC 
        LIMIT ${pageSize} OFFSET ${offset}
    `;
    if (results.length > 0) {
        return {
            animes: results,
            total: totalCount,
            page,
            pageSize,
            totalPages: Math.ceil(totalCount / pageSize)
        };
    }
    return {
        status: 404
    };
}

export async function findPicturesByUserId(userId: string) {
    const results = await sql`
        SELECT * FROM "Picture" 
        WHERE "userId" = ${userId} 
        ORDER BY "createdAt" DESC
    `;
    if (results.length > 0) {
        return results;
    }
}

export async function createPicture(picture: any) {
    const result = await sql`
        INSERT INTO "Picture" ("userId", "prompt", "tags", "params", "url", "status")
        VALUES (${picture.userId}, ${picture.prompt}, ${picture.tags}, ${picture.params}, ${picture.url}, ${picture.status})
        RETURNING id
    `;
    return result[0];
}