const express = require("express");
const Habit = require("../models/Habit");

const {
  calculateXP,
  calculateLevel,
  calculateStreak,
  getBadge,
} = require("../utils/gamification");

const router = express.Router();

console.log("✅ HABIT ROUTES LOADED");

// ===============================
// CREATE NEW HABIT
// ===============================
router.post("/", async (req, res) => {
  try {
    const { user, name, frequency } = req.body;

    if (!user || !name) {
      return res.status(400).json({
        success: false,
        message: "User and habit name are required",
      });
    }

    const habit = await Habit.create({
      user,
      name,
      frequency: frequency || "daily",
    });

    res.status(201).json({
      success: true,
      message: "Habit created successfully 🚀",
      habit,
    });
  } catch (error) {
    console.error("Create habit error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// ===============================
// TEST ROUTE
// ===============================
router.get("/test", (req, res) => {
  console.log("✅ TEST ROUTE CALLED");

  res.json({
    success: true,
    message: "Habit route is working 🚀",
  });
});

// ===============================
// GET ALL HABITS
// ===============================
router.get("/:userId", async (req, res) => {
  try {
    const habits = await Habit.find({
      user: req.params.userId,
    });

    res.json({
      success: true,
      habits,
    });
  } catch (error) {
    console.error("Get habits error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// ===============================
// COMPLETE HABIT
// ===============================
router.post("/:id/complete", async (req, res) => {
  try {
    const habit = await Habit.findById(req.params.id);

    if (!habit) {
      return res.status(404).json({
        success: false,
        message: "Habit not found",
      });
    }

    const today = new Date();

    const alreadyCompleted = habit.completionDates.some((date) => {
      const completedDate = new Date(date);

      return (
        completedDate.getFullYear() === today.getFullYear() &&
        completedDate.getMonth() === today.getMonth() &&
        completedDate.getDate() === today.getDate()
      );
    });

    if (alreadyCompleted) {
      return res.status(400).json({
        success: false,
        message: "Habit already completed today",
      });
    }

    habit.completionDates.push(today);

    habit.totalCompletions = habit.completionDates.length;

    habit.xp = calculateXP(habit.totalCompletions);

    habit.streak = calculateStreak(habit.completionDates);

    await habit.save();

    const level = calculateLevel(habit.xp);
    const badge = getBadge(habit.streak);

    res.json({
      success: true,
      message: "Habit completed successfully 🚀",
      habit,
      gamification: {
        xp: habit.xp,
        level,
        streak: habit.streak,
        badge,
      },
    });
  } catch (error) {
    console.error("Complete habit error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;