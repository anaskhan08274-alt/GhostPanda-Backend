import express from "express";
import cors from "cors";
import uploadRoute from "./routes/uploadRoute.js";

const app = express();

app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://ghostpandaai.vercel.app"
  ],
  methods: ["GET", "POST"],
  credentials: true
}));

app.use(express.json());

// ✅ route
app.use("/upload", uploadRoute);

app.get("/", (req, res) => {
  res.send("GhostPanda Backend Running 🚀");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});