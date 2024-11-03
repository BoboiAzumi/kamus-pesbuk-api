import { describe, jest, it, mock, expect, beforeEach, spyOn } from "bun:test"
import { WordListService } from "../WordListService"
import client from "../../db/client"

mock.module("../../db/client", () => (
    {
        wordList: jest.fn()
    }
))

type wordList = {
    id?: number
    word: string,
    summary: string,
    desc: string,
    status?: string
}

client.wordList.create = jest.fn()
client.wordList.findMany = jest.fn()

describe("Test WordListService", () => {
    let service: WordListService

    beforeEach(() => {
        service = new WordListService()
    })

    describe("Add Wordlist", () => {
        it("Should error", () => {
            (client.wordList.create as jest.Mock).mockImplementationOnce(() => {
                throw new Error()
            })

            expect(service.add(
                {
                    word: "Hideung", 
                    summary: "Hitam",
                    desc: "hitam"
                })).rejects.toThrow()
        })

        it("Should add", async () => {
            const data = {
                word: "Hideung", 
                summary: "Hitam",
                desc: "hitam"
            }

            await service.add(data)

            expect(client.wordList.create).toHaveBeenCalledWith({
                data: {
                    ...data
                }
            })
        })
    })

    describe("Find all Wordlist", () => {
        it("Should error", async () => {
            (client.wordList.findMany as jest.Mock).mockImplementationOnce(() => {
                throw new Error()
            })

            expect(service.findAll()).rejects.toThrow()
        })

        it("Should return all wordlist", async () => {
            const value: wordList[] = [{
                id: 1,
                word: "Gorengan",
                summary: "Drama",
                desc: "Sebuah drama yang terjadi saat ini",
                status: "PUBLISHED"
            }];

            (client.wordList.findMany as jest.Mock).mockReturnValueOnce(value)

            const result: wordList[] = await service.findAll()

            expect(result).toEqual(value)
        })
    })
})