import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        fullName:{
            type: String,
            required: true,
        },

        email:{
            type: String,
            required: true,
        },

        phoneNumber:{
            type: String,
        },

        adres:{
            type: String,
        },
        
        meslek:{
            type: String,
        },

        bio:{
            type: String,
        },

        password:{
            type: String,
            required: true
        },

        confirmPassword:{
            type: String,
            required: true
        },
        emailOnayla:{
            type:String,
            default: null,
        }

    },
    { timestamps: true }
)

export default mongoose.models.User || mongoose.model("User",
UserSchema);