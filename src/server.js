import express from 'express'
import bodyParser from 'body-parser'
import configViewEngine from './config/viewEngine'
import initWebRoutes from './route/web'
import connectDB from './config/connectDB'
import cors from 'cors'
require('dotenv').config()


let app = express()
app.use(cors())
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'X-Request-With,content-type')
    res.setHeader('Access-Control-Allow-Credentials', true)
    next()
})

// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ limit: '50mb' }))

configViewEngine(app)
initWebRoutes(app)

connectDB()

let port = process.env.PORT || 3000

app.listen(port, () => {
    console.log("backend nodejs" + port)
})