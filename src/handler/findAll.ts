import type { Context } from "hono";
import { wordListService } from "../helper/WordListServiceInstance";
import { HTTPException } from "hono/http-exception";

export async function findAll(context: Context){
    try{
        const result = await wordListService.findAll()
        return context.json(result)
    }
    catch(error: unknown){
        throw new HTTPException(500, {
            message: (error as Error).message,
            cause: error
        })
    }
}