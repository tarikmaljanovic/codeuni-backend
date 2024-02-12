import express from 'express'
import cors from 'cors'
import sequelize from './sequelize.js'
import userRoutes from './routes/userRoutes.js'
import courseRoutes from './routes/courseRoutes.js'
import badgeRoutes from './routes/badgeRoutes.js'
import lessonRoutes from './routes/lessonRoutes.js'
import projectRoutes from './routes/projectRoutes.js'

const app = express()
const port = process.env.PORT || 8000

app.use(cors())
app.use(express.json())
app.use('/users', userRoutes)
app.use('/courses', courseRoutes)
app.use('/badges', badgeRoutes)
app.use('/lessons', lessonRoutes)
app.use('/projects', projectRoutes)

app.get('/', (req, res) => {
    sequelize.authenticate()
    .then(() => {
        res.send("Connection has been established successfully.")
    })
    .catch(err => {
        res.send("Unable to connect to the database:", err)
    })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})