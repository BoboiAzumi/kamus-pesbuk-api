import { Hono, type Context } from "hono"

const app = new Hono()

app.get("/", (c: Context) => {
    return c.json({
        status: "OK"
    })
})