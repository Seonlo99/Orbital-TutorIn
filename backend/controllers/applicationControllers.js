import Application from "../models/Application.js";
import Qualification from "../models/Qualification.js";

import User from "../models/User.js";
import {
  uploadAcademicTranscript,
  uploadPictureCloud,
} from "../middleware/uploadPictureMiddleware.js";

const addApplication = async (req, res, next) => {
  try {
    const upload = uploadAcademicTranscript.single("file");
    upload(req, res, async function (err) {
      if (err) {
        return res.status(500).json({ message: err.message });
      } else {
        // every thing went well
        if (req.file) {
          const moduleName = req.body.moduleName;
          // const cloudImgUrl = await uploadPictureCloud(req.file);
          const application = await Application.create({
            tutorId: req.user._id,
            pdfUrl: "cloudImgUrl",
            requestModule: moduleName,
          });
          return res.json({ application });
        } else {
          return res.status(404).json({ message: "Error uploading file" });
        }
      }
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getApplications = async (req, res) => {
  try {
    let user = await User.findOne({ _id: req.user._id });
    // console.log(user)
    if (!user.isAdmin) {
      return res.status(401).json({ message: "Unauthorised" });
    }

    let applications = await Application.find({ approved: null }).populate({
      path: "tutorId",
      select: ["username"],
    });

    return res.json({ applications });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const editApplication = async (req, res) => {
  try {
    const { accept, applicationId, modulesName } = req.body;
    let user = await User.findOne({ _id: req.user._id });
    if (!user.isAdmin) {
      return res.status(401).json({ message: "Unauthorised" });
    }

    let application = await Application.find({ _id: applicationId });
    if (!application) {
      return res.status(404).json({ message: "No application found" });
    }

    application = await Application.findOneAndUpdate(
      { _id: applicationId },
      { approved: accept }
    );
    if (accept) {
      // verify
      user = await User.findOneAndUpdate(
        { _id: application.tutorId },
        { verified: true }
      );
      await Qualification.findOneAndUpdate(
        { tutorId: application.tutorId },
        { $push: { modules: modulesName } },
        { upsert: true }
      );
    }

    return res.json({ application });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export { addApplication, getApplications, editApplication };
