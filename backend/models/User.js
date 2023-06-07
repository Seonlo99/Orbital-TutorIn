import { Schema, model } from "mongoose";
import bCryptpkg from "bcryptjs";
import jwtpkg from "jsonwebtoken";

const { hash, compare } = bCryptpkg;
const { sign } = jwtpkg;

const UserSchema = new Schema(
  {
    username: { type: String, required: true, index: true, unique: true },
    avatar: { type: String, default: "" },
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    tutor: { type: Boolean, default: false },
    verified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await hash(this.password, 10);
    return next();
  }
  return next();
});

UserSchema.pre("findOneAndUpdate", async function (next) {
  if (this._update.password) {
    this._update.password = await hash(this._update.password, 10);
    return next();
  }
  return next();
});

UserSchema.methods.generateJWT = async function () {
  return await sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

UserSchema.methods.verifyPassword = async function (password) {
  return await compare(password, this.password);
};

const User = model("User", UserSchema);
export default User;
