const mongoose = require('mongoose');
const {isEmail}= require('validator')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
        lowercase: true,
        validate: [isEmail,'Plese enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please enter an password'],
        minlength: [6,'Minimum password length is 6 characters']
    },
})

// Fire a function after a user created
// userSchema.post('save',(doc, next)=>{
//     console.log('new user is created and saved',doc);
//     next()
// })

// Fire a function before doc saved to db
userSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt)
    next();
})

// userModel = model , userModels = collections
// jei nam e model er nam dibo, tar plural collection er nam hobe database e
const User = mongoose.model('userModel', userSchema);

module.exports = User;