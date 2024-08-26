// pages/api/clerk-webhook.ts
import { clerkClient } from '@clerk/nextjs/server';
import { getDb } from '@/lib/database'; // 假设你有数据库连接模块
import { NextApiRequest, NextApiResponse } from 'next';

// Clerk Webhook 处理函数
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { body } = req;
    const db = getDb();

    // 确保这是 Clerk 发送的 Webhook 请求，并且处理注册、更新等事件
    if (req.method === 'POST') {
        const eventType = body.type; // 例如：'user.created', 'user.updated'
        const userId = body.data.id;

        // 获取 Clerk 用户信息
        try {
            const user = await clerkClient.users.getUser(userId);
            console.log("userInfo Is Updating.....")
            // 插入或更新用户信息到数据库
            await db.query(`
                INSERT INTO user_info (user_id, first_name, email, image_url, last_login_at)
                VALUES ($1, $2, $3, $4, to_timestamp($5 / 1000))
                ON CONFLICT (user_id) DO UPDATE 
                SET first_name = EXCLUDED.first_name, email = EXCLUDED.email, image_url = EXCLUDED.image_url, last_login_at = EXCLUDED.last_login_at, updated_at = now()
            `, [user.id, user.firstName, user.emailAddresses[0].emailAddress, user.imageUrl, user.lastSignInAt]);

            res.status(200).json({ message: 'User info synced successfully.' });
        } catch (error) {
            console.error('Error syncing user info:', error);
            res.status(500).json({ error: 'Failed to sync user info.' });
        }
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}