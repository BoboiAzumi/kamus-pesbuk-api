import { type Context, Hono } from "hono"
import { serve } from "bun"
import { HTTPException } from "hono/http-exception"
import { findAll } from "./src/handler/findAll"
import { create } from "./src/handler/create"

const port = 2000
const app = new Hono()

app.get("/", findAll)
app.post("/", create)

app.onError((error: Error, context: Context) => {
    if(error instanceof HTTPException){
        return error.getResponse()
    }

    context.status(500)
    return context.json({
        status: "ERROR",
        name: error.name,
        cause: error
    })
})

serve({
    fetch: app.fetch,
    port: port
})
console.log(`Started on port ${port}`)