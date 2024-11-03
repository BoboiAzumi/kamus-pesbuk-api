import client from "../db/client"
import type { DefaultArgs } from "@prisma/client/runtime/library"
import type { Prisma } from "@prisma/client"

export class WordListService{
    private wordList: Prisma.WordListDelegate<DefaultArgs>

    constructor(){
        this.wordList = client.wordList
    }

    async add(wordListObject: {word: string, summary: string, desc: string}){
        await this.wordList.create({
            data: {
                ...wordListObject
            }
        })
    }

    async findAll(limit: number = 10, offset: number = 0){
        const result = await this.wordList.findMany({
            skip: offset,
            take: limit
        })

        return result
    }
}