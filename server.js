import express from "express";
import cors from "cors";
import uploadRoute from "./routes/uploadRoute.js";

const app = express();

// ✅ TEMPORARY OPEN CORS
app.use(cors());

app.use(express.json());

app.use("/upload", uploadRoute);

app.get("/", (req, res) => {
  res.send("GhostPanda Backend Running 🚀");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});