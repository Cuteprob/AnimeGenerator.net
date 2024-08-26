import { SignedIn, SignedOut, SignInButton, UserButton,useAuth } from "@clerk/nextjs";

import { useEffect } from "react";

const SignIn = () => {
    const { userId, isSignedIn } = useAuth();  // 使用 isLoaded 确保用户信息已加载


    // 仅当用户信息加载完毕且 user 不为 null 时执行
    useEffect(() => {
        if (isSignedIn && userId) {
            saveUserToBackend(userId);  // 调用保存用户信息的函数
        }
    }, [userId,isSignedIn]);

    const saveUserToBackend = async (userId: string) => {
        try {
            const response = await fetch(`/api/user/saveUser`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userId: userId,
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to save user data");
            }
        } catch (error) {
            console.error("Error saving user data:", error);
        }
    };

    return (
        <>
            <SignedOut>
                <SignInButton mode="modal">
                    <button className="btn btn-xs md:btn-sm font-thin md:text-sm text-xs">
                        Sign In
                    </button>
                </SignInButton>
            </SignedOut>
            <SignedIn>
                <div className="flex items-center space-x-2 h-10 w-10 md:h-8 md:w-8">
                    <UserButton />
                </div>
            </SignedIn>
        </>
    );
};

export default SignIn;