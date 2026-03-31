import Club from "../models/Club.js";
import Application from "../models/Application.js";
import User from "../models/User.js";

// @desc    Get all clubs
// @route   GET /api/clubs
// @access  Private
export const getClubs = async (req, res) => {
  try {
    const clubs = await Club.find({}).populate("createdBy", "name");
    res.json(clubs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a club
// @route   POST /api/clubs
// @access  Admin
export const createClub = async (req, res) => {
  const { name, description, category } = req.body;

  try {
    const clubExists = await Club.findOne({ name });

    if (clubExists) {
      return res.status(400).json({ message: "Club already exists" });
    }

    const club = await Club.create({
      name,
      description,
      category,
      createdBy: req.user._id,
    });

    res.status(201).json(club);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get club by ID
// @route   GET /api/clubs/:id
// @access  Private
export const getClubById = async (req, res) => {
  try {
    const club = await Club.findById(req.params.id).populate("members", "name email role");
    if (club) {
      res.json(club);
    } else {
      res.status(404).json({ message: "Club not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Join club (Create application)
// @route   POST /api/clubs/:id/join
// @access  Student
export const joinClub = async (req, res) => {
  try {
    const club = await Club.findById(req.params.id);
    if (!club) {
      return res.status(404).json({ message: "Club not found" });
    }

    const alreadyApplied = await Application.findOne({
      studentId: req.user._id,
      clubId: club._id,
      status: "pending"
    });

    if (alreadyApplied) {
      return res.status(400).json({ message: "Already applied" });
    }

    const application = await Application.create({
      studentId: req.user._id,
      clubId: club._id,
      studentName: req.user.name,
      clubName: club.name,
      email: req.user.email,
    });

    res.status(201).json(application);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Leave club
// @route   POST /api/clubs/:id/leave
// @access  Member
export const leaveClub = async (req, res) => {
  try {
    const club = await Club.findById(req.params.id);
    if (!club) {
      return res.status(404).json({ message: "Club not found" });
    }

    club.members = club.members.filter(m => m.toString() !== req.user._id.toString());
    club.memberCount = club.members.length;
    await club.save();

    await User.findByIdAndUpdate(req.user._id, {
      $pull: { clubs: club._id }
    });

    res.json({ message: "Left club successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
