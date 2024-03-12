import {Schema} from 'mongoose';


const userSchema = new Schema({
    name: {
        type: String, 
        unique: true,
        required: true,
    },
    email: {
        type: String, 
        unique: true,
        required: true,
    },
    password: {
        type: String, 
        required: true,
    },
},
// it's going to crerated updated time and created time
{timestamps: true}

)


export default model("User", userSchema)