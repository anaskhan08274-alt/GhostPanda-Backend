export const analyzeText = (resume, jobDesc = "") => {
  const resumeText = resume.toLowerCase();
  const jdText = jobDesc.toLowerCase();

  const skills = [
    "react", "javascript", "html", "css",
    "node", "mongodb", "express", "typescript"
  ];

  let matched = [];
  let missing = [];

  skills.forEach(skill => {
    const inResume = resumeText.includes(skill);
    const inJD = jdText.includes(skill);

    if (inResume && inJD) {
      matched.push(skill);
    } else if (inJD && !inResume) {
      missing.push(skill);
    }
  });

  const jdSkills = skills.filter(skill => jdText.includes(skill));

  const keywordMatch = jdSkills.length
    ? Math.round((matched.length / jdSkills.length) * 100)
    : 0;

  let formatScore = 0;
  if (resumeText.includes("education")) formatScore += 20;
  if (resumeText.includes("experience")) formatScore += 20;
  if (resumeText.includes("skills")) formatScore += 20;
  if (resumeText.length > 500) formatScore += 20;
  if (resumeText.includes("project")) formatScore += 20;

  let contentScore = 0;
  const actionWords = [
    "developed", "built", "created",
    "designed", "implemented", "led"
  ];

  actionWords.forEach(word => {
    if (resumeText.includes(word)) {
      contentScore += 15;
    }
  });

  if (resumeText.match(/\d+/)) contentScore += 20;

  contentScore = Math.min(contentScore, 100);

  const score = Math.round(
    (keywordMatch * 0.4) +
    (formatScore * 0.3) +
    (contentScore * 0.3)
  );

  return {
    score,
    keywordScore: keywordMatch,
    formatScore,
    contentScore,
    skills: matched,
    missingSkills: missing,
    jdSkillsCount: jdSkills.length,
    suggestions: [
      "Add measurable achievements",
      "Use action verbs",
      "Improve ATS keywords",
      "Add relevant skills from JD"
    ]
  };
};