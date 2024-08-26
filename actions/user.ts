import { getDb } from "@/lib/database";
// [user.id, user.firstName, user.emailAddresses[0].emailAddress, user.imageUrl, user.lastSignInAt]

export  const getUserById = async (user_id:any) => {
    const db = getDb();
    const result = await db.query('select * from user_info where user_id=$1',[user_id]);
    const users = result.rows;
    if(users.length > 0){
        const user = users[0];
        return user
    }
    return {
        status:404
    }
}

export async function saveUserToDb(user:any) {
    const db = getDb();
    const query = `
    INSERT INTO user_info (user_id, first_name, last_name, email, image_url, last_login_at, updated_at)
        VALUES ($1, $2, $3, $4, $5, $6, NOW())
        ON CONFLICT (user_id) DO UPDATE
        SET first_name = $2,
            last_name = $3,
            email = $4,
            image_url = $5,
            last_login_at = $6,
            updated_at = NOW()
    `;
    const values = [
        user.userId,
        user.firstName,
        user.lastName,
        user.email,
        user.profileImageUrl,
        new Date()  // Assuming this is the last login time, you can adjust this
    ];
    await db.query(query, values);
 
}