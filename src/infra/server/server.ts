import express from 'express'
import { errorHandler } from './middlewares/error-handler.middleware'
import { loggerHandler } from './middlewares/logger.middleware'
import jobRoutes from './routes/job.routes';

const app = express()

app.use(express.json())
app.use(errorHandler)
app.use(loggerHandler)

app.use('/jobs', jobRoutes)

app.listen(3000, () => {
    console.log(`Server started` )
})