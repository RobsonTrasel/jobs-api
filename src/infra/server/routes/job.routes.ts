import express, { Router, Request, Response} from 'express'

const jobRoutes: Router = express.Router()

jobRoutes.get('/', (req: Request, res: Response) => {
    res.send('This a default route')
})

export default jobRoutes