import 'dotenv/config'
import express from 'express'
import { apiRouter } from '@routes/api.route'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import { Server } from 'http'

const _filename = fileURLToPath(import.meta.url)
const _dirname = dirname(dirname(_filename))

const app = express()

const server = new Server(app)

const port = process.env.PORT || 4000

app.use(express.json())

app.use('/api', apiRouter)

// Serve static files from the dist directory
// app.use(express.static(join(_dirname, 'public')))

// Route to serve error pages without the .html extension
// app.get('/errors/:fileName', (req, res) => {
//   const fileName = req.params.fileName
//   const filePath = join(_dirname, '/public/errors', `${fileName}.html`)
//
//   res.sendFile(filePath, (err) => {
//     if (err) {
//       res.status(404).send('Page not found')
//     }
//   })
// })

// // Fallback to serve the index.html for any route
// app.get('*', (_req, res) => {
//   res.sendFile(join(_dirname, 'public', 'index.html'))
// })

server.listen(Number(port), '0.0.0.0', () => {
  console.log(`Server is running on http://0.0.0.0:${port}`)
})
