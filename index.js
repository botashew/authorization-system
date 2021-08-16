// Requires
const express = require('express')
const app = express()
const SignUp = require('./routes/signup')
const LogIn = require('./routes/login')
const bodyParser = require('body-parser')
// const flash = require('connect-flash')
// Connection to MongoDB
require('./mongo-connection')

// View engine - PUG
app.set('view engine', 'pug')

// Body Parser
app.use(bodyParser.json())
app.use(express.urlencoded({extended: false}))

// Connnect flash
// app.use(flash())
// app.use((req, res, next) => {
//     res.locals.success_msg = req.flash('success_msg')
//     next()
// })
// Routes
app.get('/', (req, res) => {
    res.render('home')
})
app.use('/signup', SignUp)
app.use('/login', LogIn)

// Listener
const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log('Server listening on port: ' + port)
})