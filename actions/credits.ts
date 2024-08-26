import { UserCredits } from "@/types/user";
import { getDb } from "@/lib/database";

const sql = getDb();

export async function checkUserCredits(
    userId: string,
    count: number,
): Promise<boolean> {
    const credits = await getUserCredits(userId);
    return checkCredits(credits, count);
}

export async function consumeUserCredits(userId: string, count: number) {
    // 获取用户的当前 credits
    const credits = await getUserCredits(userId);

    // 扣减 credits
    consumeCredits(credits, count);

    // 更新数据库
    await sql`
        UPDATE user_credits
        SET free_credits_left = ${credits.free.left}, 
            free_credits_used = ${credits.free.used}, 
            paid_credits_left = ${credits.purchased?.left || 0}, 
            paid_credits_used = ${credits.purchased?.used || 0}, 
            updated_at = now()
        WHERE user_id = ${userId}
    `;
}

export async function getUserCredits(userId: string): Promise<UserCredits> {
    // 从数据库中获取用户的 credits
    const res = await sql`
        SELECT free_credits_total, free_credits_used, paid_credits_total, paid_credits_used 
        FROM user_credits 
        WHERE user_id = ${userId}
    `;

    if (res.length === 0) {
        // 如果是首次登录，初始化用户的 credits 并存入数据库
        const initialCredits = generateInitialUserCredits();
        await sql`
            INSERT INTO user_credits (
                user_id, free_credits_total, free_credits_used, free_credits_left, 
                paid_credits_total, paid_credits_used, paid_credits_left, updated_at
            )
            VALUES (
                ${userId}, ${initialCredits.free.total}, ${initialCredits.free.used}, ${initialCredits.free.left}, 
                0, 0, 0, now()
            )
        `;

        return initialCredits;
    }

    const row = res[0];

    // 添加类型检查和错误处理
    if (typeof row.free_credits_total !== 'number' || 
        typeof row.free_credits_used !== 'number' || 
        typeof row.paid_credits_total !== 'number' || 
        typeof row.paid_credits_used !== 'number') {
        throw new Error('Invalid data format from database');
    }

    // 返回用户的 credits 信息
    return {
        free: {
            total: row.free_credits_total,
            used: row.free_credits_used,
            left: row.free_credits_total - row.free_credits_used
        },
        purchased: {
            total: row.paid_credits_total,
            used: row.paid_credits_used,
            left: row.paid_credits_total - row.paid_credits_used
        }
    };
}

function consumeCredits(credits: UserCredits, count: number) {
    if (!checkCredits(credits, count)) {
        throw new Error("Not enough credits");
    }

    if (credits.free.left >= count) {
        credits.free.left -= count;
        credits.free.used += count;
    } else {
        const minus = count - credits.free.left;
        credits.free.left = 0;
        credits.purchased!.left -= minus;
        credits.purchased!.used += minus;
    }
}

function checkCredits(credits: UserCredits, count: number): boolean {
    if (credits.free.left >= count) {
        return true;
    }
    if (!credits.purchased) {
        return false;
    }
    const minus = count - credits.free.left;
    return credits.purchased.left >= minus;
}

function generateInitialUserCredits(): UserCredits {
    const initialUserCredits = {
        free: {
            total: 100,
            used: 0,
            left: 100,
        }
    }
    return initialUserCredits;
}