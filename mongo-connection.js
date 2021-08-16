const mongoose = require('mongoose')
const LocalMongodbURL = 'mongodb://localhost/login-system'
async function main(){
    await mongoose.connect(LocalMongodbURL, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    })
    console.log('Connecting is success...')
}

main()