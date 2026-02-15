import { OPERATORS, CHECKPOINT_STATUS, INITIAL_MESSAGES } from "./db/db.js"
import jwt from "jsonwebtoken"
import { config } from "dotenv"
config()

export function login(req, res) {
    const { userName, password } = req.body
    const user = OPERATORS.find((operator) => {
        return operator.username === userName && operator.password === password
    })
    if (user !== undefined) {
        const token = jwt.sign({ userName: user.username, id: user.id, role: user.role }, process.env.JWT_SERVER)
        return res.setHeader("Authorization", token).json({ operator: { id: user.id, name: user.name, role: user.role } })
    } else {
        return res.send("userName or password is invalid!")
    }
}

export function status(req, res) {
    const token = req.header("Authorization")
    const tokenVerify = jwt.verify(token, process.env.JWT_SERVER)
    if (tokenVerify) {
        return res.json({
            checkpoint: CHECKPOINT_STATUS.checkpoint,
            isOpen: CHECKPOINT_STATUS.isOpen,
            trafficLevel: CHECKPOINT_STATUS.trafficLevel,
            lastUpdated: CHECKPOINT_STATUS.lastUpdated
        })
    }
    else {
        res.send("not valid")
    }
}

export function getMessage(req, res) {
    const token = req.header("Authorization")
    const tokenVerify = jwt.verify(token, process.env.JWT_SERVER)
    if (tokenVerify) {
        const messages = INITIAL_MESSAGES.find(m => m.from.id === tokenVerify.id)
        if (messages !== undefined) {
            return res.send(messages)
        } else {
            return res.json({ messages: "No matching message found." })
        }
    } else {
        return res.json({ messages: "The token is invalid or expired." })
    }
}

export function postMessage(req, res) {
    const token = req.header("Authorization")
    const { text } = req.body
    const tokenVerify = jwt.verify(token, process.env.JWT_SERVER)
    if (tokenVerify) {
        const obj = {
            id: "msg_" + 100 + INITIAL_MESSAGES.length + 1,
            text,
            from: { id: tokenVerify.id, name: tokenVerify.userName, role: tokenVerify.role },
            channel: "system",
            priority: "high",
            createdAt: new Date(Date.now() - 1000 * 60 * 18).toISOString(),
        }
        INITIAL_MESSAGES.push(obj)
        return res.json({ messages: "add a new message" })
    }
}