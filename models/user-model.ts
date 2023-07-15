import mongoose from "mongoose";
var bcryptjs = require('bcryptjs');


const userSchema = new mongoose.Schema({
    username: {
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true
    },
    firstname: mongoose.Schema.Types.String,
    lastname: {
        type: mongoose.Schema.Types.String,
        default: ''
    },
    email: { 
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true
    },
    password: { 
        type: mongoose.Schema.Types.String,
        required: true
    },


  
}, {
    timestamps: true
})

userSchema.pre('save',async function() {
    const user = this
    if (user.isModified('password')) {
        const hashedPassword = await bcryptjs.hash(user.password, 8)
        
        user.password = hashedPassword
    }
})

export const User = mongoose.model('user', userSchema)
