const mongoose = require('mongoose')
const {isEmail} = require('validator')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter a name'],
        minLenth: 1
    },
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
        minLenth: 3,
        validate: [isEmail, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please create a password'],
        minlength: [6, 'Minimum password length is 6 characters']
    }
})

// Fire a function befor doc saved to db
userSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt)
    next()
})
// Fire a function after doc saved to db
// userSchema.post('save', function(doc, next) {
//     console.log('new user was created & saved', doc)
//     next()
// })

// Static functions
userSchema.statics.login = async function(email, password){
    const user = await this.findOne({ email })
    if(user){
        const auth = await bcrypt.compare(password, user.password)
        if(auth){
            return user
        }
        throw Error('Incorrect password')
    }
    throw Error('Incorrect email')
}
const user = mongoose.model('User', userSchema)
module.exports = user