export const analyzeText = (text) => {
  const skillsDB = [
    "react",
    "javascript",
    "html",
    "css",
    "node",
    "mongodb",
    "express",
    "typescript",
  ];

  const lower = text.toLowerCase();

  const matchedSkills = skillsDB.filter(skill =>
    lower.includes(skill)
  );

  const missingSkills = skillsDB.filter(
    skill => !matchedSkills.includes(skill)
  );

  const score = Math.min(100, 50 + matchedSkills.length * 10);

  return {
    score,
    skills: matchedSkills, // 🔥 IMPORTANT (frontend ke liye)
    missingSkills,
    suggestions: [
      "Add measurable achievements",
      "Improve ATS keywords",
      "Use action verbs",
      "Add more technical skills",
    ],
  };
};