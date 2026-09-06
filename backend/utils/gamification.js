// ================================
// CodeFolio Gamification Utilities
// ================================

const XP_PER_COMPLETION = 10;
const XP_PER_LEVEL = 100;

// Calculate XP
function calculateXP(completedCount) {
  if (!completedCount || completedCount < 0) {
    return 0;
  }

  return completedCount * XP_PER_COMPLETION;
}

// Calculate Level
function calculateLevel(totalXP) {
  if (!totalXP || totalXP < 0) {
    return 1;
  }

  return Math.floor(totalXP / XP_PER_LEVEL) + 1;
}

// Calculate Streak
function calculateStreak(completionDates) {
  if (!completionDates || completionDates.length === 0) {
    return 0;
  }

  const dates = completionDates
    .map((date) => new Date(date))
    .sort((a, b) => b - a);

  let streak = 1;

  for (let i = 0; i < dates.length - 1; i++) {
    const current = dates[i];
    const previous = dates[i + 1];

    const difference =
      (current - previous) / (1000 * 60 * 60 * 24);

    if (difference === 1) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
}

// Get Badge
function getBadge(streak) {
  if (streak >= 30) return "🔥 30 Day Legend";
  if (streak >= 14) return "🏆 14 Day Champion";
  if (streak >= 7) return "⭐ 7 Day Warrior";
  if (streak >= 3) return "💪 3 Day Starter";

  return "🌱 Beginner";
}

// ================================
// EXPORT FUNCTIONS
// ================================

module.exports = {
  XP_PER_COMPLETION,
  XP_PER_LEVEL,
  calculateXP,
  calculateLevel,
  calculateStreak,
  getBadge,
};