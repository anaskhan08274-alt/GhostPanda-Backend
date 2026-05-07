import { analyzeText } from "../utils/analyzeText.js";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";

export const analyzeResume = async (req, res) => {
  try {
    const apiKey = req.headers["x-api-key"];

    if (apiKey !== "sk_ghostpanda_DIN0022") {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const {
      userName,
      userEmail,
      jobTitle,
      experience,
      jobDescription
    } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const uint8Array = new Uint8Array(req.file.buffer);
    const pdf = await pdfjsLib.getDocument({ data: uint8Array }).promise;

    let resumeText = "";

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      const strings = content.items.map(item => item.str || "");
      resumeText += strings.join(" ") + " ";
    }

    console.log("RESUME TEXT:", resumeText.slice(0, 300));

    // 🔥 REAL ANALYSIS
    const result = analyzeText(resumeText, jobDescription);

   return res.json({
  success: true,

  // ✅ ADD THIS
  name: userName,
  email: userEmail,
  jobTitle: jobTitle,
  experience: experience,

  // existing
  ...result
});

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Analysis failed" });
  }
};