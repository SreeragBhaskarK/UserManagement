import express  from 'express'
import {config} from 'dotenv'
import cors from 'cors'
import bodyParser from 'body-parser'
config()
import userRouter  from './routes/userRouters.js'
import adminRouter from './routes/adminRouter.js'
const app = express()
// enable cors
app.use(cors())
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

app.use('/',userRouter)
app.use('/admin',adminRouter)


app.listen(process.env.PORT,()=>console.log('server connected 🚀🚀🚀'))