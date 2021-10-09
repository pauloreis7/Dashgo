import express from 'express';
import cors from 'cors';

import routes from './routes'
import { seedUserStore } from './database';

const app = express();

app.use(express.json());
app.use(cors())
app.use(routes)

seedUserStore();

app.listen(3333);