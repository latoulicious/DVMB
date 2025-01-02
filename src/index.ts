import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import rateLimit from 'express-rate-limit'
import routes from './routes'

dotenv.config()

const app = express()
const port = process.env.PORT || 3000

// CORS configuration
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))

// Rate limiter configuration
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
})

// Apply rate limiter to all requests
app.use(limiter)

app.use(express.json())

// Use routes
app.use('/api', routes)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})