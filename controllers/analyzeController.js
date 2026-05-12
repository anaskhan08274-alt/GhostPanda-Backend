import PDFParser from "pdf2json";
import { analyzeText } from "../utils/analyzeText.js";

export const analyzeResume = async (req, res) => {
  try {
    const apiKey = req.headers["x-api-key"];

    if (apiKey !== "sk_ghostpanda_DIN0022") {
      return res.status(401).json({ error: "Unauthorized" });
    }

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const { userName, userEmail, jobTitle, experience, jobDescription } = req.body;

    // PDF extract using pdf2json
    const pdfParser = new PDFParser();

    pdfParser.on("pdfParser_dataError", (errData) => {
      res.status(500).json({ error: "PDF parse failed" });
    });

    pdfParser.on("pdfParser_dataReady", (pdfData) => {
      let text = "";

      pdfData.Pages.forEach((page) => {
        page.Texts.forEach((item) => {
          item.R.forEach((r) => {
            text += decodeURIComponent(r.T) + " ";
          });
        });
      });

      const result = analyzeText(text, jobDescription);

      return res.json({
        success: true,
        name: userName,
        email: userEmail,
        jobTitle,
        experience,
        ...result,
      });
    });

    pdfParser.parseBuffer(req.file.buffer);

  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Analysis failed" });
  }
};