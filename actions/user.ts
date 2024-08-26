import { getDb } from "@/lib/database";

const sql = getDb();

export const getUserById = async (user_id: string) => {
    const result = await sql`
        SELECT * FROM user_info WHERE user_id = ${user_id}
    `;
    if (result.length > 0) {
        return result[0];
    }
    return {
        status: 404
    };
};

export async function saveUserToDb(user: {
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
    profileImageUrl: string;
}) {
    await sql`
        INSERT INTO user_info (
            user_id, first_name, last_name, email, image_url, last_login_at, updated_at
        ) VALUES (
            ${user.userId}, ${user.firstName}, ${user.lastName}, ${user.email}, 
            ${user.profileImageUrl}, ${new Date()}, NOW()
        )
        ON CONFLICT (user_id) DO UPDATE
        SET first_name = ${user.firstName},
            last_name = ${user.lastName},
            email = ${user.email},
            image_url = ${user.profileImageUrl},
            last_login_at = ${new Date()},
            updated_at = NOW()
    `;
}