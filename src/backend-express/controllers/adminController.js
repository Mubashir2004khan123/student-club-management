import Application from "../models/Application.js";
import User from "../models/User.js";
import Club from "../models/Club.js";

// @desc    Get all applications
// @route   GET /api/admin/applications
// @access  Admin
export const getApplications = async (req, res) => {
  try {
    const applications = await Application.find({}).sort({ appliedAt: -1 });
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Approve application
// @route   PUT /api/admin/applications/:id/approve
// @access  Admin
export const approveApplication = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    application.status = "approved";
    await application.save();

    const club = await Club.findById(application.clubId);
    if (club) {
      if (!club.members.includes(application.studentId)) {
        club.members.push(application.studentId);
        club.memberCount = club.members.length;
        await club.save();
      }
    }

    await User.findByIdAndUpdate(application.studentId, {
      $push: { clubs: application.clubId }
    });

    res.json({ message: "Application approved successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Reject application
// @route   PUT /api/admin/applications/:id/reject
// @access  Admin
export const rejectApplication = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    application.status = "rejected";
    await application.save();

    res.json({ message: "Application rejected successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all students
// @route   GET /api/admin/students
// @access  Admin
export const getStudents = async (req, res) => {
  try {
    const students = await User.find({ role: "student" }).select("-password").populate("clubs", "name");
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
