import { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import { wordListService } from "../helper/WordListServiceInstance";

export async function create(context: Context){
    try{
        const { word, summary, desc } = await context.req.json()
        await wordListService.add({word, summary, desc})

        return context.json({
            status: "OK"
        })
    }
    catch (error){
        throw new HTTPException(500, {
            message: (error as Error).message,
            cause: error
        })
    }
}