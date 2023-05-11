import { Schema, model } from "mongoose";
import { hash, compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

const UserSchema = new Schema(
    {
        username: { type: String, required: true },
        name: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        tutor: { type: Boolean, default: false },
        verified: { type: Boolean, default: false },
    },
    { timestamps: true }
);

UserSchema.pre('save', async function(next){
    if(this.isModified('password')){
        this.password = await hash(this.password, 10);
        return next()
    }
    return next()
})

UserSchema.methods.generateJWT = async function(){
    return await sign({id:this._id}, process.env.JWT_SECRET, {expiresIn: "30d",});
};

UserSchema.methods.verifyPassword = async function(password){
    return await compare(password, this.password);
};

const User = model("User", UserSchema);
export default User;