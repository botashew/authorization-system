const express = require('express')
const router = express.Router()
const model = require('../models/model')
const bcrypt = require('bcrypt')

router.get('/', (req, res) => {
    res.render('signup')
})

// Sign up Method
router.post('/', (req, res) => {
    const {firstName, lastName, email, password, password2 } = req.body
    let errors = []
    let success = []
    
    if (!firstName || !lastName || !email || !password){
        errors.push({msg: 'Please fill all fiels!'})
    }

    if ( password !== password2){
        errors.push({msg: 'Passwords don\'t match'})
    }
    if (errors.length > 0){
        res.render('signup', {
            errors
        })
    }

    else {
            // User exists
            model.findOne({email: email})
                .then(user => {
                    if(user){
                        errors.push({msg: 'Email is already registered'})
                        res.render('signup', {
                            errors
                        })
                    }
                    else{
                        const newUser = new model({
                            firstName,
                            lastName,
                            email,
                            password
                        })
                        // Password Hashed
                        bcrypt.genSalt(10, (err, salt) => {
                            bcrypt.hash(newUser.password, salt, (err, hash) => {
                                newUser.password = hash
                            })
                        })
                        newUser.save()
                            .then(() => {
                                success.push({msg: 'You are registered successfully'})
                                res.render('login', {
                                    success
                                })
                            })
                    }
                })
    }
})

module.exports = router