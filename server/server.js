const path = require('path')
const express = require('express')
const app = express()

const publicPath = path.join(__dirname, '..', 'public')
const port = process.env.PORT || 3000

app.use(express.static(publicPath))

//*** respond to any call from the expensify app by returning the index.html ***/
app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'))
})

// app.get('/en', (req, res) => {
//   res.sendFile(path.join(publicPath, 'index-en.html'))
// })

// app.get('/ar', (req, res) => {
//   res.sendFile(path.join(publicPath, 'index-ar.html'))
// })

app.listen(port, () => {
  console.log('Server is now running on port', port)
})
