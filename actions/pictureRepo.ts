import { getDb } from "@/lib/database";


const db = getDb();
export async function findPictureById(id: string) {
    console.log("findPictureBy  Id ===>", id);
    const result = await db.query('select * from "Picture" where "id" = $1', [id]);
    const picture = result.rows;
    if(picture.length > 0){
        return picture[0];
    }
    return {
        status:404
    };
}

export async function findPictures(page: number = 1, pageSize: number = 24) {
    const offset = (page - 1) * pageSize;
    const countResult = await db.query('SELECT COUNT(*) FROM "Picture"');
    const totalCount = parseInt(countResult.rows[0].count, 10);
    const results = await db.query('SELECT * FROM "Picture" ORDER BY "createdAt" DESC LIMIT $1 OFFSET $2', [pageSize, offset]);
    const pictures = results.rows;
    if (pictures.length > 0) {
        return {
            animes: pictures,
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
    const results =await db.query('select * from "Picture" where "userId" = $1 order by "createdAt" desc', [userId]);
    const pictures = results.rows;
    if(pictures.length > 0 ){
        return pictures;
    }
}

export async function createPicture(picture: any) {
    const result = await db.query('insert into "Picture" ("userId", "prompt", "tags", "params", "url", "status") values ($1,$2,$3,$4,$5,$6) RETURNING id', [picture.userId,picture.prompt,picture.tags,picture.params,picture.url,picture.status])
    return result.rows[0];
}