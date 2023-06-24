import mongoose from "mongoose";


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
    }
  
}, {
    timestamps: true
})

export const User = mongoose.model('user', userSchema)
