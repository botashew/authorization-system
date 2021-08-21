const express = require('express')
const authRoutes = require('./router/authRoutes')
const cookiesParser = require('cookie-parser')
const { isLogedIn, checkUser } = require('./middleware/authMiddleware')
require('./mongo-connection')
const app = express()

app.use(express.json())
app.use(cookiesParser())

app.get('*', checkUser)
app.get('/', (req, res) => { res.render('home') })
app.get('/lenta', isLogedIn, (req, res) => { res.render('lenta') })
app.use(authRoutes)

// View engine
app.set('view engine', 'ejs')

// Listener
const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log('Listening on port ' + port)
})