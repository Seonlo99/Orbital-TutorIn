import User from "../models/User.js";
import { uploadPicture } from "../middleware/uploadPictureMiddleware.js";

const registerUser = async (req, res) => {
  try {
    const { username, fullname, email, password, isTutor: tutor } = req.body;
    // console.log(req);
    let user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ message: "User have already registered" });
    }
    // console.log(tutor)
    user = await User.create({
      username,
      name: fullname,
      email,
      password,
      tutor,
    });

    return res.status(201).json({
      _id: user._id,
      username: user.username,
      name: user.name,
      email: user.email,
      verified: user.verified,
      tutor: user.tutor,
      token: await user.generateJWT(),
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const userLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    // console.log(req.body);
    let user = await User.findOne({ username });
    if (!user) {
      return res
        .status(400)
        .json({ message: "User does not exist or invalid password." });
    }
    if (await user.verifyPassword(password)) {
      return res.status(201).json({
        _id: user._id,
        username: user.username,
        name: user.name,
        email: user.email,
        verified: user.verified,
        tutor: user.tutor,
        token: await user.generateJWT(),
      });
    } else {
      return res
        .status(400)
        .json({ message: "User does not exist or invalid password." });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateProfilePicture = async (req, res, next) => {
  try {
    const upload = uploadPicture.single("profilePicture");
    upload(req, res, async function (err) {
      if (err) {
        const error = new Error("An unknown error occured when uploading");
        next(error);
      } else {
        // everything went well
        if (req.file) {
          const updatedUser = await User.findByIdAndUpdate(
            req.user._id,
            {
              avatar: req.file.filename,
            },
            { new: true }
          );
          res.json({
            _id: updatedUser._id,
            username: updatedUser.username,
            name: updatedUser.name,
            email: updatedUser.email,
            verified: updatedUser.verified,
            tutor: updatedUser.tutor,
            token: await updatedUser.generateJWT(),
          });
        } else {
          let filename;
          let updatedUser = await User.findById(req.user._id);
          filename = updatedUser.avatar;
          updatedUser.avatar = "";
          await updatedUser.save();
          fileRemover(filename);
          res.json({
            _id: updatedUser._id,
            username: updatedUser.username,
            name: updatedUser.name,
            email: updatedUser.email,
            verified: updatedUser.verified,
            tutor: updatedUser.tutor,
            token: await updatedUser.generateJWT(),
          });
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

export { registerUser, userLogin, updateProfilePicture };
