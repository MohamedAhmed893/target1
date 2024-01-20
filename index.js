import express from 'express'
import { dbConnection } from './utils/dbConnection.js';
import dotenv from 'dotenv'
import cors from 'cors'
import morgan from 'morgan';
import { apiRoutes } from './routes/index.routes.js';
const app =express()

dotenv.config()
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))


apiRoutes(app)
dbConnection()
app.listen(process.env.PORT||3000,()=>{
    console.log("Server is Running");
})