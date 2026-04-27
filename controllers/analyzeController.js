import { analyzeText } from "../utils/analyzeText.js";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";

export const analyzeResume = async (req, res) => {
  try {
    const apiKey = req.headers["x-api-key"];

    if (apiKey !== "sk_ghostpanda_DIN0022") {
      return res.status(401).json({ error: "Unauthorized" });
    }

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    console.log("📁 File:", req.file.originalname);

    const uint8Array = new Uint8Array(req.file.buffer);

    const pdf = await pdfjsLib.getDocument({ data: uint8Array }).promise;

    let text = "";

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();

      const strings = content.items.map(item => item.str);
      text += strings.join(" ") + " ";
    }

    console.log("📄 Extracted Length:", text.length);

    const result = analyzeText(text);

    return res.json(result);

  } catch (error) {
    console.error("🔥 ERROR:", error);
    return res.status(500).json({
      error: "Error analyzing resume"
    });
  }
};