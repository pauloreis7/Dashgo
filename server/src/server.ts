import 'reflect-metadata'
import express from 'express'
import cors from 'cors'
import { errors } from 'celebrate'

import routes from './http/routes'

import './database'

const app = express()

app.use(express.json())
app.use(cors())
app.use(routes)

app.use(errors())

app.listen(3333, () => 
  console.log(`🚀 Server is running on PORT 3333`)
)