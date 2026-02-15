import express from "express"
import cors from "cors"
import {getMessage, login, postMessage, status} from "./cntrl.js"

const app = express()

const port = 3000

app.use(cors({
    exposedHeaders:["Authorization"]
}))

app.use(express.json())

app.post("/login",login)

app.get("/status",status)

app.get("/messages",getMessage)

app.post("/messages",postMessage)

app.get("/",(req,res)=>{
    res.send("wolcome to server")
})

app.listen(port,()=>{
console.log(`server runing in http://localhost:${port}`)
})