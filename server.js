import express from "express";
import cors from "cors";
import uploadRoute from "./routes/uploadRoute.js";

const app = express();

app.use(cors());
app.use(express.json());

// ✅ route
app.use("/upload", uploadRoute);

app.get("/", (req, res) => {
  res.send("GhostPanda Backend Running 🚀");
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});