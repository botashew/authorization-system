const mongoose = require('mongoose')
const db = 'mongodb://localhost/login-system'
async function main(){
    await mongoose.connect(db,{
        useUnifiedTopology: true,
        useNewUrlParser: true
    })
    console.log('MongoDB connected')
}
main()