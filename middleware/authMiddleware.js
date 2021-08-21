const jwt = require('jsonwebtoken')
const User = require('../models/user')

const isLogedIn = (req, res, next) => {
    const token = req.cookies.jwt

    // check json web token exists
    if(token){
        // is token verified
        jwt.verify(token, 'akbar secret', (err, decodedToken) => {
            if(err){
                res.redirect('/login')
            }else{
                next()
            }
        })
    }
    else{
        res.redirect('/login')
    }
}

// ckeck current user
const checkUser = (req, res, next) => {
    const token = req.cookies.jwt

    if(token){
        jwt.verify(token, 'akbar secret', async (err, decodedToken) => {
            if(err){
                res.locals.user = null
                next()
            }
            else{
                let user = await User.findById(decodedToken.id)
                res.locals.user = user
                next()
            }

        })
    }else{
        res.locals.user = null
        next()
    }
}

module.exports = { isLogedIn, checkUser }