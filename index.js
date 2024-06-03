import express from 'express'  
import cors from "cors"
import bodyParser from "body-parser"

import connectDB from './database.js'
import UsersRouter from './routers/usersRouter.js'
import LinksRouter from './routers/linksRouter.js'
import LinksController from './controllers/linksController.js'

connectDB();

const app = express()
const port = 3000
app.use(cors())
app.use(bodyParser.json())
app.get("/:id", LinksController.redirect)
app.use('/users', UsersRouter)
app.use('/links', LinksRouter)

  
  app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}`)
  })