export const analyzeText = (resume, jobDesc = "") => {
  console.log("NEW ANALYZE LOGIC RUNNING");
  const resumeText = resume.toLowerCase().replace(/\s+/g, " ");
  const jdText = jobDesc.toLowerCase().replace(/\s+/g, " ");

  const skills = [
    "react",
    "javascript",
    "html",
    "css",
    "node",
    "mongodb",
    "express",
    "typescript",
  ];

  let matched = [];
  let missing = [];

  skills.forEach((skill) => {
    const inResume = resumeText.includes(skill);
    const inJD = jdText.includes(skill);

    if (inJD) {
      if (inResume) {
        matched.push(skill);
      } else {
        missing.push(skill);
      }
    }
  });

  const jdSkills = skills.filter((skill) => jdText.includes(skill));

  // Better keyword score
  const keywordScore =
    jdSkills.length > 0
      ? Math.round((matched.length / jdSkills.length) * 100)
      : 50;

  // Better format score
  let formatScore = 40; // base score
  if (resumeText.includes("education")) formatScore += 15;
  if (resumeText.includes("experience")) formatScore += 15;
  if (resumeText.includes("skills")) formatScore += 15;
  if (resumeText.includes("project")) formatScore += 15;
  if (resumeText.length > 300) formatScore += 15;

  formatScore = Math.min(formatScore, 100);

  // Better content score
  let contentScore = 30; // base score
  const actionWords = [
    "developed",
    "built",
    "created",
    "designed",
    "implemented",
    "led",
  ];

  actionWords.forEach((word) => {
    if (resumeText.includes(word)) {
      contentScore += 10;
    }
  });

  if (/\d+/.test(resumeText)) contentScore += 20;

  contentScore = Math.min(contentScore, 100);

  // Final score
  const score = Math.round(
    keywordScore * 0.5 +
    formatScore * 0.25 +
    contentScore * 0.25
  );

  return {
    score,
    keywordScore,
    formatScore,
    contentScore,
    skills: matched,
    missingSkills: missing,
    jdSkillsCount: jdSkills.length,
    suggestions: [
      "Add measurable achievements",
      "Use action verbs",
      "Improve ATS keywords",
      "Add relevant skills from JD",
    ],
  };
};