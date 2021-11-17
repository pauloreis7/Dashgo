import { Router } from 'express'

import usersRouter from './users.routes'
import sessionsRouter from './sessions.routes'
import leadsRouter from './leads.routes'
import productsAutomationsRouter from './productsAutomations.routes'

const app = Router()

app.use('/users', usersRouter)
app.use('/sessions', sessionsRouter)
app.use('/leads', leadsRouter)
app.use('/productsAutomations', productsAutomationsRouter)

export default app