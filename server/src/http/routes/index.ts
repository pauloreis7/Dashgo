import { Router } from 'express'

import usersRouter from './users.routes'
import sessionsRouter from './sessions.routes'

const app = Router()

app.use('/users', usersRouter)
app.use('/sessions', sessionsRouter)

export default app