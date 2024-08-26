import Replicate from "replicate"
import { downloadAndUploadImage } from "@/lib/s3";
import { PictureStatus } from "@/prisma/enums";
import { createPicture } from "./pictureRepo";
export async function GenerateAnime(userId:string, prompt: string) {
    const replicate = new Replicate({
        auth: process.env.REPLICATE_API_TOKEN,
    });

    const systemPrompt = process.env.PROMPT_PICTURE_STYLE || "manga style"
    const inputPrompt = systemPrompt + prompt;

    console.log("inputPrompt ===>",inputPrompt)

    try {
        const output = await replicate.run(
            "black-forest-labs/flux-schnell",
            {
                input:{
                    prompt: inputPrompt,
                    num_outputs: 1,
                    aspect_ratio: "1:1",
                    output_quality: 90,
                    disable_safty_checks: true,
                },
            }
        );

        if (Array.isArray(output) && output.length > 0) {
            const imageUrl = output[0];
        
            const url = await downloadAndUploadImage(imageUrl);
        
            const tags: string[] = [];
            // 保存到数据库
            const picture = {
              userId: userId,
              prompt: prompt,
              tags: tags,
              params: { input: inputPrompt, tags: tags },
              url: url,
              status: PictureStatus.ONLINE,
            };
        
            const ret = await createPicture(picture);
        
            return ret;
        }
    } catch (error) {
        if (error instanceof Error && error.message.includes("NSFW content detected")) {
            throw new Error("NSFW content detected. Please try a different prompt.");
        }
        throw new Error("Failed to generate image"); // 重新抛出其他类型的错误
    }
}